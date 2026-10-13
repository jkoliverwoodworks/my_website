import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Footer, Header, PageHero } from "@/components/site-chrome";
import { StoryNext } from "@/components/story-sections";
import { breadcrumbSchema, makerSchema, pageMetadata } from "@/lib/site";
import { getSiteContent } from "@/lib/cms-content";

export const metadata = pageMetadata("/maker", "Meet Jeremy Oliver, Furniture Maker | J. K. Oliver Woodworks", "Meet Jeremy Oliver, the craftsman behind J. K. Oliver Woodworks. Personal guidance and custom solid-wood furniture made in Buda, Texas.");

export default async function Maker() {
  const content = await getSiteContent();
  return <><Header /><main id="main-content" className="story-page maker-page">
    <PageHero eyebrow="Meet the maker" title={<>Family is the<br /><em>reason why.</em></>} intro={content.makerIntroduction} image={content.makerImage} />
    <section id="jeremys-story" className="maker-biography maker-biography-compact section-pad">
      <p className="eyebrow">Jeremy Oliver · Owner & craftsman</p>
      <div className="maker-biography-grid">
        <div className="maker-biography-portrait">
          <h2>A different path.<br /><em>The same pair of hands.</em></h2>
          <figure className="family-portrait">
            <img src={content.makerImage} alt="Jeremy Oliver with his family" />
            <figcaption><span>Jeremy Oliver & family</span><span>The reason why.</span></figcaption>
          </figure>
        </div>
        <article className="maker-biography-copy"><p className="maker-location">Buda, Texas<br /><span>Made one piece at a time.</span></p>{content.makerBiography.map((paragraph, index) => <p key={index} className={index === 0 ? "story-dropcap" : undefined}>{paragraph}</p>)}<div className="maker-biography-signoff"><span className="signature">Jeremy Oliver</span><span>Owner & craftsman</span></div><Link className="story-link" href="/contact"><span>Start a conversation with Jeremy</span><span aria-hidden="true">↗</span></Link></article>
      </div>
    </section>
    <StoryNext eyebrow="Your story comes next" title={<>From a first idea.<br /><em>To a place to gather.</em></>} description="Begin with a Hill Country Collection design or bring Jeremy an idea for something completely custom." href="/contact" link="Tell Jeremy about your project" image="/client-assets/hill-country-collection/frio.png" alt="The Frio dining table ready for a family gathering" />
    <JsonLd data={[breadcrumbSchema([{ name: "The maker", path: "/maker" }]), { ...makerSchema, image: content.makerImage }]} />
  </main><Footer /></>;
}
