import Link from "next/link";
import { MakerNote } from "@/components/maker-note";
import { HomeCollectionCarousel } from "@/components/home-collection-carousel";
import { Footer, Header } from "@/components/site-chrome";
import { formatPrice } from "@/lib/pieces";
import { getDesigns, getSiteContent } from "@/lib/cms-content";


export default async function Home() {
  const [pieces, content] = await Promise.all([getDesigns(), getSiteContent()]);
  const featuredWork = pieces.filter(piece => piece.featured).slice(0, 3);
  return <><Header overlay /><main id="main-content">
    <HomeCollectionCarousel pieces={pieces} />
    <div className="values-strip section-pad"><span>Solid hardwood</span><span>Made to your dimensions</span><span>One-year warranty</span><span>Made in Buda, Texas</span></div>
    <section id="our-approach" className="intro section-pad">
      <p className="eyebrow">The art of living with wood</p>
      <div className="intro-grid"><h2>A place to gather.<br />A story to <em>grow into.</em></h2><div><p>{content.homeIntroduction}</p><p>{content.homeOffering}</p><Link className="text-link" href="/work">Explore the collection <span aria-hidden="true">↗</span></Link><br /><Link className="text-link" href="/contact">Discuss a custom commission <span aria-hidden="true">↗</span></Link></div></div>
    </section>
    <section className="signature-work section-pad">
      <div className="section-heading"><div><p className="eyebrow">The Hill Country Collection</p><h2>Named for Texas rivers.<br /><em>Made for your home.</em></h2></div><Link className="text-link" href="/work">View all {pieces.length} designs <span aria-hidden="true">↗</span></Link></div>
      <div className="work-grid">{featuredWork.map((item) => <article className="work-card" key={item.name}><Link href={`/work/${item.slug}`} aria-label={`Explore ${item.name}`}><div className="work-image"><img src={item.image} alt={`${item.name} semi-custom dining table`} width="640" height="586" loading="lazy" /><span className="round-arrow" aria-hidden="true">↗</span></div><div className="work-caption"><div><h3>{item.name}</h3><p>From {formatPrice(item.price)} · {item.base}</p></div></div></Link></article>)}</div>
      <p className="collection-note">{content.collectionGuidance}</p>
    </section>
    <section className="craft-section">
      <div className="craft-photo"><img src="/heritage-detail.jpg" alt="The natural grain and solid-wood construction of a dining table" width="1402" height="1122" loading="lazy" /></div>
      <div className="craft-copy"><p className="eyebrow">Materials & craftsmanship</p><h2>Good things<br />take <em>good hands.</em></h2><p>Character you can see. Quality you can feel. From choosing the boards to applying the finish, every decision is made with your home and everyday life in mind.</p><ul><li>Solid hardwood, selected for natural character</li><li>Proportions made for your space</li><li>Details worth a closer look</li></ul><a className="text-link" href="/craftsmanship">Look a little closer <span aria-hidden="true">↗</span></a></div>
    </section>
    <MakerNote />
    <section className="process section-pad"><div className="section-heading"><div><p className="eyebrow">Jeremy’s process</p><h2>From a thought<br />to <em>your home.</em></h2></div><p>Personal from the first conversation.<br />Considered at every step.</p></div><div className="steps"><article><span>Imagine</span><h3>Share your idea.</h3><p>A room, a sketch, a saved photo. Bring whatever you have in mind; the conversation starts there.</p></article><article><span>Refine</span><h3>Make it your own.</h3><p>Together, you and Jeremy work through the dimensions, wood, finish, and details.</p></article><article><span>Create</span><h3>Let the making begin.</h3><p>Jeremy builds your piece in his Buda workshop, ready for a life in your home.</p></article></div><a className="text-link" href="/process">Explore the process <span aria-hidden="true">↗</span></a></section>
    <section className="inquiry"><div className="inquiry-image"><img src="/client-assets/hill-country-collection/brazos.jpeg" alt="The Brazos dining table in a warm Central Texas interior" width="640" height="534" loading="lazy" /></div><div className="inquiry-copy"><p className="eyebrow light">A completely custom commission</p><h2>Your home.<br />Your people.<br /><em>Your piece.</em></h2><p>Have an idea beyond the collection? Start a direct conversation with Jeremy.</p><a className="button button-light" href="/contact">Discuss your idea <span aria-hidden="true">↗</span></a><small>Made in Buda · Serving Central Texas</small></div></section>
  </main><Footer /></>;
}
