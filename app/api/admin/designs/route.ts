import { z } from "zod";
import { designSchema } from "@/lib/cms-model";
import { CmsError, cmsFailure, cmsJson, studioGit, readJson, requireAdmin, validateOrigin } from "@/lib/studio-server";
export async function GET() {
  try { await requireAdmin(); return cmsJson((await studioGit().site()).site.designs); }
  catch (error) { return cmsFailure(error); }
}
export async function POST(request: Request) {
  try {
    validateOrigin(request); await requireAdmin();
    const input = z.object({ data: designSchema }).strict().safeParse(await readJson(request));
    if (!input.success) throw new CmsError(400, input.error.issues[0].message);
    const git = studioGit(); const snapshot = await git.site(); const data = input.data.data;
    if (snapshot.site.designs.some(row => row.slug === data.slug)) throw new CmsError(409, "That design URL already exists.");
    const row = { id: crypto.randomUUID(), slug: data.slug, status: data.status, position: data.position, data, updated_at: new Date().toISOString() };
    snapshot.site.designs.push(row);
    await git.save(snapshot, `Studio: add ${data.name}`);
    return cmsJson([row], 201);
  } catch (error) { return cmsFailure(error); }
}
export async function PUT(request: Request) {
  try {
    validateOrigin(request); await requireAdmin();
    const input = z.object({ id: z.string().uuid(), updated_at: z.string().datetime({ offset: true }), data: designSchema }).strict().safeParse(await readJson(request));
    if (!input.success) throw new CmsError(400, input.error.issues[0].message);
    const { id, data, updated_at } = input.data;
    const git = studioGit(); const snapshot = await git.site();
    const index = snapshot.site.designs.findIndex(row => row.id === id);
    if (index < 0) throw new CmsError(404, "Design not found.");
    const existing = snapshot.site.designs[index];
    if (existing.slug !== data.slug) throw new CmsError(400, "Existing URLs are protected. Create a new design instead of changing this slug.");
    if (existing.updated_at !== updated_at) throw new CmsError(409, "This design changed in another tab. Reload before saving.");
    const row = { id, slug: data.slug, status: data.status, position: data.position, data, updated_at: new Date().toISOString() };
    snapshot.site.designs[index] = row;
    await git.save(snapshot, `Studio: update ${data.name}`);
    return cmsJson([row]);
  } catch (error) { return cmsFailure(error); }
}
