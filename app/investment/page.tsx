import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Footer, Header, PageHero } from "@/components/site-chrome";
import { formatPrice, pieces, standardPricing } from "@/lib/pieces";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/investment", "Dining Table Pricing & FAQs | J. K. Oliver Woodworks", "Hill Country Collection pricing, standard sizes, hardwood choices, warranty, delivery, and planning answers from J. K. Oliver Woodworks.");

const lowestPrice = Math.min(...pieces.map((piece) => piece.price));
const highestPrice = Math.max(...pieces.map((piece) => piece.price));
const faqs = [
  ["What does a Hill Country Collection table cost?", `Standard designs currently range from ${formatPrice(lowestPrice)} to ${formatPrice(highestPrice)}. Each design page lists its starting price. Larger sizes, premium hardwood species, and other customizations are priced separately.`],
  ["What is included in standard pricing?", `Standard pricing includes solid-hardwood construction in red oak or pecan. Rectangular tables are ${standardPricing.rectangular}; round tables are ${standardPricing.round}. Wood bases are painted as standard.`],
  ["Can I choose a natural-wood base?", "Yes. A matching natural-wood base is available as an upgrade on applicable designs. Jeremy will confirm the wood, finish, and final price with you."],
  ["Can Jeremy build something outside the collection?", "Yes. The Hill Country Collection offers semi-custom starting points, while a completely custom commission can begin with a room, a sketch, a saved photograph, or an original idea."],
  ["How long does a custom piece take?", "Every piece is made to order. Lead times vary with the design and Jeremy’s current workshop schedule; you will receive a current estimate during your consultation."],
  ["Is my piece covered by a warranty?", "Yes. J. K. Oliver Woodworks stands behind its craftsmanship with a one-year warranty. Full coverage, care requirements, and claim details are provided in the written warranty and Terms and Conditions before your project begins."],
  ["Do you deliver?", "Delivery details are coordinated as part of your project. J. K. Oliver Woodworks is based in Buda and serves Central Texas."],
] as const;

export default function Investment() {
  return <><Header /><main id="main-content">
    <PageHero eyebrow="Investment & planning" title={<>A clear starting point.<br /><em>A table made for you.</em></>} intro="Standard prices make it easier to begin. Jeremy confirms every customization, timeline, and delivery detail before the work starts." image="/client-assets/hill-country-collection/hero/pedernales-hero.png" />
    <section className="pricing-overview section-pad"><div><p className="eyebrow">The Hill Country Collection</p><h2>Eight designs.<br /><em>One clear foundation.</em></h2><p>Standard configurations range from {formatPrice(lowestPrice)} to {formatPrice(highestPrice)}.</p><Link className="text-link" href="/work#collection">Compare the designs <span aria-hidden="true">↗</span></Link></div><div className="pricing-assumptions"><h3>Standard pricing includes</h3><ul><li>Rectangular tables: {standardPricing.rectangular}</li><li>Round tables: {standardPricing.round}</li><li>{standardPricing.woods}</li><li>{standardPricing.construction} construction</li><li>{standardPricing.base}</li><li>{standardPricing.upgrade}</li></ul><p>{standardPricing.custom}</p></div></section>
    <section className="faq section-pad"><p className="eyebrow">Frequently asked questions</p><h2>Good questions deserve straight answers.</h2>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</section>
    <JsonLd data={[breadcrumbSchema([{ name: "Investment & FAQs", path: "/investment" }]), faqSchema(faqs)]} />
  </main><Footer /></>;
}
