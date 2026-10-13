import { imageType } from "@/lib/cms-model";
import { CmsError, cmsFailure, cmsJson, readBytes, requireAdmin, studioGit, validateOrigin } from "@/lib/studio-server";
export async function GET() {
  try { await requireAdmin(); return cmsJson((await studioGit().site()).site.media.slice().reverse()); }
  catch (error) { return cmsFailure(error); }
}
export async function POST(request: Request) {
  try {
    validateOrigin(request); await requireAdmin();
    const bytes = await readBytes(request, 1500000);
    let alt: string;
    try { alt = decodeURIComponent(request.headers.get("x-image-alt") || "").trim(); }
    catch { throw new CmsError(400, "Invalid image description."); }
    if (!bytes.length || !alt || alt.length > 250) throw new CmsError(400, "Choose an image and add a short description.");
    const mime = imageType(bytes);
    if (!mime || mime !== request.headers.get("content-type")) throw new CmsError(400, "Only JPEG, PNG and WebP images are accepted.");
    const git = studioGit(); const snapshot = await git.site();
    if (snapshot.site.media.length >= 500 || snapshot.site.media.reduce((total, item) => total + item.bytes, 0) + bytes.length > 100000000) throw new CmsError(413, "The media library needs developer maintenance before adding more images.");
    const blob = await git.blob(bytes);
    const id = crypto.randomUUID();
    const extension = mime === "image/jpeg" ? "jpg" : mime === "image/png" ? "png" : "webp";
    const path = `/media/${id}.${extension}`;
    snapshot.site.media.push({ id, path, sha: blob.sha, alt, mime, bytes: bytes.length });
    // Image and metadata become visible together in a single atomic branch update.
    await git.save(snapshot, "Studio: upload an optimized image", [{ path: `public${path}`, mode: "100644", type: "blob", sha: blob.sha }]);
    return cmsJson({ id, image: path, alt }, 201);
  } catch (error) { return cmsFailure(error); }
}
