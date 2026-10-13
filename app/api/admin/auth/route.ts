import { z } from "zod";
import { authConfig, cmsJson, cmsFailure, CmsError, readJson, requireAdmin, sessionCookie, studioGit, validateOrigin } from "@/lib/studio-server";
import { checkPassword, createSession } from "@/lib/studio-security";
export async function GET() {
  try { return cmsJson({ user: await requireAdmin() }); } catch (error) { return cmsFailure(error); }
}
export async function POST(request: Request) {
  try {
    validateOrigin(request);
    const parsed = z.object({ password: z.string().min(1).max(256) }).strict().safeParse(await readJson(request));
    if (!parsed.success) throw new CmsError(400, "Enter your studio password.");
    const { secret, hash } = authConfig();
    await studioGit().consumeLoginAttempt();
    if (!await checkPassword(parsed.data.password, hash)) throw new CmsError(401, "Unable to sign in with that password.");
    const result = cmsJson({ ok: true });
    result.headers.set("Set-Cookie", sessionCookie(await createSession(secret, hash), request));
    return result;
  } catch (error) { return cmsFailure(error); }
}
export async function DELETE(request: Request) {
  try {
    validateOrigin(request);
    const response = cmsJson({ ok: true });
    response.headers.set("Set-Cookie", sessionCookie("", request, 0));
    return response;
  } catch (error) { return cmsFailure(error); }
}
