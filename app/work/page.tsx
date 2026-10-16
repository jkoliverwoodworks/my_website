import Link from "next/link";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { getDesigns, getSiteContent } from "@/lib/cms-content";
import { Footer, Header } from "@/components/site-chrome";
import { ChapterLabel, StoryIndex, StoryNext } from "@/components/story-sections";

export const metadata = pageMetadata("/work", "Custom Table Designs | J. K. Oliver Woodworks", "Explore named solid-wood table designs from J. K. Oliver Woodworks in Buda, serving homes across Central Texas.");

export default async function Work() {
  const [pieces, content] = await Promise.all([getDesigns(), getSiteContent()]);
  const { collectionIntroduction, pricing: standardPricing } = content;
  return <><Header /><main id="main-content">
    <div className="story-page work-page">
      <StoryIndex label="Explore" items={[{ href: "#collection", label: "The designs" }, { href: "#standard-pricing", label: "Make it yours" }, { href: "#commission", label: "Fully custom" }]} />
      <section id="collection" className="collection-opening section-pad">
        <ChapterLabel number="01">Semi-custom dining tables</ChapterLabel>
        <div className="story-intro-grid"><h1>The Hill Country<br /><em>Collection.</em></h1><div><p>{collectionIntroduction}</p><p>{content.collectionGuidance}</p><p className="collection-facts"><span>{pieces.length} designs</span><span>Made in Buda</span><span>Built one at a time</span></p></div></div>
        <aside className="collection-investment" aria-labelledby="collection-investment-title"><h2 id="collection-investment-title">An investment in<br /><em>lasting craftsmanship.</em></h2><div><p>{standardPricing.range} {standardPricing.qualification}</p><Link className="text-link" href="/investment">Explore pricing & planning <span aria-hidden="true">↗</span></Link></div></aside>
      </section>
      <section className="collection-list section-pad" aria-label="The Hill Country Collection">{pieces.map((piece, index) => {
        return <article key={piece.slug} className="collection-piece"><Link href={`/work/${piece.slug}`}>
          <div className="collection-piece-image"><img loading={index < 2 ? "eager" : "lazy"} width="640" height="586" src={piece.image} alt={piece.imageAlt} /><span className="collection-piece-arrow" aria-hidden="true">↗</span></div>
          <div className="collection-piece-copy">
            <p className="eyebrow">{piece.shape} · Made to order</p>
            <h3>{piece.name}</h3>
            <p className="collection-piece-description">{piece.description}</p>
            <p className="collection-piece-fact">Standard size: {piece.standardSize}</p>
            <span className="collection-piece-link">Explore the piece <span aria-hidden="true">↗</span></span>
          </div>
        </Link></article>;
      })}</section>
      <section id="standard-pricing" className="collection-standards section-pad">
        <ChapterLabel number="02">Make it yours</ChapterLabel>
        <div className="story-intro-grid"><h2>A considered design.<br /><em>Room to make it yours.</em></h2><p>Every collection design is a starting point. Choose the dimensions, wood, and details that suit your home; Jeremy confirms your personalized quote before the work begins.</p></div>
        <div className="story-principles"><article><span>Standard dimensions</span><h3>Built for gathering.</h3><p>Rectangular tables are {standardPricing.rectangular}. Round tables are {standardPricing.round}.</p></article><article><span>Standard materials</span><h3>Solid hardwood.</h3><p>{standardPricing.woods}, with painted wood bases as standard. Matching natural-wood bases are available as an upgrade.</p></article><article><span>Made semi-custom</span><h3>Tailored to your home.</h3><p>{standardPricing.custom}</p></article></div>
        <Link className="story-link" href="/investment"><span>Explore your investment & common questions</span><span aria-hidden="true">↗</span></Link>
      </section>
      <StoryNext id="commission" eyebrow="Beyond the collection" title={<>A completely custom<br /><em>commission.</em></>} description="Have something different in mind? Bring Jeremy a room, a sketch, a saved photograph, or the beginning of an idea." href="/contact" link="Discuss your idea" image="/heritage-detail.jpg" alt="The grain and solid-wood edge of a handmade dining table" />
    </div>
  <JsonLd data={breadcrumbSchema([{ name: "Our work", path: "/work" }])} /></main><Footer /></>;
}
