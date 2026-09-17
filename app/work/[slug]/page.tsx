import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/site-chrome";
import { pieces } from "@/lib/pieces";
import { pageMetadata } from "@/lib/site";

export function generateStaticParams() { return pieces.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const piece = pieces.find(piece => piece.slug === slug);
  if (!piece) return {};
  return pageMetadata(`/work/${slug}`, `${piece.name} | Bespoke Furniture | J. K. Oliver Woodworks`, `${piece.name}: ${piece.material.toLowerCase()} dining furniture with ${piece.character.toLowerCase()}. Explore the piece and discuss a custom commission with Jeremy Oliver in Buda, Texas.`);
}

export default async function Piece({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = pieces.findIndex(piece => piece.slug === slug);
  if (index < 0) notFound();
  const piece = pieces[index];
  const next = pieces[(index + 1) % pieces.length];
  return <><Header /><main id="main-content">
    <section className="product-hero"><div className="product-copy"><Link href="/work#collection" className="back-link">← All pieces</Link><p className="eyebrow">The collection / 0{index + 1}</p><h1>{piece.name.replace("The ", "")}<span>by J. K. Oliver</span></h1><p className="product-character">{piece.character}.</p><p>{piece.description}</p><dl><div><dt>Material</dt><dd>{piece.material}</dd></div><div><dt>Made for</dt><dd>Your home, your dimensions</dd></div><div><dt>Origin</dt><dd>Buda, Texas</dd></div></dl><a className="button button-dark" href={`/contact?piece=${encodeURIComponent(piece.name)}`}>Enquire about this piece <span aria-hidden="true">↗</span></a></div><figure className="product-image"><img src={piece.image} alt={`${piece.name} dining table, showing its ${piece.material.toLowerCase()} construction and proportions`} width="1400" height="1200" fetchPriority="high" /><figcaption>{piece.material} <span>Made one at a time</span></figcaption></figure></section>
    <section className="product-story editorial section-pad"><div><p className="eyebrow">A personal commission</p><h2>The starting point<br />is <em>yours.</em></h2></div><div><p>A beautiful piece begins with the way you live. Together, we’ll consider scale, seating, wood, and finish to find the right expression for your home.</p><p>Every commission is discussed directly with Jeremy. Dimensions, material options, investment, and timing are confirmed as part of that conversation.</p><a className="text-link" href="/process">Discover the process <span aria-hidden="true">↗</span></a></div></section>
    <a className="next-piece section-pad" href={`/work/${next.slug}`}><div><p className="eyebrow">Continue the collection</p><h2>{next.name} <span aria-hidden="true">↗</span></h2><p>{next.material} / {next.character}</p></div><img src={next.image} alt={next.name} width="1400" height="1200" loading="lazy" /></a>
  </main><Footer /></>;
}
