import { z } from "zod";
import { contentSchema } from "@/lib/cms-model";
import { CmsError, cmsFailure, cmsJson, studioGit, readJson, requireAdmin, validateOrigin } from "@/lib/studio-server";
export async function GET() {
  try { await requireAdmin(); return cmsJson([(await studioGit().site()).site.content]); }
  catch (error) { return cmsFailure(error); }
}
export async function PUT(request: Request) {
  try {
    validateOrigin(request); await requireAdmin();
    const input = z.object({ data: contentSchema, updated_at: z.string().datetime({ offset: true }) }).strict().safeParse(await readJson(request));
    if (!input.success) throw new CmsError(400, input.error.issues[0].message);
    const git = studioGit(); const snapshot = await git.site();
    if (snapshot.site.content.updated_at !== input.data.updated_at) throw new CmsError(409, "Content changed in another tab. Reload before saving.");
    snapshot.site.content = { data: input.data.data, updated_at: new Date().toISOString() };
    await git.save(snapshot, "Studio: update page content, pricing and FAQs");
    return cmsJson([snapshot.site.content]);
  } catch (error) { return cmsFailure(error); }
}
