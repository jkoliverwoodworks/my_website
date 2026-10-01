# SEO Game Plan — J. K. Oliver Woodworks

_Last updated: 2026-09-17 · Prepared by Moil_

This is the working SEO plan for the J. K. Oliver Woodworks website. It covers the technical work on the site and the local, content and reputation work that decides whether Jeremy shows up when someone near Austin searches for a custom dining table.

Every item has an owner:

- **Owner: Developer (Moil)**: code, hosting, schema, analytics setup, content production support.
- **Owner: Client (Jeremy)**: anything that needs the business owner's identity, accounts, photos, relationships or customers.

The client-facing version of Jeremy's tasks is in [client-seo-requirements.md](client-seo-requirements.md).

---

## 1. Context

| Item | Current state |
| --- | --- |
| Business | Custom solid-wood dining tables and furniture, handmade by Jeremy Oliver in Buda, TX |
| Service area | Buda, Austin, Dripping Springs, Wimberley, Texas Hill Country |
| Positioning | Quiet luxury, editorial, personal. One maker, heirloom pieces. Former banker of about 20 years, family-driven story |
| Domain | Temporary `chatgpt.site` subdomain. **A custom domain is the #1 blocker.** Canonical origin comes from `NEXT_PUBLIC_SITE_URL` |
| NAP data | Name and email (`jeremyoliver@att.net`) only. No phone, public address, hours, social profiles or reviews |
| Lead capture | `/contact` builds an email draft that the visitor sends from their own email app. Nothing is submitted to a server, so completed inquiries can't be measured on the site yet |
| Brand guardrail | Copy must stay elegant and restrained. No keyword stuffing, no spammy city lists, no fake urgency |

---

## 2. Goals and KPIs

The main goal is **qualified commission inquiries**, not raw traffic. A custom-table business needs a small number of the right leads.

| Goal | KPI | How it's measured | Target direction |
| --- | --- | --- | --- |
| Show up in local results | GBP appearances in Search and Maps; local pack position for core terms | GBP Performance, manual/grid rank checks | Appear in the local pack for "custom dining table" terms in Buda / South Austin within 3–6 months of GBP verification |
| Rank organically | Impressions, clicks and average position for target clusters | Google Search Console | Month-over-month growth in non-branded impressions and clicks |
| Build trust | Number of Google reviews, average rating, review recency | GBP | Steady flow of genuine reviews from past and new clients. At least one new review a month once the backlog is asked |
| Generate inquiries | Contact-form draft opens, email clicks, phone calls (once a phone exists), GBP calls/website clicks/messages | Analytics events + GBP Performance | Track a baseline for the first 60 days, then set numeric targets |
| Brand search | Searches for "J. K. Oliver Woodworks" / "Jeremy Oliver woodworking" | Search Console queries, GBP | Growth shows word of mouth and PR are working |

> We don't set numeric targets until we have 60 days of baseline data from Search Console and GBP. Any numbers set before then would be guesses.

---

## 3. Target keyword clusters

**Search volumes and difficulty are not listed on purpose.** They need to be checked in Google Keyword Planner and, once the domain is live, in Search Console before we prioritize. Local furniture terms often show low or "no data" volume in tools but still bring valuable leads.

| # | Cluster | Example queries (to be validated) | Intent | Primary page |
| --- | --- | --- | --- | --- |
| A | Custom dining tables, Austin | custom dining tables Austin; custom dining table Austin TX; handmade dining table Austin; dining table maker Austin | Commercial / local | `/` (home) |
| B | Handmade / solid wood, Texas | handmade dining table Texas; solid wood dining table Texas; Texas made furniture; heirloom dining table | Commercial | `/`, `/craftsmanship` |
| C | Local maker, Buda / Hays County | custom furniture Buda TX; woodworker Buda TX; furniture maker near me; custom woodworking Kyle / San Marcos | Local / "near me" | `/`, `/maker`, **GBP** (mostly won in the Maps pack) |
| D | Hill Country towns | custom furniture Dripping Springs; farmhouse table Hill Country; custom table Wimberley | Local / commercial | `/work` + future project case studies |
| E | Wood species | red oak dining table; pecan dining table; solid hardwood dining table Texas | Commercial / research | `/work`, `/craftsmanship`, and the Hill Country Collection design pages; future species guides |
| F | Styles | farmhouse dining table; modern dining table solid wood; trestle table; live edge table (only if Jeremy builds these) | Commercial / inspiration | `/work` pieces + future content |
| G | Cost and planning | how much does a custom dining table cost; custom dining table lead time; custom table vs store bought | Informational, close to buying | `/investment` |
| H | Process / commissioning | how to commission custom furniture; working with a furniture maker | Informational | `/process` |
| I | Sizing and care guides | dining table size for 8 people; how to care for a solid wood table; oil vs polyurethane finish table | Informational (top of funnel) | Future guides (Section 7) |
| J | Brand / person | J. K. Oliver Woodworks; Jeremy Oliver furniture Buda | Navigational | `/`, `/maker`, GBP |

