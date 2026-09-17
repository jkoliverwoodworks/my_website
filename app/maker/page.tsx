import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { Footer, Header, PageHero } from "@/components/site-chrome";
import { ChapterLabel, StoryIndex, StoryNext } from "@/components/story-sections";

export const metadata = pageMetadata("/maker", "Meet Jeremy Oliver, Furniture Maker | J. K. Oliver Woodworks", "Meet Jeremy Oliver, the craftsman behind J. K. Oliver Woodworks. Personal guidance and custom solid-wood furniture made in Buda, Texas.");

export default function Maker() {
  return <><Header /><main id="main-content" className="story-page maker-page">
    <PageHero eyebrow="Meet the maker" title={<>Family is the<br /><em>reason why.</em></>} intro="A local craftsman, a love of honest materials, and furniture built around the moments that make a house a home." image="/jeremy-oliver.jpeg" />
    <StoryIndex label="The man behind the making" items={[{ href: "#jeremys-story", label: "The story" }, { href: "#reason-why", label: "The reason" }, { href: "#working-together", label: "The connection" }]} />
    <section id="jeremys-story" className="maker-biography section-pad">
      <ChapterLabel number="01">Jeremy Oliver · Maker & founder</ChapterLabel>
      <div className="maker-biography-heading"><h2>A different path.<br /><em>The same pair of hands.</em></h2><p>Buda, Texas<br /><span>A personal story, made in wood.</span></p></div>
      <div className="maker-biography-grid"><figure className="family-portrait"><img src="/jeremy-oliver.jpeg" alt="Jeremy Oliver with his family beside a mountain lake" width="3672" height="4896" loading="lazy" /><figcaption><span>The people behind the purpose.</span><span>Jeremy & family</span></figcaption></figure><article className="maker-biography-copy"><p className="story-dropcap">Woodworking began as a hobby years ago. After nearly twenty years in banking, an unexpected career change gave me the opportunity to turn something I loved into something much bigger.</p><p>Somewhere along the way, I realized that a table is never only a table. It is where homework happens, where too many chairs get squeezed in for the holidays, and where family stories quietly collect.</p><p>That’s why every piece is built one at a time here in Central Texas: with real hardwood, proven craftsmanship, and the conviction that a great table should be kept—not replaced when the next trend arrives.</p><div className="maker-biography-signoff"><span className="signature">Jeremy Oliver</span><span>Owner & craftsman</span></div></article></div>
    </section>
    <section id="reason-why" className="maker-purpose section-pad">
      <div className="maker-purpose-copy"><ChapterLabel number="02">The reason behind the work</ChapterLabel><h2>A table is never<br /><em>only a table.</em></h2><p>It is an ordinary Tuesday. A seat pulled closer. Another story told long after dinner is over.</p><p>The furniture is made in the workshop.<br />What makes it meaningful happens at home.</p><span className="maker-purpose-note">Made for the life around it.</span></div><figure><img src="/hearth-table.jpg" alt="A dining room with a wooden table and space to gather" width="1400" height="1200" loading="lazy" /></figure>
    </section>
    <section id="working-together" className="maker-connection section-pad">
      <ChapterLabel number="03">A direct connection</ChapterLabel>
      <div className="story-intro-grid"><h2>Know the person<br /><em>making your piece.</em></h2><div><p>From the first conversation to the final finish, you work directly with Jeremy. Your questions, ideas, and the little details about your home all have a place in the process.</p><Link className="story-link" href="/contact"><span>Start a conversation with Jeremy</span><span aria-hidden="true">↗</span></Link></div></div>
      <div className="story-principles"><article><span>01 / Personal</span><h3>Room for your story.</h3><p>A home is personal. The furniture made for it should begin with listening.</p></article><article><span>02 / Considered</span><h3>Care in the details.</h3><p>The grain, the proportions, the feel of a finished edge. Small decisions that add up.</p></article><article><span>03 / Rooted here</span><h3>Made in Central Texas.</h3><p>Furniture built in Buda, for homes in Austin, the Hill Country, and the lives around each piece.</p></article></div>
    </section>
    <StoryNext eyebrow="Your story comes next" title={<>From a first idea.<br /><em>To a place to gather.</em></>} description="See how we work together to bring a piece of your own into the world." href="/process" link="Discover the process" image="/cypress-table.jpg" alt="The Cypress table surrounded by dining chairs" />
  </main><Footer /></>;
}
