import test from "node:test";
import assert from "node:assert/strict";
const origin = process.env.CMS_TEST_ORIGIN || "http://localhost:5173";
if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) throw new Error("These tests only run against a local preview.");
for (const path of ["auth", "designs", "content", "media", "snapshot"]) {
  test(`anonymous GET /api/admin/${path} is denied`, async () => {
    const response = await fetch(`${origin}/api/admin/${path}`);
    assert.equal(response.status, 401);
    assert.equal(response.headers.get("cache-control"), "no-store");
  });
}
test("cross-origin mutations are denied before authentication", async () => {
  const response = await fetch(`${origin}/api/admin/designs`, { method: "POST", headers: { Origin: "https://untrusted.example", "Content-Type": "application/json" }, body: "{}" });
  assert.equal(response.status, 403);
});
test("same-origin anonymous mutations are denied", async () => {
  const response = await fetch(`${origin}/api/admin/content`, { method: "PUT", headers: { Origin: origin, "Content-Type": "application/json" }, body: "{}" });
  assert.equal(response.status, 401);
});
test("invalid login body is rejected without contacting GitHub", async () => {
  const response = await fetch(`${origin}/api/admin/auth`, { method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify({ email: "invalid", password: "" }) });
  assert.equal(response.status, 400);
});
test("arbitrary media paths are not served", async () => {
  const response = await fetch(`${origin}/api/admin/media/not-a-uuid`);
  assert.equal(response.status, 401);
});
test("old admin URLs redirect to the studio", async () => {
  const response = await fetch(`${origin}/admin/login`, { redirect: "manual" });
  assert.ok([302, 303, 307, 308].includes(response.status));
  assert.ok(response.headers.get("location").endsWith("/studio/login"));
});
test("unauthenticated studio redirects to password screen", async () => {
  const response = await fetch(`${origin}/studio`, { redirect: "manual" });
  assert.ok([302, 303, 307, 308].includes(response.status));
  assert.ok(response.headers.get("location").endsWith("/studio/login"));
});