**Rules for using keywords**

- One main cluster per page. Use the phrase naturally in the title, H1 or intro, and one or two times in body copy. Never force a city name into every paragraph.
- Only target styles and species Jeremy actually builds and wants to sell. Confirm live-edge, farmhouse, trestle and benches with Jeremy before creating content.
- Put "near me" effort into GBP and reviews. Pages should not repeat the phrase "near me".

---

## 4. Page-to-keyword mapping

| Route | Current title | Primary focus | Secondary focus | Notes / next improvements | Owner |
| --- | --- | --- | --- | --- | --- |
| `/` | Custom Dining Tables in Austin \| J. K. Oliver Woodworks | Custom dining tables Austin (A) | Handmade solid wood Texas (B); Buda maker (C) | Make sure visible copy says "Buda, Texas" and "Austin & the Hill Country" early. Link to /work pieces by species | Developer |
| `/work` | Custom Furniture Portfolio | Custom furniture portfolio Austin / Hill Country (D, F) | Species names (E) | Add short captions naming the wood and, once allowed, the general area where each piece lives ("a family home in Dripping Springs") | Developer + Client (details) |
| `/work/blanco` | The Blanco \| Hill Country Collection | Round metal-pedestal dining table (F) | Semi-custom dining table Texas | Price, standard size, description, image, and Product schema are present | Developer |
| `/work/pedernales` | The Pedernales \| Hill Country Collection | Curved trestle dining table (F) | Hill Country dining table (D) | Price, standard size, description, image, and Product schema are present | Developer |
| `/work/san-marcos` | The San Marcos \| Hill Country Collection | Round wood-pedestal dining table (F) | Semi-custom dining table Texas | Price, standard size, description, image, and Product schema are present | Developer |
| `/work/guadalupe` | The Guadalupe \| Hill Country Collection | Curved pedestal dining table (F) | Transitional dining table Texas | Price, standard size, description, image, and Product schema are present | Developer |
| `/work/frio` | The Frio \| Hill Country Collection | Farmhouse dining table (F) | Solid hardwood dining table Texas | Price, standard size, description, image, and Product schema are present | Developer |
| `/work/llano` | The Llano \| Hill Country Collection | Wood and steel dining table (F) | Modern dining table Austin | Price, standard size, description, image, and Product schema are present | Developer |
| `/work/brazos` | The Brazos \| Hill Country Collection | X-trestle dining table (F) | Handcrafted hardwood table | Price, standard size, description, image, and Product schema are present | Developer |
| `/work/colorado` | The Colorado \| Hill Country Collection | Four-leg dining table (F) | Versatile hardwood dining table | Price, standard size, description, image, and Product schema are present | Developer |
| `/craftsmanship` | Solid-Wood Furniture Craftsmanship | Handmade solid wood furniture (B) | Hardwood species, joinery, finishes (E, I) | Good hub for linking to future species and care guides | Developer |
| `/process` | The Custom Furniture Process | How to commission custom furniture (H) | Custom furniture Austin process | Add realistic timeline ranges once Jeremy confirms them | Developer + Client |
| `/maker` | Meet Jeremy Oliver, Furniture Maker | Jeremy Oliver furniture maker Buda (C, J) | Woodworker Buda TX | Person schema (in progress). Add real workshop photos. The banker-to-maker story is strong for press and E-E-A-T | Developer + Client (photos, story details) |
| `/investment` | Dining Table Pricing & FAQs | Custom dining table cost (G) | Lead times, delivery Austin | Published Hill Country Collection price range, standard assumptions, and FAQPage schema are present | Developer |
| `/contact` | Start Your Custom Furniture Project | Commission a custom table (conversion) | — | Add phone and service-area text once available. Add conversion tracking (Section 9) | Developer + Client |

