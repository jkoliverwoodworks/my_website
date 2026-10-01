# Client feedback — September 30, 2026

## What the client is asking for

This email is a refinement of the current direction, not a request for a new visual identity. The client wants a simpler site, a clearer collection/pricing model, and a shorter path from a table design to an inquiry.

### 1. Define the offer clearly

- Present the eight named tables as a **semi-custom collection**: an established design with standard dimensions, standard hardwood choices, and priced upgrades/customizations.
- Keep a separate, obvious path for someone who wants a **fully custom commission** rather than one of the collection designs.
- Recommended wording model:
  - **The Hill Country Collection** — choose a design, then tailor size, wood, base finish, and other details.
  - **Custom commissions** — begin with an idea and work directly with Jeremy on a design outside the collection.

The client asked how these two offers fit together; he did not prescribe the final answer. This positioning therefore needs approval before implementation.

### 2. Replace the current collection with eight supplied designs

Use the exact collection heading and introduction supplied by the client:

> **The Hill Country Collection**
>
> Named for the rivers that run through Central Texas, each table in the Hill Country Collection is designed to bring families back to the table and built to become part of the home for years to come.

| Design | Starting price | Standard size | Supplied image | Key construction/copy fact |
| --- | ---: | --- | --- | --- |
| The Blanco | $2,895 | 42\" diameter × 1.25\" top | `blanco.jpeg` | Round top; curved metal pedestal; open legroom |
| The Pedernales | $4,195 | 36\" × 72\" × 1.25\" top | `pedernales.jpeg` | Curved wood trestle; center stretcher; traditional detailing |
| The San Marcos | $3,895 | 42\" diameter × 1.25\" top | `san-marcos.jpeg` | Round top; sculptural wood pedestal; curved supports |
| The Guadalupe | $4,195 | 36\" × 72\" × 1.25\" top | `guadalupe.jpeg` | Sweeping curved supports; substantial center-pedestal design |
| The Frio | $2,895 | 36\" × 72\" × 1.25\" top | `frio.png` | Straightforward four-leg farmhouse design |
| The Llano | $2,895 | 36\" × 72\" × 1.25\" top | `llano.jpeg` | Hardwood top; black powder-coated trapezoid steel legs |
| The Brazos | $4,195 | 36\" × 72\" × 1.25\" top | `brazos.jpeg` | X-shaped trestle supports; center stretcher |
| The Colorado | $2,995 | 36\" × 72\" × 1.25\" top | `colorado.jpeg` | Square legs; traditional apron construction |

The current six placeholder designs (Elm, Lineage, Foundry, Cypress, Hearth, and Gathering) should be replaced, not retained alongside the new collection, unless the client says otherwise.

### 3. Add the supplied pricing framework

Display the following assumptions wherever the collection prices are explained:

- Rectangular tables: 36\" × 72\"
- Round tables: 42\" diameter
- Material: red oak or pecan
- Solid-hardwood construction
- Wood bases are painted as standard
- Matching natural-wood bases are an upgrade
- Larger sizes, premium hardwood species, and other customizations are priced separately

Recommended placement: a concise note on the collection page, full details on each design page, and a consolidated explanation on the Investment & FAQs page. Prices should be labeled **starting price** or **standard configuration price** so the relationship to upgrades is unambiguous.

### 4. Simplify the homepage carousel

- Change automatic progression from 3 seconds to 5 seconds.
- Remove the description paragraph from each slide.
- Keep the table name, the “Explore this design” link, and the `01 / 08`-style carousel position.
- Populate the carousel with all eight new designs and their supplied images.

### 5. Shorten the inquiry path on every table page

- Put the inquiry form directly on each table detail page.
- Preselect or otherwise identify the design being viewed.
- Remove the extra trip to the separate Contact page for design-specific inquiries.
- Keep the general Contact page for fully custom commissions and people who have not chosen a collection design.

The present form prepares a mailto draft; it does not send data itself. The client's wording may mean only “show the form on the same page,” or it may mean a true one-step submission. A true direct submission requires an approved receiving mailbox and a form-delivery service/server endpoint.

