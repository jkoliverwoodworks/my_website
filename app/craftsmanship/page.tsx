import Link from "next/link";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { Footer, Header, PageHero } from "@/components/site-chrome";
import { ChapterLabel, StoryIndex, StoryNext } from "@/components/story-sections";

export const metadata = pageMetadata("/craftsmanship", "Solid-Wood Furniture Craftsmanship | J. K. Oliver Woodworks", "Discover the hardwoods, considered details and personal guidance behind custom furniture made by Jeremy Oliver in Buda, Texas.");

export default function Craftsmanship() {
  return <><Header /><main id="main-content" className="story-page craftsmanship-page">
    <PageHero eyebrow="Materials & craftsmanship" title={<>Built with purpose.<br /><em>Made to last.</em></>} intro="The materials, proven methods, and careful decisions behind furniture made for everyday life." image="/heritage-detail.jpg" />
    <StoryIndex label="An appreciation of craft" items={[{ href: "#materials", label: "The materials" }, { href: "#details", label: "The details" }, { href: "#living-with-wood", label: "Life with wood" }]} />
    <section id="materials" className="material-story section-pad">
      <ChapterLabel number="01">It begins with the wood</ChapterLabel>
      <div className="story-intro-grid"><h2>Nature gives it character.<br /><em>We give it a place.</em></h2><div><p>The grain, color, and natural variation of real hardwood are part of the design. Each board brings something individual to the finished piece.</p><p>Choosing a wood is about more than a color. It is about the atmosphere you want to create, and the materials you want to live with.</p></div></div>
      <div className="material-gallery">
        <figure><img src="/elm-table.jpg" alt="The Elm dining table in white oak" width="1400" height="1200" loading="lazy" /><figcaption><div><span className="eyebrow">Light & quietly expressive</span><h3>White oak</h3></div><Link href="/work/elm" aria-label="Explore The Elm in white oak">↗</Link><p>Warmth, visible grain, and an easy presence.<br />Shown in The Elm.</p></figcaption></figure>
        <figure><img src="/lineage-table.jpg" alt="The Lineage dining table in walnut" width="1400" height="1200" loading="lazy" /><figcaption><div><span className="eyebrow">Depth & natural warmth</span><h3>Walnut</h3></div><Link href="/work/lineage" aria-label="Explore The Lineage in walnut">↗</Link><p>Rich tones and grain with a distinct character.<br />Shown in The Lineage.</p></figcaption></figure>
      </div>
      <p className="material-footnote">A starting point for the conversation. We’ll explore the wood and finish that suit your piece.</p>
    </section>
    <section id="details" className="craft-detail-story section-pad">
      <ChapterLabel number="02">The details that make the difference</ChapterLabel>
      <div className="craft-detail-grid"><figure><div className="craft-closeup"><img src="/heritage-detail.jpg" alt="The grain, substantial wood edge, and steel base of a dining table" width="1402" height="1122" loading="lazy" /></div><figcaption>Honest materials. Considered from every angle.</figcaption></figure><div className="craft-detail-copy"><h2>Beauty you notice.<br /><em>Care you can feel.</em></h2><p>A piece should be as satisfying to live with as it is to look at. That means thinking beyond the first impression.</p><ol className="craft-details"><li><span>01</span><div><h3>Proportion with purpose.</h3><p>The relationship between top, base, and room. Dimensions shaped around the space and the people using it.</p></div></li><li><span>02</span><div><h3>Strength in the making.</h3><p>Solid hardwood and thoughtful construction give the piece a foundation for everyday life.</p></div></li><li><span>03</span><div><h3>A considered finish.</h3><p>A finish chosen with beauty and daily use in mind, allowing the character of the wood to remain part of the story.</p></div></li></ol></div></div>
    </section>
    <section id="living-with-wood" className="wood-life section-pad">
      <ChapterLabel number="03">For the years ahead</ChapterLabel>
      <div className="story-intro-grid"><h2>Made to be lived with.<br /><em>And looked after.</em></h2><div><p>Real wood becomes part of a home. Its natural variation is something to enjoy, and a little attention helps preserve what drew you to it.</p><p>Care depends on the wood and finish of your piece. Jeremy can walk you through the right approach, from everyday cleaning to protecting the surface.</p><Link className="story-link" href="/contact"><span>Talk through materials & care</span><span aria-hidden="true">↗</span></Link></div></div>
      <div className="wood-life-note"><span>Our approach</span><p>Good furniture earns its place.<br /><em>Then keeps it.</em></p></div>
    </section>
    <StoryNext eyebrow="The person behind the piece" title={<>A human touch.<br /><em>In every detail.</em></>} description="Meet Jeremy Oliver, and discover the family story at the heart of the work." href="/maker" link="Meet the maker" image="/foundry-table.jpg" alt="A solid wood dining table at the heart of a home" />
  <JsonLd data={breadcrumbSchema([{ name: "Craftsmanship", path: "/craftsmanship" }])} /></main><Footer /></>;
}