---

## 5. Technical SEO checklist

Status key: **DONE** · **IN PROGRESS** · **TODO** · **BLOCKED** (waiting on client)

| Item | Status | Owner | Notes |
| --- | --- | --- | --- |
| Unique title and meta description on every route | DONE | Developer | Set with `pageMetadata()` in `lib/site.ts` |
| Canonical URLs | DONE | Developer | Built from `NEXT_PUBLIC_SITE_URL` |
| Open Graph + Twitter/X cards | DONE | Developer | |
| New OG share image from the real homepage hero (1200×630) | DONE | Developer | `public/og-hero.jpg`; replaced the abstract wood-grain card. Recapture if the hero changes |
| robots.txt | DONE | Developer | References sitemap |
| sitemap.xml | DONE | Developer | |
| Image entries in sitemap | DONE | Developer | Lead images per route in `app/sitemap.ts` |
| FurnitureStore JSON-LD (locality, service areas, founder) | DONE | Developer | Currently has locality only |
| WebSite schema + enriched LocalBusiness/FurnitureStore schema | DONE (phone/hours/sameAs pending client data) | Developer | Add phone, `sameAs` social links, logo, hours **only when real data exists**. Never make up reviews or ratings |
| BreadcrumbList JSON-LD on inner pages | DONE | Developer | All inner routes incl. each `/work/[slug]` |
| FAQPage JSON-LD on `/investment` | DONE | Developer | Google now shows FAQ rich results mainly for authoritative government/health sites, so expect little visual change. The markup still helps machines understand the page |
| Person schema for Jeremy on `/maker` | DONE | Developer | Link `sameAs` to real profiles once they exist |
| Web app manifest | DONE | Developer | `/manifest.webmanifest` |
| Semantic headings (one H1 per page) | DONE | Developer | Checked by `scripts/verify-site.mjs` |
| Descriptive alt text | DONE | Developer | Update alt text when real project photos are added |
| Lazy-loaded below-fold images, prioritized hero | DONE | Developer | |
| **Custom domain + 301 from temporary host** | BLOCKED | Client decides and gives DNS access → Developer configures | Highest priority. Links, citations and GBP must all point at the final domain, so none of the local SEO work should start before it's live |
| Set `NEXT_PUBLIC_SITE_URL` to final domain, rebuild, re-verify | BLOCKED | Developer | Right after the domain goes live |
| Force HTTPS and a single host (www or apex) | TODO | Developer | Cloudflare redirect rules |
| Make sure the temporary host can't be indexed after launch | TODO | Developer | 301 to the new domain, or noindex if a redirect isn't possible |
| Image weight optimization (e.g. 4.6 MB maker portrait) | TODO | Developer | Use modern formats and responsive sizes |
| Core Web Vitals check on the live domain (PageSpeed Insights + CrUX when data exists) | TODO | Developer | Lab checks alone don't show real-user performance |
| Google Search Console: verify domain property (DNS TXT), submit sitemap | BLOCKED | Developer (needs DNS access from client) | Add Jeremy as an owner too |
| Bing Webmaster Tools (import from GSC) | TODO | Developer | |
| Analytics + conversion events | TODO | Developer | See Section 9 |
| Visible NAP in footer/contact (name, phone, service area) | BLOCKED | Client provides phone → Developer | Must match GBP exactly |
| Richer product detail on `/work/[slug]` (dimensions, species, finish, seating, more photos) | BLOCKED | Client provides details | Thin pages are the biggest on-page weakness |
| Internal linking between pieces, species, process, investment | TODO | Developer | Add as content grows |
| 404 page and no broken links | DONE | Developer | Recheck monthly |
| Professional domain email (e.g. `jeremy@<domain>`) | TODO | Client decides → Developer helps with DNS/MX | Looks more trustworthy than an ISP address. Keep forwarding from att.net during the switch |

