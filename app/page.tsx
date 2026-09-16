const work = [
  { image: "/elm-table.jpg", name: "The Elm", details: "White oak · Hill Country, Texas" },
  { image: "/lineage-table.jpg", name: "The Lineage", details: "Walnut · Buda, Texas" },
  { image: "/soho-table.jpg", name: "The Foundry", details: "Oak & steel · Austin, Texas" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="J. K. Oliver Woodworks home"><span>J. K. OLIVER</span><small>WOODWORKS</small></a>
        <nav aria-label="Main navigation"><a href="#work">Our work</a><a href="#craft">Craftsmanship</a><a href="#maker">The maker</a><a href="#process">Process</a></nav>
        <a className="header-cta" href="#inquire">Start a project <span>↗</span></a>
      </header>
      <section className="hero" id="top">
        <div className="hero-image" role="img" aria-label="Handcrafted white oak dining table in a Hill Country home" /><div className="hero-shade" />
        <div className="hero-copy"><p className="eyebrow light">Buda, Texas · Est. 2020</p><h1>Made for the moments<br />that matter most.</h1><p className="hero-intro">Handcrafted, solid-wood furniture for the way your family gathers now—and the stories they’ll carry forward.</p><a className="button button-light" href="#inquire">Begin your piece <span>→</span></a></div>
        <p className="hero-foot">Hill Country Roots.<br />Authentic Craftsmanship.</p>
      </section>
      <section className="intro section-pad"><p className="eyebrow">J. K. Oliver Woodworks</p><div className="intro-grid"><h2>Furniture with a<br /><em>family story</em> in mind.</h2><div><p>Every table begins with a conversation: how you gather, the room it will live in, and the life you want it to hold. Then it is made, one piece at a time, from genuine hardwood in our Central Texas workshop.</p><a className="text-link" href="#maker">Meet Jeremy <span>→</span></a></div></div></section>
      <section className="signature-work" id="work"><div className="section-heading section-pad"><div><p className="eyebrow">Selected work</p><h2>Built to be lived with.</h2></div><p>Original pieces, each designed around the people and spaces they were made for.</p></div><div className="work-grid">{work.map((item) => <article className="work-card" key={item.name}><img src={item.image} alt={`${item.name} custom dining table`} /><div><h3>{item.name}</h3><p>{item.details}</p></div></article>)}</div><div className="section-pad work-footer"><a className="text-link" href="#inquire">Explore the portfolio <span>→</span></a></div></section>
      <section className="craft-section" id="craft"><div className="craft-photo"><img src="/heritage-detail.jpg" alt="Close view of a handcrafted wood dining table" /></div><div className="craft-copy"><p className="eyebrow">The difference is in the details</p><h2>Chosen well.<br /><em>Built honestly.</em></h2><p>From the first board to the final finish, every choice has a purpose. We select hardwoods for their character and durability, build with proven joinery, and finish each piece to welcome everyday life.</p><ul><li><span>01</span> Solid hardwood, never veneer</li><li><span>02</span> Designed around your home</li><li><span>03</span> Made for generations, not trends</li></ul></div></section>
      <section className="maker section-pad" id="maker"><div className="maker-image"><img src="/jeremy-oliver.jpeg" alt="Jeremy Oliver, founder and craftsman of J. K. Oliver Woodworks" /></div><div className="maker-copy"><p className="eyebrow">Meet the maker</p><blockquote>“I build tables, but family is the reason why.”</blockquote><p>I’m Jeremy Oliver, owner and craftsman behind J. K. Oliver Woodworks. After nearly twenty years in banking, an unexpected career change gave me the opportunity to turn a longtime love of woodworking into something larger.</p><p>Some of life’s most meaningful moments happen around a table. My goal is to build tables worthy of becoming part of your family’s story.</p><a className="text-link" href="#inquire">My story <span>→</span></a></div></section>
      <section className="process section-pad" id="process"><p className="eyebrow">A considered process</p><h2>From your idea<br />to your <em>home.</em></h2><div className="steps"><article><span>01</span><h3>Start with a conversation</h3><p>Share your space, your inspiration, and how you want the piece to serve your family.</p></article><article><span>02</span><h3>Design it together</h3><p>We work through scale, wood, finish, and every detail that makes it yours.</p></article><article><span>03</span><h3>Crafted in Texas</h3><p>Your piece is built by hand with clear communication from first board to final delivery.</p></article></div></section>
      <section className="inquiry" id="inquire"><div className="inquiry-image"><img src="/heritage-table.jpg" alt="Custom white oak dining table ready for family gatherings" /></div><div className="inquiry-copy"><p className="eyebrow light">Start your project</p><h2>Let’s make room<br />for your story.</h2><p>Tell us what you have in mind. Whether you have a complete vision or simply know you want something better, we’ll help guide the next step.</p><a className="button button-light" href="mailto:jeremyoliver@att.net?subject=Custom%20Furniture%20Project%20Inquiry">Start the conversation <span>→</span></a><small>Based in Buda, serving Austin and the Texas Hill Country.</small></div></section>
      <footer><div className="wordmark"><span>J. K. OLIVER</span><small>WOODWORKS</small></div><p>Hill Country Roots. Authentic Craftsmanship.</p><a href="mailto:jeremyoliver@att.net">jeremyoliver@att.net</a><small>© {new Date().getFullYear()} J. K. Oliver Woodworks</small></footer>
    </main>
  );
}
