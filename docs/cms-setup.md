# Git-backed website studio

The CMS now lives at `/studio`, uses the website's own design system, and saves content and optimized images to a GitHub repository. There is no CMS database, Supabase connection, or third-party editing dashboard. Old `/admin` URLs redirect to the studio. The existing inquiry email flow is unchanged.

## How it works

- Public pages read the committed `content/site.json` snapshot included in their deployment. They make **zero CMS/GitHub API calls** for visitors.
- The signed-in studio reads the latest repository snapshot, not the potentially older deployed copy.
- Save & publish creates a commit on the configured production branch. A connected Git deployment builds that commit. The website changes only after a successful deployment.
- Uploading creates one atomic commit containing both `public/media/<uuid>.webp` (or a supported fallback image format) and its metadata. The studio can preview the image immediately through an authenticated server endpoint.
- Uploads become public static assets after deployment, including unused images. Draft designs are hidden from public pages, **not a confidentiality feature** for their photos. Never upload private material.
- Each save/upload queues its own deployment. This first version does not batch a whole editing session into one publish. Edit related fields together before saving.
- No local production filesystem writes: images/content survive deployments in Git. Developer deployments must include the latest CMS commits; deploying an old checkout intentionally restores its old content.
- If GitHub is unavailable, public pages keep serving their deployed snapshot. Studio reads/writes and sign-ins fail closed rather than falling back or silently losing changes.
- The interface reports a repository save, **not verified deployment success**. This version does not monitor hosting build status.

## One-time connection

No repository writes, credential setup, pushes, cloud migrations or deployments were performed during implementation. A read-only design preview is available at `/studio/preview` while connecting the real studio.

1. Use a **private GitHub repository** containing this application, `content/site.json`, and the existing public image files. Set an explicit branch matching the hosting provider's production branch. Do not guess the branch or use a different source repository.
2. Create a [fine-grained GitHub token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens): access only to this repository, **Contents: read and write**, plus the automatically granted metadata access. No Actions, administration, or workflows permission is needed. Set an expiry and schedule renewal. Branch rules must permit this account/token to update the production branch and create/update `codex/studio-security`; review the narrowest suitable rules rather than disabling protection across the repository.
3. Configure the server-only values below in ignored `.env.local` and the hosting provider's production environment. Do not paste secrets into chat, browser code, Git, or a `NEXT_PUBLIC_` variable.

```text
STUDIO_GITHUB_OWNER=
STUDIO_GITHUB_REPO=
STUDIO_GITHUB_BRANCH=
STUDIO_GITHUB_TOKEN=
STUDIO_PASSWORD_HASH=
STUDIO_SESSION_SECRET=
STUDIO_SITE_ORIGIN=https://your-production-domain
```

Leave the origin empty for localhost. In production set the exact HTTPS origin without a trailing slash. Leave studio credentials unset in untrusted preview deployments. For local live-edit testing, connect a separate test repository/branch: **local studio saves still write to whichever GitHub branch you configure**.

### Set the password

Use a unique password of at least 8 characters. The helper reads it from standard input and outputs a salted PBKDF2-SHA256 hash with 600,000 iterations. It does not save the plaintext password or create a credential automatically.

On this macOS/zsh environment, run this yourself in a private terminal. Password entry is hidden; it does not enter shell history:

```zsh
read -s "studio_password?Choose a unique studio password (8+ characters): "
printf '\\n'
printf '%s' "$studio_password" | npm run --silent studio:password-hash
unset studio_password
```

Copy the resulting hash literally to `STUDIO_PASSWORD_HASH`. The colon-separated format avoids environment-variable expansion issues in both local and hosted builds.

Generate a separate random session secret yourself:

```text
node --input-type=module -e 'import { randomBytes } from "node:crypto"; console.log(randomBytes(32).toString("hex"))'
```

Copy it to `STUDIO_SESSION_SECRET`. Keep these outputs private. Restart the local preview after configuring values, then visit `/studio/login`. There is no default password, public signup, or browser-stored password.

### Hosting connection

For Vercel, connect this repository, use the production branch above, Next.js framework, and `npm run vercel-build`. The provided `vercel.json` sets the framework/build command and disables deployment of `codex/studio-security`, so sign-in attempts do not generate website builds. Confirm that this rule is active before first login. For other hosts, explicitly exclude that branch from builds too.

Git commits made through the studio trigger builds only if the host's Git integration is configured and author/repository access requirements are satisfied. The existing Sites preview integration is retained, but Sites native publication is **not** automatically triggered by this Git adapter. Configure a Git-connected production host before handing off publishing to the client.

Use a hosting plan licensed for a commercial client site; Vercel Hobby is restricted to non-commercial personal use. Verify current plan limits and pricing separately from CMS costs.

## Editing

