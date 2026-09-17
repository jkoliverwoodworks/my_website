import { pageMetadata } from "@/lib/site";
import { pieces } from "@/lib/pieces";
import { Footer, Header } from "@/components/site-chrome";
import { CinematicHero } from "@/components/cinematic-hero";

export const metadata = pageMetadata("/work", "Custom Furniture Portfolio | J. K. Oliver Woodworks", "Explore solid-wood dining tables and custom furniture from J. K. Oliver Woodworks in Buda, serving Austin and the Texas Hill Country.");

export default function Work() {
  return <><Header overlay /><main id="main-content"><CinematicHero collection />
    <section id="collection" className="collection-intro section-pad"><p className="eyebrow">01 / Selected pieces</p><h2>A study in wood.<br /><em>A reflection of you.</em></h2><p>Explore the shapes, materials, and details that speak to you. Each piece is a starting point for something distinctly your own.</p></section>
    <section className="portfolio section-pad" aria-label="Furniture collection">{pieces.map((piece, index) => <article key={piece.slug}><a href={`/work/${piece.slug}`}><div className="portfolio-image"><img loading="lazy" width="1400" height="1200" src={piece.image} alt={`${piece.name}, a ${piece.material.toLowerCase()} dining table`} /><span className="round-arrow" aria-hidden="true">↗</span></div><div className="portfolio-caption"><div><h2>{piece.name}</h2><p>{piece.material} / {piece.character}</p></div><span className="piece-number">0{index + 1}</span></div><span className="text-link">Explore the piece <span aria-hidden="true">↗</span></span></a></article>)}</section>
    <section className="center-cta section-pad"><p className="eyebrow">A commission of your own</p><h2>Something only<br /><em>you could imagine.</em></h2><a className="button button-dark" href="/contact">Begin a conversation <span>↗</span></a></section>
  </main><Footer /></>;
}
