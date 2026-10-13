import { cmsFailure, cmsJson, requireAdmin, studioGit } from "@/lib/studio-server";
export async function GET() {
  try { await requireAdmin(); const snapshot = await studioGit().site(); return cmsJson({ ...snapshot.site, commit: snapshot.sha }); }
  catch (error) { return cmsFailure(error); }
}
