import "server-only";
import { cookies } from "next/headers";
import { StudioError, StudioGit, SECURITY_BRANCH } from "./studio-git";
import { passwordHashValid, validSession, SESSION_SECONDS } from "./studio-security";
export { StudioError as CmsError } from "./studio-git";
export function studioConfigured() {
  return Boolean(process.env.STUDIO_GITHUB_OWNER && process.env.STUDIO_GITHUB_REPO && process.env.STUDIO_GITHUB_BRANCH && process.env.STUDIO_GITHUB_TOKEN && process.env.STUDIO_PASSWORD_HASH && process.env.STUDIO_SESSION_SECRET);
}
export function authConfig() {
  const hash = process.env.STUDIO_PASSWORD_HASH || "";
  const secret = process.env.STUDIO_SESSION_SECRET || "";
  if (!passwordHashValid(hash) || secret.length < 32) throw new StudioError(503, "Studio setup is incomplete. Contact your developer.");
  return { hash, secret };
}
export function studioGit() {
  const owner = process.env.STUDIO_GITHUB_OWNER || "";
  const repo = process.env.STUDIO_GITHUB_REPO || "";
  const branch = process.env.STUDIO_GITHUB_BRANCH || "";
  const token = process.env.STUDIO_GITHUB_TOKEN || "";
  if (!/^[a-zA-Z0-9-]+$/.test(owner) || !/^[a-zA-Z0-9_.-]+$/.test(repo) || !/^[a-zA-Z0-9_/-]+$/.test(branch) || branch === SECURITY_BRANCH || !token) throw new StudioError(503, "Studio repository setup is incomplete.");
  return new StudioGit({ owner, repo, branch, token });
}
export async function requireAdmin() {
  const token = (await cookies()).get("studio_session")?.value;
  if (!token) throw new StudioError(401, "Please sign in.");
  const { secret, hash } = authConfig();
  if (!await validSession(token, secret, hash)) throw new StudioError(401, "Your session has expired. Please sign in again.");
  return { id: "owner", email: "Jeremy’s website studio" };
}
export function sessionCookie(token: string, request: Request, maxAge = SESSION_SECONDS) {
  const secure = new URL(request.url).protocol === "https:" || process.env.NODE_ENV === "production";
  return `studio_session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure ? "; Secure" : ""}`;
}
export function validateOrigin(request: Request) {
  const expected = process.env.STUDIO_SITE_ORIGIN || new URL(request.url).origin;
  if (request.headers.get("origin") !== expected) throw new StudioError(403, "Request origin is not allowed.");
}
export const cmsJson = (data: unknown, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex", "X-Content-Type-Options": "nosniff" } });
export function cmsFailure(error: unknown) {
  return cmsJson({ error: error instanceof StudioError ? error.message : "The request could not be completed." }, error instanceof StudioError ? error.status : 500);
}
export async function readBytes(request: Request, limit: number) {
  if (Number(request.headers.get("content-length")) > limit) throw new StudioError(413, "Request is too large.");
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) { await reader.cancel(); throw new StudioError(413, "Request is too large."); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return bytes;
}
export async function readJson(request: Request) {
  const bytes = await readBytes(request, 64000);
  try { return JSON.parse(new TextDecoder().decode(bytes)) as unknown; } catch { throw new StudioError(400, "Invalid request."); }
}