---

## 6. Local SEO strategy

For a one-person furniture maker, **Google Business Profile (GBP), reviews and consistent citations** will likely bring more leads than the website on its own. The website supports GBP by confirming the same details.

### 6.1 Google Business Profile — Owner: Client (Developer supports)

- Create or claim the profile at business.google.com using an account Jeremy controls. Add Moil as a Manager, not the Owner.
- **Service-area business setup.** If Jeremy works from a home shop, hide the street address and list service areas (Buda, Austin, Kyle, Dripping Springs, Wimberley, San Marcos, etc.). Google's guidelines don't allow showing a home address customers can't visit.
- **Categories.** Primary category should be something like "Furniture maker". Secondary options could include "Custom furniture store"/"Furniture store" or "Woodworker"/"Carpenter". The category list changes, so pick the closest options the GBP interface offers.
- Business name must match the real-world name exactly: "J. K. Oliver Woodworks". **Don't add keywords to the name.** This breaks guidelines and can get the profile suspended.
- Complete description, services, products (one per table design, linking to its `/work/...` page), photos, and hours or "by appointment" if the interface offers it.
- Use UTM-tagged website links so GBP traffic shows up in analytics, e.g. `?utm_source=google&utm_medium=organic&utm_campaign=gbp`. **Owner: Developer** provides the links.
- Ongoing: weekly photo or post, answer messages and questions, reply to every review.

### 6.2 NAP consistency — Owner: Client (Developer keeps site in sync)

Pick **one** version of name, phone, website URL and service area. Use it exactly the same way everywhere: site footer, schema, GBP and every directory below. We'll keep a master NAP record in this repo once the details are final.

### 6.3 Citations (priority order)

| Priority | Platform | Why | Owner |
| --- | --- | --- | --- |
| 1 | Google Business Profile | Local pack and Maps | Client |
| 1 | Apple Business Connect | Apple Maps / Siri, used on iPhones | Client |
| 1 | Bing Places for Business | Bing, some voice assistants. Can import from GBP | Client (Developer can assist) |
| 2 | Houzz (Pro profile) | High-intent home design audience; designers look for makers here | Client |
| 2 | Yelp for Business | Strong in Austin; feeds some other services | Client |
| 2 | Facebook Business Page | Citation, reviews, local groups | Client |
| 2 | Nextdoor Business Page | Neighborhood recommendations in Buda/Kyle/South Austin | Client |
| 3 | Buda Area Chamber of Commerce | Local backlink, trust, networking (membership fee) | Client |
| 3 | Greater Austin / Hays County-area chambers (optional) | Same, wider reach | Client |
| 3 | BBB (listing or accreditation) | Trust signal for high-ticket purchases. Accreditation is optional and paid | Client |
| 3 | Instagram, Pinterest | Visual discovery; linked from schema `sameAs` | Client |
| 4 | Etsy / makers' directories, Texas maker directories, Angi / Thumbtack (optional) | Extra citations; Angi/Thumbtack are lead marketplaces, so only join if Jeremy wants that kind of lead | Client decides |

Don't use paid bulk citation services until the core listings above are done by hand and consistent.

### 6.4 Reviews — Owner: Client

- Ask every past and future client personally, with the direct GBP review link.
- Reply to every review within 48 hours.
- Never pay for, incentivize, filter or write reviews. This breaks Google's policies and FTC rules on fake reviews.
- Developer: once there are enough real reviews, we can show a few selected testimonials on the site with permission. **We will not add self-serving review/rating schema.** Google ignores it for LocalBusiness on the business's own site, and it can look manipulative.

---

## 7. Content roadmap

Quality over quantity. Each piece should be something Jeremy would be proud to send to a client. Target roughly **1–2 substantial pieces per month** in Phase 3.

### 7.1 Planned content