- Designs: Essentials contains the name, description and starting price. Images, Details & SEO, and Publishing have their own tabs. Switching design tabs preserves the draft; Save & publish validates and saves the entire design.
- Existing URL slugs are locked. New published designs are included in the next deployment.
- Page content: separate Home, Work, Meet the Maker, Craftsmanship, Process, Investment, and Contact tabs expose the key copy and relevant banner photographs. Biography fields use recognizable section names. Content previews are simplified, not full-page renders. Work collection guidance is also used on Home.
- Pricing & FAQs: separate Pricing and FAQs tabs with content previews. FAQ editing shows one question at a time. Standard configuration text and FAQ entries are editable; the public price range is calculated from published designs.
- Switching page tabs, pricing/FAQ tabs, or main sections prompts before discarding unsaved content changes.
- Media: JPEG/PNG/WebP input under 20 MB. The browser decodes and resizes to a maximum 2400-pixel long edge, then encodes WebP at 82% quality where supported. The server accepts only matching raster signatures/MIME and at most 1.5 MB per file.
- Library pickers let the client choose existing design/maker photos or new uploads. Images need a short accessibility description.
- Archive rather than delete designs. Replaced images remain in Git for recovery.
- Static page layouts, secondary copy not exposed in the page tabs, generic SEO/contact details and the inquiry mailbox remain code-controlled.
- Colorado copy is still awaiting client approval; existing text was preserved.
- A single owner password is supported, not multi-user roles or a customer CRM.

## Security

Every editing/media-preview API checks the server-signed session. Mutations require a matching Origin. The password hash and Git token never enter browser code. Sessions are HMAC-signed, expire after eight hours, and use HttpOnly/SameSite=Strict cookies (Secure in HTTPS/production). Changing either the password hash or session secret invalidates all sessions.

Logout clears the browser cookie. Stateless signed sessions cannot individually revoke a copied/stolen cookie before expiry; rotate the session secret immediately after a suspected breach.

Sign-in consumes a **shared limit of five attempts per fifteen-minute window**, persisted via atomic Git commits on `codex/studio-security`. This includes successful logins, preventing unlimited parallel password checks. No IP addresses or passwords are stored there. Multiple server instances cannot bypass it. After five attempts the owner may need to wait; an attacker can also exhaust this shared allowance. Add hosting/firewall request throttling on `/api/admin/*` before launch to reduce denial-of-service and GitHub quota abuse. Login attempt metadata is not security-critical content and is never deployed.

Concurrent edits use per-record timestamps and non-forced Git branch updates. A stale edit or competing developer commit returns 409 instead of overwriting newer content. Reload before retrying. If a network timeout occurs during the final commit update, reload and check the repository before repeating a save: the commit may already have succeeded.

The server validates size, MIME and file signature; full server-side decoding/re-encoding is not implemented. Browser-side decoding is not a security boundary. Do not accept SVG/HTML. For untrusted multi-user uploads, add a compatible server image decoder before broadening access.

Studio routes are noindex and excluded in robots. The public read-only preview contains deployed published design data only and cannot save or upload; it is not an authentication bypass.

## Limits, maintenance and recovery

Low monthly editing is a good fit, **not an unlimited-usage guarantee**. GitHub API quotas, repository history, hosting requests/bandwidth/builds, token expiry, and failures still apply. No visitor traffic consumes GitHub API quota. The studio loads all editing data in one snapshot request to avoid redundant repository reads.

Guardrails: maximum 500 designs, 500 uploaded images, 100 MB total tracked CMS-media bytes, 1.5 MB per optimized upload, and 800 KB content JSON. These are application safety limits, not purchased storage entitlements. Old images also remain in Git history; monitor total repository size periodically. Stop and arrange image-storage maintenance if the library grows substantially rather than silently removing photos.

Keep an independent repository backup and protect the GitHub account with MFA. Git history permits reviewing/restoring content and image revisions but is not a substitute for a backup. Restore via a new reviewed commit, keeping unrelated application changes intact. Do not force-push or reset the repository as routine CMS recovery.

Remove any old provider credentials from local/hosting environments after verifying migration. No previously stored cloud data was deleted.

## Verification

```text
npm run test:cms
npm run test:cms:http
npx next typegen
npx tsc --noEmit --incremental false
npm run vercel-build
npm run build
```

Run builds sequentially: Vinext and Next.js both generate files under `.next`; after Vinext, regenerate Next types before another Next typecheck.

Unit tests cover hashes, tampering, expiry, credential rotation, content validation, mock Git persistence, atomic media commits, concurrency conflicts, shared throttling, and fail-closed behavior. HTTP tests cover anonymous/cross-origin denial and route redirects.

Before client handoff, use a dedicated connected test repository to verify real authorized login/logout, upload/compression, image selection, price/text edits, new/draft/archive designs, stale writes, token expiry, saves surviving restart, and successful Git-triggered deployment. Real GitHub publishing/authentication have not been verified without credentials.
