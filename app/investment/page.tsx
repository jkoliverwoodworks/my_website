import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Footer, Header, PageHero } from "@/components/site-chrome";
import { formatPrice } from "@/lib/pieces";
import { promotionalPrice, promotionIsActive } from "@/lib/cms-model";
import { getDesigns, getSiteContent } from "@/lib/cms-content";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/investment", "Dining Table Pricing & FAQs | J. K. Oliver Woodworks", "Hill Country Collection pricing, standard sizes, hardwood choices, warranty, delivery, and planning answers from J. K. Oliver Woodworks.");

export default async function Investment() {
  const [pieces, content] = await Promise.all([getDesigns(), getSiteContent()]);
  const standardPricing = content.pricing;
  const displayPrices = pieces.map(piece => promotionalPrice(piece.price, content.promotion));
  const range = pieces.length ? `${formatPrice(Math.min(...displayPrices))} to ${formatPrice(Math.max(...displayPrices))}` : "a price confirmed directly with Jeremy";
  const faqs: [string, string][] = [
    ["What does a Hill Country Collection table cost?", pieces.length ? `${promotionIsActive(content.promotion) ? `${content.promotion.name} pricing` : "Standard designs"} currently ranges from ${range}. Each design page lists its starting price. ${standardPricing.custom}` : "Ask Jeremy about current designs and pricing."],
    ...content.faqs.map(({ question, answer }) => [question, answer] as [string, string]),
  ];
  return <><Header /><main id="main-content">
    <PageHero eyebrow="Investment & planning" title={<>A clear starting point.<br /><em>A table made for you.</em></>} intro={content.pages.investment.introduction} image={content.pages.investment.image} />
    <section className="pricing-overview section-pad"><div><p className="eyebrow">The Hill Country Collection</p><h2>{pieces.length} designs.<br /><em>One clear foundation.</em></h2><p>{pieces.length ? `Standard configurations range from ${range}.` : "Ask Jeremy about current designs and pricing."}</p><Link className="text-link" href="/work#collection">Compare the designs <span aria-hidden="true">↗</span></Link></div><div className="pricing-assumptions"><h3>Standard pricing includes</h3><ul><li>Rectangular tables: {standardPricing.rectangular}</li><li>Round tables: {standardPricing.round}</li><li>{standardPricing.woods}</li><li>{standardPricing.construction} construction</li><li>{standardPricing.base}</li><li>{standardPricing.upgrade}</li></ul><p>{standardPricing.custom}</p></div></section>
    <section className="faq section-pad"><p className="eyebrow">Frequently asked questions</p><h2>Good questions deserve straight answers.</h2>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</section>
    <JsonLd data={[breadcrumbSchema([{ name: "Investment & FAQs", path: "/investment" }]), faqSchema(faqs)]} />
  </main><Footer /></>;
}
