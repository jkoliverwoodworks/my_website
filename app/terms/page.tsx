import { JsonLd } from "@/components/json-ld";
import { Footer, Header } from "@/components/site-chrome";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
import { termsDocument, termsIntroduction, termsSections } from "@/lib/terms";

export const metadata = pageMetadata("/terms", "Terms & Conditions of Sale | J. K. Oliver Woodworks", "Payment, scheduling, delivery, natural-wood standards, the three-year workmanship warranty and other terms for J. K. Oliver Woodworks custom furniture.");

const sectionId = (index: number) => `term-${index + 1}`;

export default function Terms() {
  return <><Header /><main id="main-content" className="terms-page">
    <section className="terms-intro section-pad">
      <p className="eyebrow">Terms & Conditions of Sale</p>
      <h1>Clear terms.<br /><em>Lasting work.</em></h1>
      {termsIntroduction.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      <a className="text-link" href={termsDocument} download>Download the PDF <span aria-hidden="true">↓</span></a>
    </section>
    <div className="terms-layout section-pad">
      <nav className="terms-contents" aria-label="Terms sections">
        <p className="eyebrow">Contents</p>
        <ol>{termsSections.map((section, index) => <li key={section.title}><a href={`#${sectionId(index)}`}>{section.title}</a></li>)}</ol>
      </nav>
      <div className="terms-body">
        {termsSections.map((section, index) => <section key={section.title} id={sectionId(index)} className="terms-section">
          <h2><span>{String(index + 1).padStart(2, "0")}</span>{section.title}</h2>
          {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
        </section>)}
      </div>
    </div>
    <JsonLd data={[breadcrumbSchema([{ name: "Terms & Conditions", path: "/terms" }])]} />
  </main><Footer /></>;
}
