import { decodeBase64 } from "@/lib/studio-git";
import { CmsError, cmsFailure, requireAdmin, studioGit } from "@/lib/studio-server";
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    if (!/^[a-f0-9-]{36}$/.test(id)) throw new CmsError(404, "Image not found.");
    const git = studioGit(); const snapshot = await git.site();
    const media = snapshot.site.media.find(item => item.id === id);
    if (!media) throw new CmsError(404, "Image not found.");
    const blob = await git.request<{ content: string; encoding: string }>(`/git/blobs/${media.sha}`);
    if (blob.encoding !== "base64") throw new CmsError(502, "Image could not be previewed.");
    return new Response(decodeBase64(blob.content), { headers: { "Content-Type": media.mime, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex" } });
  } catch (error) { return cmsFailure(error); }
}