### 6. Simplify individual table pages

- Remove promotional description overlays/boxes that compete with the photograph.
- Remove the current left-side stack of character/material/origin description blocks.
- Use the client's short product description as the primary copy.
- Give the remaining space to the embedded inquiry form.
- Show the verified price, standard dimensions, material/base assumptions, and customization note as compact facts.

### 7. Reduce decorative numbering and repeated structure

- Retain numbering in the homepage carousel because the client explicitly likes it there.
- Remove decorative `01 / 02 / 03 / 04` chapter labels where they repeat the page hierarchy on the homepage, collection, craftsmanship, process, and maker pages.
- Avoid nested numbering, such as “01 Selected Work” containing designs numbered 01–03.
- Keep numbers only where they communicate a real sequence, such as process steps, and do not wrap those steps in another numbered chapter.

### 8. Correct brand language and inconsistent claims

- Change the footer tagline to the client's requested order: **Hill Country Roots. Authentic Craftsmanship.**
- Remove or replace **“Rooted here. Made for you.”** until the client is comfortable that it cannot be read as a claim that the wood originates in Central Texas. This is a copy-risk response, not a legal conclusion.
- Remove the old “Foundry / oak & steel” mismatch by replacing the old collection with the verified river-named designs.
- Replace repeated uses of “honest materials” / “honest hardwood” with more specific language such as “solid hardwood,” “natural grain,” or “carefully selected material.”
- Standardize solo-maker language. Prefer **Jeremy / I / one maker** for craftsmanship and production. Use **we** only for a genuine collaboration between Jeremy and the customer, not to imply a multi-person workshop.

### 9. Simplify the Craftsmanship and Maker pages

- Remove the Craftsmanship-page “Our approach / Good furniture earns its place. Then keeps it.” block.
- Consolidate the Maker page so Jeremy's story reads as one narrative instead of three numbered chapters.
- Remove the repeated second set of `01 / 02 / 03` principles on the Maker page.
- Reach the “Your story comes next” call to action sooner.

### 10. Verify navigation

- Test the header's **Our work** link from the homepage on desktop and mobile.
- The current source points it to `/work`, so the reported behavior may have come from an older deployment or a client-side routing/scroll issue. Treat this as a regression test, not a confirmed source-code mapping error.

## Recommended implementation sequence after approval

1. Replace the collection data model with the eight river designs, verified copy, dimensions, and starting prices.
2. Wire the supplied assets into the collection, homepage carousel, detail pages, metadata, alt text, and structured data.
3. Simplify the homepage carousel and collection presentation.
4. Redesign individual table pages around the product image, compact facts, and embedded inquiry form.
5. Add separate semi-custom and fully custom paths in navigation/calls to action.
6. Remove redundant numbering and consolidate the Maker/Craftsmanship content.
7. Correct the footer/tagline, maker voice, and repeated “honest” wording.
8. Update old design references in SEO documentation, sitemap/static params, metadata, and internal links; add redirects only if the old URLs have already been published/indexed.
9. Verify responsive layouts, navigation, inquiry behavior, metadata, build, and lint.

## Approved decisions

Approved September 30, 2026:

1. Replace all six placeholder designs with the eight supplied designs.
2. Distinguish the semi-custom Hill Country Collection from fully custom commissions.
3. Use a direct-submit inquiry form with an email-draft fallback when delivery is unavailable.
4. Retain `jeremyoliver@att.net` as the receiving/public address until the domain mailbox is provisioned and tested.
5. Use the supplied images for implementation; request higher-resolution originals for production when available.

## Asset readiness and quality note

All eight images from the email have been extracted without recompression and renamed to match their designs under `public/client-assets/hill-country-collection/`. The mapping was checked visually against the descriptions (metal pedestal, curved wood bases, four-leg designs, trapezoid steel legs, and X-trestle base).

The supplied files are 640 pixels wide. They are ready for layout and approval work, but they are below ideal resolution for full-width hero imagery and high-density desktop screens. Higher-resolution originals should be requested for the production launch if available.
