import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/inquiry-form";
import { JsonLd } from "@/components/json-ld";
import { Footer, Header } from "@/components/site-chrome";
import { getDesigns, getSiteContent } from "@/lib/cms-content";
import { breadcrumbSchema, pageMetadata, productSchema } from "@/lib/site";

export const dynamicParams = false;
export async function generateStaticParams() {
  return (await getDesigns()).map(piece => ({ slug: piece.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pieces = await getDesigns();
  const piece = pieces.find((item) => item.slug === slug);
  if (!piece) return {};
  return pageMetadata(
    `/work/${slug}`,
    piece.seoTitle || `${piece.name} | Hill Country Collection | J. K. Oliver Woodworks`,
    piece.seoDescription || `${piece.name}, a solid-hardwood dining table made to order for your home. Explore the design and request a personalized quote from Jeremy Oliver in Buda, Texas.`,
  );
}

export default async function Piece({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [pieces, content] = await Promise.all([getDesigns(), getSiteContent()]);
  const standardPricing = content.pricing;
  const index = pieces.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const piece = pieces[index];
  const next = pieces[(index + 1) % pieces.length];

  return <><Header /><main id="main-content">
    <section className="product-hero product-hero-inquiry">
      <div className="product-copy">
        <Link href="/work#collection" className="back-link">← The Hill Country Collection</Link>
        <p className="eyebrow">Semi-custom dining table</p>
        <h1>{piece.name.replace("The ", "")}<span>by J. K. Oliver</span></h1>
        <p className="product-made-to-order">Made to order in solid hardwood.</p>
        <p className="product-design-description">{piece.description}</p>
        <figure className="product-overview-image"><img src={piece.heroImage} alt={piece.imageAlt} width={piece.heroWidth} height={piece.heroHeight} fetchPriority="high" /></figure>
        <details className="product-specs"><summary>Standard dimensions & materials <span aria-hidden="true">+</span></summary><dl>
          <div><dt>Standard size</dt><dd>{piece.standardSize}</dd></div>
          <div><dt>Standard wood</dt><dd>{standardPricing.woods}</dd></div>
          <div><dt>Base</dt><dd>{piece.base}</dd></div>
          <div><dt>Made in</dt><dd>Buda, Texas</dd></div>
        </dl></details>
        <p className="product-custom-note">{standardPricing.custom}</p>
        <Link className="text-link" href="/contact">Have a completely custom idea? <span aria-hidden="true">↗</span></Link>
      </div>
      <div id="inquire" className="product-form">
        <p className="eyebrow">Ask Jeremy about this design</p>
        <h2>Tell him a little<br />about <em>your home.</em></h2>
        <aside className="product-investment" aria-labelledby="product-investment-title"><h3 id="product-investment-title">Made for your home</h3><p>{standardPricing.range} {standardPricing.qualification}</p><p>Tell Jeremy what you have in mind for this design to receive a personalized quote.</p><Link className="text-link" href="/investment">View pricing details <span aria-hidden="true">↗</span></Link></aside>
        <InquiryForm piece={piece.name} />
      </div>
    </section>

    <section className="product-custom-cta section-pad"><div><p className="eyebrow">Looking for something different?</p><h2>Start a completely custom commission.</h2></div><Link className="button button-light" href="/contact">Share your idea <span aria-hidden="true">↗</span></Link></section>
    {pieces.length > 1 && <Link className="next-piece section-pad" href={`/work/${next.slug}`}><div><p className="eyebrow">Continue the collection</p><h2>{next.name} <span aria-hidden="true">↗</span></h2><p>Made to order · {next.base}</p></div><img src={next.image} alt={next.imageAlt} width="640" height="586" loading="lazy" /></Link>}
    <JsonLd data={[breadcrumbSchema([{ name: "Our work", path: "/work" }, { name: piece.name, path: `/work/${piece.slug}` }]), productSchema(piece)]} />
  </main><Footer /></>;
}
