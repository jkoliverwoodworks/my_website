import Link from "next/link";
import { Footer, Header } from "@/components/site-chrome";
import { InquiryForm } from "@/components/inquiry-form";
import { getDesigns, getSiteContent } from "@/lib/cms-content";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";

export const metadata = pageMetadata("/contact", "Start a Custom Furniture Commission | J. K. Oliver Woodworks", "Talk directly with Jeremy Oliver about a completely custom dining table or furniture commission for your Central Texas home.");


export default async function Contact({ searchParams }: { searchParams: Promise<{ piece?: string }> }) {
  const [pieces, content] = await Promise.all([getDesigns(), getSiteContent()]);
  const pieceNames = pieces.map(piece => piece.name);
  const params = await searchParams;
  const piece = typeof params.piece === "string" && pieceNames.includes(params.piece) ? params.piece : "";
  return <><Header /><main id="main-content"><section className="contact-top section-pad"><p className="eyebrow">A completely custom commission</p><h1>Let’s make room<br />for your <em>story.</em></h1><p>{content.pages.contact.introduction}</p></section><section className="contact-layout section-pad"><div><p className="eyebrow">From your idea to Jeremy’s workshop</p><h2>Tell Jeremy a little.<br />He’ll take it <em>from there.</em></h2><p>{content.pages.contact.inquiryGuidance}</p><p>If one of the collection designs caught your eye, its page has a form already prepared for that table.</p><p><Link className="text-link" href="/work">Explore the collection <span aria-hidden="true">↗</span></Link></p><p>Based in Buda, serving Central Texas.</p><p><a className="text-link" href="mailto:jeremyoliver@att.net">jeremyoliver@att.net <span aria-hidden="true">↗</span></a></p></div><InquiryForm piece={piece} /></section><JsonLd data={breadcrumbSchema([{ name: "Custom commission", path: "/contact" }])} /></main><Footer /></>;
}