| Content | Target cluster | Format | Owner |
| --- | --- | --- | --- |
| **Project case studies**, one per finished commission (e.g. "A white oak table for a family in Dripping Springs") | D, E, F | Photos (workshop to finished room), brief, wood, dimensions, client quote (with permission), general location only | Client: photos, notes, permission · Developer: writing and publishing |
| Wood species guide: walnut vs white oak vs cypress (and others Jeremy uses) | E | Long-form guide with real grain photos | Client: expertise interview (30 min) · Developer: draft |
| How to choose a dining table size (seats, clearances, rectangular vs round) | I | Guide with simple diagrams | Developer draft; Client review |
| Caring for a solid-wood table (finish care, heat, water rings, seasonal movement in Texas humidity) | I | Guide; also a PDF to give clients at delivery | Developer draft; Client review |
| What a custom dining table costs and why | G | Expand `/investment` rather than create a duplicate page | Client: honest price ranges · Developer |
| Finishes explained (oil, hardwax oil, conversion varnish, etc., depending on what Jeremy uses) | I, B | Guide | Client expertise · Developer |
| From banker to furniture maker (story) | J, press | Expand `/maker`; pitch version for local press | Client interview · Developer |
| Serving Austin & the Hill Country (**one** well-written service-area page) | A, D | Real delivery and consultation info, map of area, links to case studies in those towns | Developer, only after 2–3 case studies exist |

### 7.2 Warning about location "doorway" pages

**Don't create near-duplicate pages like "Custom Dining Tables Austin", "Custom Dining Tables Kyle" and "Custom Dining Tables Wimberley" with the city name swapped out.** Google treats these as doorway pages, which violates its spam policies. They also cheapen a luxury brand.

What to do instead:

- **Case studies** naturally mention where a piece lives ("a Wimberley ranch house").
- **One** service-area page with real, specific content.
- A separate town page is only OK when there is real local substance behind it: several finished projects there, specific delivery/installation details, local design partners.

---

## 8. Link building and PR

Owner is mostly **Client** (relationships). **Developer** supports with pitch drafts, press pages and tracking.

| Tactic | Details | Owner |
| --- | --- | --- |
| Interior designers and architects | Introduce Jeremy to Austin/Hill Country designers as a trade maker. Ask to be credited/linked in their project pages. Offer a simple trade one-pager | Client; Developer makes one-pager |
| Home builders and remodelers | Custom home builders in Dripping Springs, Driftwood and Wimberley often need built-ins and dining tables for model homes or clients | Client |
| Realtors and home stagers | Tables in staged luxury listings, with credit | Client |
| Local media and design blogs | Pitch the banker-to-maker story and Texas-craft angle to local lifestyle/home publications and community papers (e.g. Hays County and Austin outlets) | Developer drafts pitch; Client does interviews |
| Makers markets and shows | Local makers markets, home shows, art walks. Most event sites list and link to vendors | Client |
| Wood suppliers / sawmills | Texas sawmills or lumber yards Jeremy buys from may feature local makers | Client |
| Community and charity | Donate a small piece (cutting board, bench) to a school or charity auction; these are often listed with a link | Client |
| Chamber membership | Directory link + networking | Client |
| Houzz / Instagram features | Houzz ideabooks and designer tags bring referral traffic | Client |
| Photographers | When a professional photographs a finished room, credit them and ask them to credit/link back | Client |

**Don't:** buy links, join link networks, swap links in bulk, or pay for "guest posts" on unrelated sites.

---

## 9. Measurement setup — Owner: Developer (Client grants access)

| Tool | Purpose | Setup notes |
| --- | --- | --- |
| Google Search Console | Queries, impressions, indexing, sitemaps | Domain property via DNS TXT on the final domain. Jeremy = Owner, Moil = Full user |
| Bing Webmaster Tools | Bing indexing | Import from GSC |
| Analytics: **Cloudflare Web Analytics** (privacy-friendly, no cookie banner in most cases) **or GA4** | Traffic and conversions | Recommendation: start with Cloudflare Web Analytics, since the site is already on Cloudflare. Add GA4 only if we need detailed event funnels or ads later, and review consent requirements if we do |
| Conversion events | Inquiries | Track: contact form "prepare email" / "copy draft", `mailto:` clicks, `tel:` clicks (once a phone exists), "Start a conversation" CTA clicks. The form doesn't submit to a server, so these are **intent** signals, not confirmed leads. Think about adding a real form endpoint later (e.g. a Cloudflare Worker sending email) so inquiries can actually be counted |
| GBP Performance | Calls, website clicks, direction requests, messages, search terms | Monthly export by Client or Developer (Manager access) |
| UTM-tagged links | Tell GBP, Houzz and Instagram traffic apart | Developer provides a link sheet |
| Lead-source question | Ground truth | Jeremy asks every inquiry "How did you find us?" and logs it in a simple sheet. For low-volume, high-value leads this is often the most reliable data |
| Rank tracking (optional) | Local pack position by area | Manual incognito checks monthly, or a low-cost local grid tool |

