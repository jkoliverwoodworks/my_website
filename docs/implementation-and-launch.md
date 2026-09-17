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

public/og-hero.jpg is a 1200 × 630 JPEG captured from the live homepage hero (headless Chrome at 1600 × 840, scaled down), so shared links show the real photography, the "Made to be kept." headline and the navigation exactly as visitors see them. Open Graph and X reference its absolute URL through `socialImage` in lib/site.ts. Recapture it whenever the hero design changes.

## Verification

- TypeScript check and production build passed.
- scripts/verify-site.mjs checks rendered HTML for every route: unique titles, descriptions, canonical/OG agreement, social metadata, one H1, main landmark, parseable business JSON-LD and image attributes. It verifies sitemap routes, robots, image/font responses and a real 404.
- Browser checks covered 320px and 390px phones, 768px tablet and the standard desktop viewport. All seven pages fit the 320px viewport without horizontal overflow.
- Verified the mobile menu opening and Escape dismissal; FAQ expansion; portfolio-to-contact selected piece; required field validation; prepared draft contents and stale-draft clearing. No inquiry was sent.

## Remaining launch work

The Sites connector returned "Sites project not found" for the exact project ID already stored in .openai/hosting.json. Its deployment helpers were also unavailable in the installed local plugin directory. Existing project identity and hosting configuration were preserved; no replacement Site was created and nothing was published. Restore access to that original Sites project before publishing.

Before public launch, confirm the client's final domain, existing email address, imagery and project/material labels. Set NEXT_PUBLIC_SITE_URL for that domain, rebuild, publish and repeat the URL checks against the live origin. Search Console submission requires the owner's verified property; it has not been performed.

The original photography remains in the project. The 4.6 MB maker portrait is a performance optimization opportunity for a later asset delivery pass. Local checks do not establish real-user Core Web Vitals, search ranking, indexing or rich-result eligibility.
