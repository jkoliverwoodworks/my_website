// HTTP adapter: only studio-server.ts supplies the server-side credential.
import { z } from "zod";
import { contentSchema, designSchema } from "./cms-model.ts";
export class StudioError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}
const date = z.string().datetime({ offset: true });
export const rowSchema = z.object({ id: z.string().uuid(), slug: z.string(), status: designSchema.shape.status, position: z.number().int(), data: designSchema, updated_at: date }).strict()
  .refine(row => row.slug === row.data.slug && row.status === row.data.status && row.position === row.data.position, "Inconsistent design record.");
export const mediaSchema = z.object({ id: z.string().uuid(), path: z.string().regex(/^\/media\/[a-f0-9-]{36}\.(jpg|png|webp)$/), sha: z.string().regex(/^[a-f0-9]{40}$/), alt: z.string().min(1).max(250), mime: z.enum(["image/jpeg", "image/png", "image/webp"]), bytes: z.number().int().positive().max(1500000) }).strict();
export const siteSchema = z.object({ version: z.literal(1), designs: z.array(rowSchema).max(500), content: z.object({ data: contentSchema, updated_at: date }).strict(), media: z.array(mediaSchema).max(500) }).strict()
  .refine(site => new Set(site.designs.map(row => row.slug)).size === site.designs.length && new Set(site.designs.map(row => row.id)).size === site.designs.length, "Duplicate designs.");
export type StudioSite = z.infer<typeof siteSchema>;
export type GitConfig = { owner: string; repo: string; branch: string; token: string };
type GitFile = { type: string; encoding: string; content: string; sha: string };
type Entry = { path: string; mode: "100644"; type: "blob"; sha?: string; content?: string };
export const SITE_PATH = "content/site.json";
export const SECURITY_BRANCH = "codex/studio-security";
export class StudioGit {
  private config: GitConfig;
  private transport: typeof fetch;
  constructor(config: GitConfig, transport: typeof fetch = fetch) { this.config = config; this.transport = transport; }
  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await this.transport(`https://api.github.com/repos/${encodeURIComponent(this.config.owner)}/${encodeURIComponent(this.config.repo)}${path}`, {
      ...init, headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${this.config.token}`, "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "JK-Oliver-Studio", "Content-Type": "application/json" }, cache: "no-store", signal: AbortSignal.timeout(20000), redirect: "error",
    });
    if (!response.ok) {
      if (response.status === 404) throw new StudioError(404, "Repository, branch or content file not found. Check studio setup.");
      if (response.status === 409 || response.status === 422) throw new StudioError(409, "The repository changed while saving. Reload and try again; nothing was overwritten.");
      if (response.status === 429 || response.headers.get("x-ratelimit-remaining") === "0") throw new StudioError(429, "GitHub is temporarily limiting requests. Please wait before retrying.");
      throw new StudioError(502, "Repository request failed. Check the studio connection and try again.");
    }
    return response.json() as Promise<T>;
  }
  async head(branch = this.config.branch) {
    const ref = await this.request<{ object: { sha: string } }>(`/git/ref/heads/${encodeURIComponent(branch)}`);
    const commit = await this.request<{ tree: { sha: string } }>(`/git/commits/${ref.object.sha}`);
    return { sha: ref.object.sha, tree: commit.tree.sha };
  }
  async file(path: string, ref: string) {
    return this.request<GitFile>(`/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(ref)}`);
  }
  async site() {
    const head = await this.head();
    const file = await this.file(SITE_PATH, head.sha);
    if (file.encoding !== "base64") throw new StudioError(502, "Repository content is too large or invalid.");
    let value: unknown;
    try { value = JSON.parse(new TextDecoder().decode(decodeBase64(file.content))); } catch { throw new StudioError(502, "Repository content is invalid."); }
    const parsed = siteSchema.safeParse(value);
    if (!parsed.success) throw new StudioError(502, "Repository content did not pass validation.");
    return { ...head, site: parsed.data };
  }
  async commit(head: { sha: string; tree: string }, entries: Entry[], message: string, branch = this.config.branch) {
    const tree = await this.request<{ sha: string }>("/git/trees", { method: "POST", body: JSON.stringify({ base_tree: head.tree, tree: entries }) });
    const commit = await this.request<{ sha: string }>("/git/commits", { method: "POST", body: JSON.stringify({ message, tree: tree.sha, parents: [head.sha] }) });
    // A sibling commit cannot fast-forward over a concurrent update. Never force-push.
    await this.request(`/git/refs/heads/${encodeURIComponent(branch)}`, { method: "PATCH", body: JSON.stringify({ sha: commit.sha, force: false }) });
    return commit.sha;
  }
  async save(snapshot: Awaited<ReturnType<StudioGit["site"]>>, message: string, extra: Entry[] = []) {
    const data = siteSchema.parse(snapshot.site);
    const bytes = new TextEncoder().encode(JSON.stringify(data, null, 2) + "\n");
    if (bytes.length > 800000) throw new StudioError(413, "The content file is getting too large. Contact your developer before adding more.");
    return this.commit(snapshot, [{ path: SITE_PATH, mode: "100644", type: "blob", content: new TextDecoder().decode(bytes) }, ...extra], message);
  }
  async blob(bytes: Uint8Array) {
    return this.request<{ sha: string }>("/git/blobs", { method: "POST", body: JSON.stringify({ content: encodeBase64(bytes), encoding: "base64" }) });
  }
  async consumeLoginAttempt(now = Date.now()) {
    // Shared durable throttle on a non-deploying branch, not function memory.
    let head;
    try { head = await this.head(SECURITY_BRANCH); }
    catch (error) {
      if (!(error instanceof StudioError) || error.status !== 404) throw error;
      const production = await this.head();
      try { await this.request("/git/refs", { method: "POST", body: JSON.stringify({ ref: `refs/heads/${SECURITY_BRANCH}`, sha: production.sha }) }); }
      catch (createError) { if (!(createError instanceof StudioError) || createError.status !== 409) throw createError; }
      head = await this.head(SECURITY_BRANCH);
    }
    for (let retry = 0; retry < 3; retry++) {
      const schema = z.object({ start: z.number().int().nonnegative(), attempts: z.number().int().nonnegative() }).strict();
      let state = { start: now, attempts: 0 };
      try {
        const file = await this.file("content/studio-lock.json", head.sha);
        state = schema.parse(JSON.parse(new TextDecoder().decode(decodeBase64(file.content))));
      } catch (error) { if (!(error instanceof StudioError) || error.status !== 404) throw error; }
      if (now - state.start >= 15 * 60 * 1000) state = { start: now, attempts: 0 };
      if (state.attempts >= 5) throw new StudioError(429, "Too many sign-in attempts. Please wait 15 minutes before trying again.");
      state.attempts++;
      try {
        await this.commit(head, [{ path: "content/studio-lock.json", mode: "100644", type: "blob", content: JSON.stringify(state) }], "Studio: record sign-in attempt [skip ci]", SECURITY_BRANCH);
        return;
      } catch (error) {
        if (!(error instanceof StudioError) || error.status !== 409) throw error;
        head = await this.head(SECURITY_BRANCH);
      }
    }
    throw new StudioError(429, "Sign-in is busy. Please wait and try again.");
  }
}
export function encodeBase64(bytes: Uint8Array) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(binary);
}
export function decodeBase64(content: string) {
  return Uint8Array.from(atob(content.replace(/\s/g, "")), ch => ch.charCodeAt(0));
}