---

## 10. Phased timeline

### Phase 1 — Foundations (weeks 1–2)

| Task | Owner |
| --- | --- |
| Decide on and buy the custom domain; give DNS access | Client |
| Configure domain on Cloudflare, 301 from temporary host, set `NEXT_PUBLIC_SITE_URL`, rebuild, re-verify | Developer |
| Ship in-progress schema (WebSite, LocalBusiness, BreadcrumbList, FAQPage, Person), new OG image, manifest, image sitemap | Developer |
| Get a business phone number (e.g. Google Voice or a second line) and decide on public service area | Client |
| Set up professional email on the domain (optional but recommended) | Client decides; Developer helps with DNS |
| Verify Search Console + Bing Webmaster Tools; submit sitemap | Developer |
| Install analytics and conversion events | Developer |
| Create/claim Google Business Profile and start verification | Client |
| Send photos, piece details (species, dimensions, finish), social links, past-client list | Client |
| Add NAP to site footer/contact and schema | Developer |

### Phase 2 — Local authority (weeks 3–8)

| Task | Owner |
| --- | --- |
| Finish GBP: categories, services, products, description, 10+ real photos | Client (Developer can draft copy) |
| Review drive: personally ask all past clients | Client |
| Core citations: Apple Business Connect, Bing Places, Houzz, Yelp, Facebook, Nextdoor | Client |
| Chamber of commerce membership (Buda) | Client |
| Start weekly GBP rhythm: 1 post + photos, reply to reviews and messages | Client |
| Enrich `/work/[slug]` pages with real details and extra photos | Developer (with Client data) |
| Optimize images and confirm Core Web Vitals on live domain | Developer |
| Add `sameAs` profile links to schema once profiles exist | Developer |
| Record 60-day baseline (GSC, GBP, analytics) | Developer |

### Phase 3 — Content and links (months 2–6)

| Task | Owner |
| --- | --- |
| Publish 1–2 pieces per month from the content roadmap, starting with case studies and the species guide | Developer writes; Client supplies photos/expertise and approves |
| Designer / builder / realtor outreach (aim for a few real conversations a month) | Client |
| Local press pitch: banker-to-maker story | Developer drafts; Client interviews |
| Makers markets / home shows (1 per quarter if it fits) | Client |
| Single service-area page after 2–3 case studies exist | Developer |
| Consider a real form endpoint for measurable inquiries | Developer (with Client approval) |
| Set numeric KPI targets from baseline | Developer + Client |

### Ongoing — Monthly reporting (from month 2)

A short monthly report from **Developer** to **Client** (one page or a short email) covering:

1. Search Console: clicks, impressions, top queries, new pages indexed, any errors
2. GBP: views/interactions, calls, website clicks, direction requests, new reviews
3. Analytics: visits, top pages, inquiry intent events, traffic by source
4. Leads: inquiries logged by Jeremy and where they came from
5. What we shipped this month, and next month's 3 priorities
6. Anything needed from Jeremy (photos, approvals, info)

**Client monthly routine** (about 30 minutes) is in [client-seo-requirements.md](client-seo-requirements.md).

---

## 11. Guardrails (what we won't do)

- No keyword-stuffed copy, hidden text or city-name lists in the footer.
- No doorway/location pages that only swap city names.
- No fake, bought or incentivized reviews, and no self-serving review schema.
- No keywords added to the GBP business name.
- No schema claiming data that isn't real (hours, address, prices, ratings).
- No bought links or link schemes.
- No promises of specific rankings or timeframes. Search results depend on Google and on competitors.
