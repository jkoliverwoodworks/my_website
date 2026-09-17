# Luxury direction — September 17, 2026

This revision supersedes the earlier split-hero direction while preserving the existing copy, furniture assets, maker story, contact flow, and SEO foundation.

## Reference and interpretation

Reference: [Graft by Stacy More](https://dribbble.com/shots/27438346-Graft-Framer-Website-for-Furniture-Interior-Studios), with its [live preview](https://graft.framer.website/). The Dribbble motion and live hero were inspected in the browser. The live preview's visible hero text uses Inter, regular weight. Our implementation serves Inter locally under its included SIL Open Font License, with Cormorant italic accents retained from the existing site.

The adapted elements are immersive room imagery, generous display typography, fine rules, quiet navigation, and warm material colors. The composition, copy, client imagery, and page structure are J. K. Oliver's variant. No reference footage, photography, or brand assets were copied into the site.

## Motion map and asset

Updated after the user's second design review:

- The hero now holds for a scroll-controlled room journey, with no automatic video playback. Native page scrolling determines the video time, including reverse scrolling.
- The eight-second H.264 film pushes from 1.12× to about 1.46× magnification, then pulls back to 1×. The scene retreats into a paper-colored frame near the end of the sticky interval before the next section enters.
- The film is rendered from `heritage-table.jpg`; it does not invent an exterior or new room geometry. The pullback is a wider view of the existing photograph.
- Encoding: 1600 × 900, 24 fps, silent, about 4.7 MB, fast-start metadata and a keyframe every six frames for seeking. Recreate with `node scripts/render-hero.mjs /path/to/ffmpeg`.
- Desktop hero holds for approximately 1.7 viewport heights of scrolling; mobile uses a shorter interval. The progress calculation uses the actual difference between stage and sticky-panel height.
- Pause motion freezes the current video frame while keeping navigation and page scrolling available. Resume motion returns to the current scroll position.
- Reduced-motion preferences disable the pinned journey, transforms, and video loading. Data-saving mode avoids the video download and uses the underlying photograph. The still image also remains as the media failure fallback.
- Section headings, furniture cards, and editorial copy reveal once as they enter view.

## Maker note and footer revision

The homepage maker section uses a large editorial heading, a matted portrait, an overlapping wood-detail photograph, a personal letter-style text column, and Jeremy's name and story link. The text remains narrative copy rather than an invented quotation.

The shared footer now has a large commissioning invitation, a circular contact action, dedicated location/navigation/contact columns, a full-width J. K. Oliver wordmark, and a back-to-top link. It applies across all pages.

## Shared visual system

Walnut text `#49301F`, oak accent `#795A42`, warm paper `#F3EFE7`, parchment panels `#E7DFD2`, and deep walnut `#35261C`. Light oak and parchment text over the darkened hero preserve contrast. Inter gives headings a stronger architectural feel; Cormorant italic adds warmth without dominating every heading.

Homepage: cinematic opening, material strip, editorial introduction, staggered selected pieces, dark craftsmanship panel, maker story, process, and closing inquiry. The collection gets its own cinematic opening and staggered two-column gallery. Other existing pages use the same type, palette, buttons, and inset photographic heroes.

Six individual piece pages at `/work/{elm,lineage,foundry,cypress,hearth,gathering}` provide an image-led hero, existing material information, commissioning context, the selected-piece inquiry link, and a next-piece link. Shared data lives in `lib/pieces.ts`. The sitemap includes all 13 public pages.

## Validation

TypeScript, production build, and lint (no errors; existing image optimization warnings) pass. The route verifier checks metadata, canonical URLs, headings, image attributes, sitemap, robots, image/font/video responses, and the custom 404. Browser verification covers video scrubbing forward and backward, pause/resume, scroll progress, product-to-inquiry selection, desktop presentation, footer contact navigation, and mobile navigation/layout. All 13 pages were checked at 320px without horizontal overflow; desktop composition was reviewed at 1440px. The film can be recreated using `node scripts/render-hero.mjs /path/to/ffmpeg`.

This is a local implementation. It has not been published. Existing launch notes about production access, final business facts, and source imagery still apply.
