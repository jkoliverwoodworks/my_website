# Client feedback: analysis and implementation plan

## Analysis

The feedback is not asking for a new visual direction. It asks for a clearer, more practical version of the existing direction: easier browsing, stronger trust signals, more authentic branding, and copy that sounds confident rather than precious.

- **Responsive experience:** The site should retain the same hierarchy on desktop, tablet, and phone while adapting interaction patterns. The collection should be swipeable on touch devices, portfolio cards should move from two columns to one, and controls should remain large enough to tap.
- **Brand authenticity:** The supplied J. K. Oliver logo should replace the typeset wordmark. The requested tagline should close the page as a deliberate brand signature.
- **Collection model:** Names should describe repeatable table designs, not one-off customer pieces. The interface and copy should consistently call them design families and make clear that dimensions, wood, and finish can be customized.
- **Homepage browsing:** The scroll-scrub/zoom hero delays access to the work. A conventional carousel should put every current design at the top, with direct links and clear controls.
- **Family story:** The family portrait is the trust-building image. The decorative table-detail overlay currently obscures the portrait and the portrait crop hides a family member, so both should be corrected.
- **Portfolio layout:** A regular two-column desktop grid is easier to scan than the current alternating featured layout. The metal-base design should be explicitly identified.
- **Copy:** “Made slowly” can imply delay. Language should emphasize care, durability, clarity, and direct collaboration.
- **Warranty and terms:** A one-year warranty is a meaningful trust signal and should be visible now. Detailed legal coverage must come from the client's actual Terms and Conditions document; it should not be invented.
- **Email:** `info@jk...` requires a domain mailbox provider and DNS configuration. The website can display it only after the mailbox exists and has been tested.
- **SEO:** Technical foundations already exist (metadata, canonical URLs, sitemap, robots, structured data). Copy and schema should consistently target Buda and Central Texas, and the warranty/FAQ content should support trust-oriented searches.

## Implementation plan

1. Replace the homepage cinematic hero with an accessible, touch-enabled collection carousel containing every current design.
2. Replace the header wordmark with the supplied logo and add a centered footer logo/tagline lockup.
3. Present portfolio items as customizable design families in an even two-column grid, collapsing to one column on phones.
4. Remove the decorative overlay from the family section and use a wide, uncropped family portrait.
5. Rewrite confidence-sensitive craftsmanship and process copy.
6. Add a one-year craftsmanship warranty signal and FAQ entry while reserving detailed terms for the supplied legal document.
7. Change public service-area language and structured data to Buda and Central Texas.
8. Verify lint, production build, internal links, responsive layout, accessible carousel behavior, and SEO output.

## Content still needed from the client

- Final homepage, portfolio, craftsmanship, process, and maker copy edits.
- Confirmed names for the Texas-river design families and which existing photos map to each name.
- The Terms and Conditions / warranty document in its final approved form.
- Confirmation that `info@jkoliverwoodworks.com` has been provisioned and tested before replacing the current contact address.
