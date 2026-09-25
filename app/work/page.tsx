import Link from "next/link";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { pieces } from "@/lib/pieces";
import { Footer, Header } from "@/components/site-chrome";
import { HomeCollectionCarousel } from "@/components/home-collection-carousel";
import { ChapterLabel, StoryIndex, StoryNext } from "@/components/story-sections";

export const metadata = pageMetadata("/work", "Custom Table Designs | J. K. Oliver Woodworks", "Explore named solid-wood table designs from J. K. Oliver Woodworks in Buda, serving homes across Central Texas.");

export default function Work() {
  return <><Header overlay /><main id="main-content"><HomeCollectionCarousel />
    <div className="story-page work-page">
      <StoryIndex label="The collection" items={[{ href: "#collection", label: "Selected pieces" }, { href: "#every-piece", label: "What they share" }, { href: "#commission", label: "Your commission" }]} />
      <section id="collection" className="collection-opening section-pad">
        <ChapterLabel number="01">Selected pieces</ChapterLabel>
        <div className="story-intro-grid"><h2>A study in wood.<br /><em>A reflection of you.</em></h2><div><p>Explore the shapes, materials, and details that speak to you. Each piece is a starting point for something distinctly your own.</p><p className="collection-facts"><span>{String(pieces.length).padStart(2, "0")} pieces</span><span>Made to your dimensions</span><span>Buda, Texas</span></p></div></div>
      </section>
      <section className="collection-list section-pad" aria-label="Furniture collection">{pieces.map((piece, index) => {
        return <article key={piece.slug} className="collection-piece"><Link href={`/work/${piece.slug}`}>
          <div className="collection-piece-image"><img loading={index < 2 ? "eager" : "lazy"} width="1400" height="1200" src={piece.image} alt={`${piece.name}, a ${piece.material.toLowerCase()} dining table`} /><span className="collection-piece-arrow" aria-hidden="true">↗</span></div>
          <div className="collection-piece-copy">
            <span className="collection-piece-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <p className="eyebrow">{piece.material}</p>
            <h3>{piece.name}</h3>
            <p className="collection-piece-character">{piece.character}.</p>
            <p className="collection-piece-description">{piece.description}</p>
            <span className="collection-piece-link">Explore the piece <span aria-hidden="true">↗</span></span>
          </div>
        </Link></article>;
      })}</section>
      <section id="every-piece" className="collection-standards section-pad">
        <ChapterLabel number="02">What every piece shares</ChapterLabel>
        <div className="story-intro-grid"><h2>Different in character.<br /><em>Equal in care.</em></h2><p>Whichever piece draws you in, the foundations stay the same: honest material, proportions made for your room, and one maker from start to finish.</p></div>
        <div className="story-principles"><article><span>01 / Material</span><h3>Hardwood, chosen by eye.</h3><p>Boards are selected for grain and color, so the natural character of the wood becomes part of the design.</p></article><article><span>02 / Scale</span><h3>Sized to your room.</h3><p>Length, width, and seating are shaped around your space and the way your household gathers.</p></article><article><span>03 / Maker</span><h3>Built one at a time.</h3><p>Every piece is made by Jeremy Oliver in Buda, Texas, with you connected to the work throughout.</p></article></div>
        <Link className="story-link" href="/craftsmanship"><span>Explore the craftsmanship</span><span aria-hidden="true">↗</span></Link>
      </section>
      <StoryNext id="commission" eyebrow="A commission of your own" title={<>Something only<br /><em>you could imagine.</em></>} description="Begin with a piece from the collection, or with nothing more than an idea. Here is how a commission comes together." href="/process" link="Discover the process" image="/heritage-detail.jpg" alt="The grain and solid-wood edge of a handmade dining table" />
    </div>
  <JsonLd data={breadcrumbSchema([{ name: "Our work", path: "/work" }])} /></main><Footer /></>;
}
