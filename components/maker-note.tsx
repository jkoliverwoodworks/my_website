import Link from "next/link";

export function MakerNote() {
  return <section className="maker-note section-pad" id="maker-note" aria-labelledby="maker-note-title">
    <div className="maker-note-heading"><p className="eyebrow">03 / A note from the maker</p><span className="maker-note-location">Buda, Texas <span aria-hidden="true">↗</span></span></div>
    <div className="maker-note-title"><h2 id="maker-note-title">A human touch.<br /><em>In every detail.</em></h2><p>One pair of hands.<br /> From the first conversation<br /> to the final finish.</p></div>
    <div className="maker-note-grid">
      <div className="maker-portrait-composition">
        <figure className="maker-portrait"><img src="/jeremy-oliver.jpeg" alt="Jeremy Oliver with his family" width="3672" height="4896" loading="lazy" /><figcaption><span>Jeremy Oliver</span><span>Maker & founder</span></figcaption></figure>
        <figure className="maker-detail"><img src="/heritage-detail.jpg" alt="A closer look at the grain of a solid-wood dining table" width="1402" height="1122" loading="lazy" /><figcaption>Character in every grain.</figcaption></figure>
      </div>
      <div className="maker-letter"><span className="letter-overline">A piece of furniture. A personal connection.</span><h3>Before a piece takes shape,<br /><em>a conversation begins.</em></h3><p>How will you use your table? Who will gather around it? What would make it feel like yours?</p><p>Those are the details Jeremy wants to hear. From the first idea to the final finish, you work directly with the person making your furniture.</p><p>Real hardwood. Considered details. Something that feels at home with you, and becomes more meaningful with time.</p><div className="maker-signoff"><span className="signature" aria-hidden="true">Jeremy Oliver</span><span>Owner & craftsman<br />J. K. Oliver Woodworks</span></div><Link className="maker-story-link" href="/maker"><span>Meet the man behind the making</span><span className="maker-link-arrow" aria-hidden="true">↗</span></Link></div>
    </div>
  </section>;
}
