import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Footer, Header, PageHero } from "@/components/site-chrome";
import { getSiteContent } from "@/lib/cms-content";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/site";

export async function generateMetadata() {
  const { pricing } = await getSiteContent();
  return pageMetadata("/investment", "Dining Table Investment & FAQs | J. K. Oliver Woodworks", `${pricing.range} ${pricing.qualification}`);
}

export default async function Investment() {
  const content = await getSiteContent();
  const standardPricing = content.pricing;
  const faqs: [string, string][] = [
    ["What does a handcrafted dining table cost?", `${standardPricing.range} ${standardPricing.qualification} ${standardPricing.custom}`],
    ...content.faqs.map(({ question, answer }) => [question, answer] as [string, string]),
  ];
  return <><Header /><main id="main-content" className="investment-page">
    <PageHero eyebrow="Investment & planning" title={<>An investment in<br /><em>lasting craftsmanship.</em></>} intro={content.pages.investment.introduction} image={content.pages.investment.image} />
    <section className="pricing-overview section-pad"><div><p className="eyebrow">Made to order. Made for you.</p><h2>A place to gather.<br /><em>For generations.</em></h2><p className="investment-range">{standardPricing.range}</p><p>{standardPricing.qualification}</p><p>{standardPricing.madeToOrder}</p><Link className="text-link" href="/work#collection">Find your table design <span aria-hidden="true">↗</span></Link></div><div className="pricing-assumptions"><h3>A starting point for your design</h3><ul><li>Standard rectangular size: {standardPricing.rectangular}</li><li>Standard round size: {standardPricing.round}</li><li>{standardPricing.woods}</li><li>{standardPricing.construction} construction</li><li>{standardPricing.base}</li><li>{standardPricing.upgrade}</li></ul><p>{standardPricing.custom}</p><Link className="text-link" href="/contact">Discuss your table <span aria-hidden="true">↗</span></Link></div></section>
    <section className="faq section-pad"><p className="eyebrow">Frequently asked questions</p><h2>Good questions deserve straight answers.</h2>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</section>
    <JsonLd data={[breadcrumbSchema([{ name: "Investment & FAQs", path: "/investment" }]), faqSchema(faqs)]} />
  </main><Footer /></>;
}
