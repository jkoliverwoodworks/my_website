# Implementation and launch notes

> The visual design and route count below describe the earlier version. See [the luxury revision](luxury-direction.md) for the current cinematic design, 13-page collection, motion asset, and verification.

## Delivered

The seven existing pages share the new visual system. The homepage uses the supplied Dribbble reference's split composition, fine serif headline, warm palette, photo caption and restrained rounded actions. Other research influences appear in the object captions, materials story, maker emphasis and personal inquiry journey.

Actual tokens: paper #F6F3ED; secondary surface #ECE6DC; ink #33271F; supporting text #76614F; accent #92593D; rules #D8CFC2. Cormorant Garamond regular/italic and DM Sans are served locally, with their SIL Open Font Licenses in public. Desktop gutters scale from 24–88px; section spacing scales from 72–128px. Mobile layouts stack imagery and text and expose all routes through a keyboard-operable menu. Reduced motion, visible focus, a skip link and a custom 404 are included.

The portfolio links preserve the chosen piece in the contact page. The short form requires name and email; phone and notes are optional. Preparing an inquiry builds an email draft locally. Visitors must open and send it in their own email app, or copy the prepared text. It does not submit to a server, persist leads or claim delivery. Editing the form clears a stale draft.

## SEO

- Unique title, description, canonical, Open Graph title/description/URL/image, and X large-image metadata for all seven routes.
- One configured origin in lib/site.ts, overridable through NEXT_PUBLIC_SITE_URL. The existing project hostname remains the default until a final domain is confirmed.
- Sitemap includes exactly seven canonical pages with a real content revision date; robots references that sitemap.
- FurnitureStore JSON-LD preserves the existing business name, maker, public email, locality and service areas. It has no invented reviews, pricing, hours or street address. It does not assert Google rich-result eligibility.
- Meaningful image elements include alt attributes and dimensions; the main hero loads with high priority and below-fold images load lazily.
- Custom missing-page response and accessible internal navigation.

## Social card

public/og.png is an actual PNG, 1734 × 907 pixels (approximately 1.91:1). Both Open Graph and X reference its absolute URL. It was generated once with the built-in image tool, inspected for correct text and copied into the project. It uses abstract wood grain, not invented furniture photographs.

Final generation prompt:

> Use case: ads-marketing. Asset type: branded Open Graph social-sharing card, landscape aspect ratio 1.91:1, approximately 1200 x 630 pixels. Create an elegant, restrained, typography-led editorial graphic for J. K. Oliver Woodworks. Mostly warm ivory (#f5f2ec), with an abstract natural wood grain texture strip on the right third, a flat texture rather than a product or photographed scene. Generous blank space and comfortable margins. Left two-thirds: brand near the top, large elegant serif headline at center-left, small support text near the bottom. Fine hairline rules. Dark chocolate type #33271f and muted brown accents #80654f. Exact text, once each: "J. K. OLIVER"; "WOODWORKS"; "Made for the moments that matter."; "Custom furniture. Buda, Texas." Refined serif headline and understated support text, excellent legibility at social preview sizes. No other text, furniture, invented product photos, people, badges, icons or watermarks.

## Verification

- TypeScript check and production build passed.
- scripts/verify-site.mjs checks rendered HTML for every route: unique titles, descriptions, canonical/OG agreement, social metadata, one H1, main landmark, parseable business JSON-LD and image attributes. It verifies sitemap routes, robots, image/font responses and a real 404.
- Browser checks covered 320px and 390px phones, 768px tablet and the standard desktop viewport. All seven pages fit the 320px viewport without horizontal overflow.
- Verified the mobile menu opening and Escape dismissal; FAQ expansion; portfolio-to-contact selected piece; required field validation; prepared draft contents and stale-draft clearing. No inquiry was sent.

## Remaining launch work

The Sites connector returned "Sites project not found" for the exact project ID already stored in .openai/hosting.json. Its deployment helpers were also unavailable in the installed local plugin directory. Existing project identity and hosting configuration were preserved; no replacement Site was created and nothing was published. Restore access to that original Sites project before publishing.

Before public launch, confirm the client's final domain, existing email address, imagery and project/material labels. Set NEXT_PUBLIC_SITE_URL for that domain, rebuild, publish and repeat the URL checks against the live origin. Search Console submission requires the owner's verified property; it has not been performed.

The original photography remains in the project. The 4.6 MB maker portrait is a performance optimization opportunity for a later asset delivery pass. Local checks do not establish real-user Core Web Vitals, search ranking, indexing or rich-result eligibility.
