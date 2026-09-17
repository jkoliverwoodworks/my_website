import { Footer, Header } from "@/components/site-chrome";
import { InquiryForm } from "@/components/inquiry-form";
import { pieces } from "@/lib/pieces";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/contact", "Start Your Custom Furniture Project | J. K. Oliver Woodworks", "Talk directly with Jeremy Oliver about custom dining tables and furniture for your home in Buda, Austin or the Texas Hill Country.");

const pieceNames: string[] = pieces.map(piece => piece.name);

export default async function Contact({ searchParams }: { searchParams: Promise<{ piece?: string }> }) {
  const params = await searchParams;
  const piece = typeof params.piece === "string" && pieceNames.includes(params.piece) ? params.piece : "";
  return <><Header /><main id="main-content"><section className="contact-top section-pad"><p className="eyebrow">Start your project</p><h1>Let’s make room<br />for your <em>story.</em></h1><p>A finished idea or a first thought. Wherever you are, a conversation with Jeremy is the next step.</p></section><section className="contact-layout section-pad"><div><p className="eyebrow">From your idea to our workshop</p><h2>Tell us a little.<br />We’ll take it <em>from there.</em></h2><p>No need to know your wood species or exact dimensions yet. We’ll talk about your home, how you gather, and what you’d love to create.</p><p>Based in Buda, serving Austin and the Texas Hill Country.</p><p><a className="text-link" href="mailto:jeremyoliver@att.net">jeremyoliver@att.net <span aria-hidden="true">↗</span></a></p></div><InquiryForm piece={piece} /></section></main><Footer /></>;
}
