import Link from "next/link";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { Footer, Header, PageHero } from "@/components/site-chrome";
import { ChapterLabel, StoryIndex, StoryNext } from "@/components/story-sections";

export const metadata = pageMetadata("/process", "The Custom Furniture Process | J. K. Oliver Woodworks", "From your first idea to a finished piece: learn how to commission custom furniture with Jeremy Oliver in Buda and Austin, Texas.");

const stages = [
  { number: "01", label: "The conversation", title: "Start with the way", emphasis: "you live.", text: "The room, the people, the everyday rituals. Before we talk about wood or dimensions, we talk about what this piece will mean in your home.", detail: "Bring a saved image, a rough sketch, or simply an idea. You don’t need to have the answers before we begin.", note: "A place to begin", image: "/hearth-table.jpg", alt: "A dining table set in a welcoming room" },
  { number: "02", label: "The design", title: "Make every detail", emphasis: "feel like yours.", text: "Together, we work through scale, wood, base style, and finish. The aim is a piece that belongs in your space and feels natural to use.", detail: "We talk through dimensions, seating, budget, and timing as part of shaping the direction of your commission.", note: "Proportion · Material · Finish", image: "/elm-table.jpg", alt: "The Elm table showing its wood grain and proportions" },
  { number: "03", label: "The making", title: "From an idea", emphasis: "to something real.", text: "Jeremy builds your furniture in Buda, Texas. The character of the wood and the details of your design come together, one considered decision at a time.", detail: "You stay connected to the person making your piece, with updates as the work takes shape.", note: "Made in Buda, Texas", image: "/heritage-detail.jpg", alt: "Solid wood tabletop and base details" },
  { number: "04", label: "The homecoming", title: "Made by hand.", emphasis: "Made part of home.", text: "Once your piece is finished, we work through the details of bringing it home. Then it is yours to gather around, live with, and make memories beside.", detail: "Delivery arrangements and care are part of the conversation, so you know what to expect as your piece settles in.", note: "The beginning of its story", image: "/cypress-table.jpg", alt: "The Cypress dining table in a light-filled home" },
];

export default function Process() {
  return <><Header /><main id="main-content" className="story-page process-page">
    <PageHero eyebrow="The process" title={<>A piece with your<br /><em>life in mind.</em></>} intro="Custom should feel personal and clear. Here is how we move from a first idea to a finished piece in your home." image="/cypress-table.jpg" />
    <StoryIndex label="The commissioning journey" items={[{ href: "#approach", label: "The approach" }, { href: "#journey", label: "Four steps" }, { href: "#before-we-begin", label: "Before we begin" }]} />
    <section id="approach" className="story-intro section-pad">
      <ChapterLabel number="01">A personal process</ChapterLabel>
      <div className="story-intro-grid"><h2>Considered together.<br /><em>Crafted for you.</em></h2><div><p>A custom piece starts with a connection. You work directly with Jeremy, from the earliest conversation to the final details.</p><p>There is room to explore, ask questions, and find what feels right. The process should be as thoughtful as the furniture itself.</p></div></div>
    </section>
    <section id="journey" className="commission-journey section-pad" aria-label="The four steps of commissioning furniture">
      <ChapterLabel number="02">From first thought to finished piece</ChapterLabel>
      {stages.map(stage => <article className="commission-stage" key={stage.number}>
        <figure><div className={`commission-image commission-image-${stage.number}`}><img src={stage.image} alt={stage.alt} width="1400" height="1200" loading="lazy" /></div><figcaption><span>{stage.note}</span><span>J. K. Oliver Woodworks</span></figcaption></figure>
        <div className="commission-copy"><div className="commission-stage-label"><span className="commission-number">{stage.number}</span><p className="eyebrow">{stage.label}</p></div><h3>{stage.title}<br /><em>{stage.emphasis}</em></h3><p>{stage.text}</p><p>{stage.detail}</p></div>
      </article>)}
    </section>
    <section id="before-we-begin" className="commission-preparation section-pad">
      <ChapterLabel number="03">Before we begin</ChapterLabel>
      <div className="story-intro-grid"><h2>A little inspiration.<br /><em>An open conversation.</em></h2><p>Nothing needs to be perfectly planned. A few thoughts can help us make the first conversation more useful.</p></div>
      <div className="story-principles"><article><span>01 / Your space</span><h3>The room it will call home.</h3><p>A photograph or approximate measurements help us think about scale, seating, and how you move through the room.</p></article><article><span>02 / Your eye</span><h3>The details you return to.</h3><p>Share pieces, textures, or shapes you love. They give us a starting point for finding your own direction.</p></article><article><span>03 / Your plans</span><h3>What matters to you.</h3><p>Let us know your budget and any dates you have in mind. We can talk through the possibilities together.</p></article></div>
      <Link className="story-link" href="/investment"><span>Explore investment & common questions</span><span aria-hidden="true">↗</span></Link>
    </section>
    <StoryNext eyebrow="A closer look" title={<>The difference is<br /><em>in the details.</em></>} description="Get to know the materials and decisions that give a piece its character." href="/craftsmanship" link="Explore the craftsmanship" image="/lineage-table.jpg" alt="Rich wood tones of The Lineage table" />
  <JsonLd data={breadcrumbSchema([{ name: "The process", path: "/process" }])} /></main><Footer /></>;
}
