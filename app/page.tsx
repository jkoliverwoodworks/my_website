import Link from "next/link";
import { MakerNote } from "@/components/maker-note";
import { CinematicHero } from "@/components/cinematic-hero";
import { Footer, Header } from "@/components/site-chrome";

const work = [
  { image: "/elm-table.jpg", name: "The Elm", detail: "White oak · Quiet simplicity" },
  { image: "/lineage-table.jpg", name: "The Lineage", detail: "Walnut · Natural character" },
  { image: "/soho-table.jpg", name: "The Foundry", detail: "Oak & steel · A modern balance" },
];

export default function Home() {
  return <><Header overlay /><main id="main-content">
    <CinematicHero />
    <div className="values-strip section-pad"><span>Solid hardwood</span><span>Made to your dimensions</span><span>Crafted one at a time</span><span>Texas Hill Country roots</span></div>
    <section id="our-approach" className="intro section-pad">
      <p className="eyebrow">The art of living with wood</p>
      <div className="intro-grid"><h2>A place to gather.<br />A story to <em>grow into.</em></h2><div><p>The slow Sunday mornings. The extra chair at Thanksgiving. The conversations that carry on long after dinner.</p><p>We build custom dining tables and furniture in Buda, Texas, for all of it. Real hardwood, considered details, and a design that feels at home with you.</p><a className="text-link" href="/craftsmanship">Discover our approach <span aria-hidden="true">↗</span></a></div></div>
    </section>
    <section className="signature-work section-pad">
      <div className="section-heading"><div><p className="eyebrow">01 / Selected work</p><h2>Singular pieces.<br /><em>Lasting presence.</em></h2></div><Link className="text-link" href="/work">View all work <span aria-hidden="true">↗</span></Link></div>
      <div className="work-grid">{work.map((item, index) => <article className="work-card" key={item.name}><a href={`/work/${item.name.toLowerCase().replace("the ", "")}`} aria-label={`Explore ${item.name}`}><div className="work-image"><img src={item.image} alt={`${item.name} custom dining table`} width="1400" height="1200" loading="lazy" /><span className="round-arrow" aria-hidden="true">↗</span></div><div className="work-caption"><div><h3>{item.name}</h3><p>{item.detail}</p></div><span className="piece-number">0{index + 1}</span></div></a></article>)}</div>
      <p className="collection-note">A starting point for inspiration. Every piece can be made your own.</p>
    </section>
    <section className="craft-section">
      <div className="craft-photo"><img src="/heritage-detail.jpg" alt="The natural grain and solid-wood construction of a dining table" width="1402" height="1122" loading="lazy" /></div>
      <div className="craft-copy"><p className="eyebrow">02 / Materials & craftsmanship</p><h2>Good things<br />take <em>good hands.</em></h2><p>Character you can see. Quality you can feel. From choosing the boards to applying the finish, every decision is made with your home and everyday life in mind.</p><ul><li><span>01</span> Honest, solid hardwood</li><li><span>02</span> Proportions made for your space</li><li><span>03</span> Details worth a closer look</li></ul><a className="text-link" href="/craftsmanship">Look a little closer <span aria-hidden="true">↗</span></a></div>
    </section>
    <MakerNote />
    <section className="process section-pad"><div className="section-heading"><div><p className="eyebrow">04 / The way we work</p><h2>From a thought<br />to <em>your home.</em></h2></div><p>Personal from the first conversation.<br />Considered at every step.</p></div><div className="steps"><article><span>01 — Imagine</span><h3>Tell us your idea.</h3><p>A room, a sketch, a saved photo. Bring whatever you have in mind; we’ll start there.</p></article><article><span>02 — Refine</span><h3>Make it your own.</h3><p>We work through the dimensions, wood, finish, and details together.</p></article><article><span>03 — Create</span><h3>Let the making begin.</h3><p>Your piece takes shape in our Texas workshop, ready for a life in your home.</p></article></div><a className="text-link" href="/process">Explore the process <span aria-hidden="true">↗</span></a></section>
    <section className="inquiry"><div className="inquiry-image"><img src="/lineage-table.jpg" alt="A warm walnut dining table set for gathering" width="1402" height="1122" loading="lazy" /></div><div className="inquiry-copy"><p className="eyebrow light">Something made just for you</p><h2>Your home.<br />Your people.<br /><em>Your piece.</em></h2><p>Let’s make something that belongs in your story.</p><a className="button button-light" href="/contact">Start a conversation <span aria-hidden="true">↗</span></a><small>Buda · Austin · Texas Hill Country</small></div></section>
  </main><Footer /></>;
}
