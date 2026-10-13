import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { StudioGit, siteSchema, SITE_PATH, SECURITY_BRANCH, encodeBase64, decodeBase64 } from "../lib/studio-git.ts";
const initial = JSON.parse(await readFile(new URL("../content/site.json", import.meta.url), "utf8"));
function fixture() {
  let counter = 1;
  const sha = () => (counter++).toString(16).padStart(40, "0");
  const blobs = new Map(), trees = new Map(), commits = new Map(), refs = new Map(), calls = [];
  function blob(content) { const id = sha(); blobs.set(id, content); return id; }
  const firstTree = sha(); trees.set(firstTree, new Map([[SITE_PATH, blob(encodeBase64(new TextEncoder().encode(JSON.stringify(initial))))]]));
  const firstCommit = sha(); commits.set(firstCommit, { tree: firstTree, parents: [] }); refs.set("main", firstCommit);
  let conflict = false;
  const transport = async (url, init = {}) => {
    const parsed = new URL(url); const path = parsed.pathname.replace("/repos/test/site", ""); const method = init.method || "GET";
    const body = init.body ? JSON.parse(init.body) : undefined; calls.push({ path, method, body });
    const response = (value, status = 200) => Response.json(value, { status });
    if (path.startsWith("/git/ref/heads/")) {
      const branch = decodeURIComponent(path.slice("/git/ref/heads/".length));
      return refs.has(branch) ? response({ object: { sha: refs.get(branch) } }) : response({}, 404);
    }
    if (path === "/git/refs" && method === "POST") {
      const branch = body.ref.slice("refs/heads/".length);
      if (refs.has(branch)) return response({}, 422);
      refs.set(branch, body.sha); return response({}, 201);
    }
    if (path.startsWith("/git/commits/")) {
      const commit = commits.get(path.split("/").pop());
      return commit ? response({ tree: { sha: commit.tree } }) : response({}, 404);
    }
    if (path.startsWith("/contents/")) {
      const filePath = decodeURIComponent(path.slice("/contents/".length));
      const ref = parsed.searchParams.get("ref");
      const commit = commits.get(refs.get(ref) || ref);
      const id = commit && trees.get(commit.tree).get(filePath);
      return id ? response({ type: "file", encoding: "base64", content: blobs.get(id), sha: id }) : response({}, 404);
    }
    if (path === "/git/blobs" && method === "POST") return response({ sha: blob(body.content) }, 201);
    if (path.startsWith("/git/blobs/")) return response({ content: blobs.get(path.split("/").pop()), encoding: "base64" });
    if (path === "/git/trees" && method === "POST") {
      const files = new Map(trees.get(body.base_tree));
      for (const entry of body.tree) files.set(entry.path, entry.sha || blob(encodeBase64(new TextEncoder().encode(entry.content))));
      const id = sha(); trees.set(id, files); return response({ sha: id }, 201);
    }
    if (path === "/git/commits" && method === "POST") {
      const id = sha(); commits.set(id, { tree: body.tree, parents: body.parents }); return response({ sha: id }, 201);
    }
    if (path.startsWith("/git/refs/heads/") && method === "PATCH") {
      const branch = decodeURIComponent(path.slice("/git/refs/heads/".length));
      if (conflict) { conflict = false; return response({}, 422); }
      if (body.force !== false || commits.get(body.sha).parents[0] !== refs.get(branch)) return response({}, 422);
      refs.set(branch, body.sha); return response({});
    }
    throw new Error(`Unexpected mock call: ${method} ${path}`);
  };
  const config = { owner: "test", repo: "site", branch: "main", token: "test-only" };
  return { git: new StudioGit(config, transport), fresh: () => new StudioGit(config, transport), calls, refs, conflict: () => { conflict = true; } };
}
test("committed site is valid and binary encoding round-trips", () => {
  assert.equal(siteSchema.safeParse(initial).success, true);
  const bytes = new Uint8Array([0, 255, 128, 1]); assert.deepEqual(decodeBase64(encodeBase64(bytes)), bytes);
});
test("price changes persist in a new commit, changing only the content path", async () => {
  const f = fixture(); const snapshot = await f.git.site(); const oldHead = snapshot.sha;
  snapshot.site.designs[0].data.priceCents = 123400;
  await f.git.save(snapshot, "Studio: price change");
  const next = await f.fresh().site();
  assert.notEqual(next.sha, oldHead); assert.equal(next.site.designs[0].data.priceCents, 123400);
  const tree = f.calls.find(call => call.method === "POST" && call.path === "/git/trees");
  assert.deepEqual(tree.body.tree.map(entry => entry.path), [SITE_PATH]);
  assert.equal(f.calls.find(call => call.method === "PATCH").body.force, false);
});
test("a concurrent repository change is not overwritten", async () => {
  const f = fixture(); const snapshot = await f.git.site(); snapshot.site.designs[0].data.priceCents = 100;
  f.conflict(); await assert.rejects(f.git.save(snapshot, "Studio: stale change"), error => error.status === 409);
  assert.equal((await f.git.site()).site.designs[0].data.priceCents, initial.designs[0].data.priceCents);
});
test("image metadata and image blob are committed atomically", async () => {
  const f = fixture(); const snapshot = await f.git.site();
  const id = "00000000-0000-4000-8000-000000000099";
  const bytes = new Uint8Array([255, 216, 255, 0]);
  const image = await f.git.blob(bytes);
  snapshot.site.media.push({ id, path: `/media/${id}.jpg`, sha: image.sha, alt: "A table", mime: "image/jpeg", bytes: 4 });
  await f.git.save(snapshot, "Studio: upload", [{ path: `public/media/${id}.jpg`, mode: "100644", type: "blob", sha: image.sha }]);
  assert.equal((await f.fresh().site()).site.media[0].sha, image.sha);
  const tree = f.calls.find(call => call.path === "/git/trees" && call.method === "POST");
  assert.equal(tree.body.tree.length, 2);
});
test("shared login throttle survives new instances and expires after fifteen minutes", async () => {
  const f = fixture(); const now = 1800000000000;
  for (let i = 0; i < 5; i++) await f.fresh().consumeLoginAttempt(now);
  await assert.rejects(f.fresh().consumeLoginAttempt(now), error => error.status === 429);
  assert.ok(f.refs.has(SECURITY_BRANCH));
  assert.equal(f.refs.get("main"), (await f.git.site()).sha);
  await f.fresh().consumeLoginAttempt(now + 15 * 60 * 1000);
  assert.equal(f.calls.filter(call => call.method === "PATCH" && call.path.endsWith(encodeURIComponent(SECURITY_BRANCH))).length, 6);
});
test("login throttling retries safely after a competing attempt", async () => {
  const f = fixture(); await f.git.consumeLoginAttempt(1800000000000);
  f.conflict(); await f.git.consumeLoginAttempt(1800000000000);
});
test("GitHub outage fails closed rather than permitting a login", async () => {
  const git = new StudioGit({ owner: "test", repo: "site", branch: "main", token: "test-only" }, async () => Response.json({}, { status: 503 }));
  await assert.rejects(git.consumeLoginAttempt(), error => error.status === 502);
});
