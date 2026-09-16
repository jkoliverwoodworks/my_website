import type { ReactNode } from "react";

export function Header() {
  return <header className="site-header"><a className="wordmark" href="/" aria-label="J. K. Oliver Woodworks home"><span>J. K. OLIVER</span><small>WOODWORKS</small></a><nav aria-label="Main navigation"><a href="/work">Our work</a><a href="/craftsmanship">Craftsmanship</a><a href="/process">Process</a><a href="/maker">The maker</a></nav><a className="header-cta" href="/contact">Start a project <span>↗</span></a></header>;
}

export function Footer() {
  return <footer><div className="wordmark"><span>J. K. OLIVER</span><small>WOODWORKS</small></div><p>Hill Country Roots. Authentic Craftsmanship.</p><a href="mailto:jeremyoliver@att.net">jeremyoliver@att.net</a><small>© {new Date().getFullYear()} J. K. Oliver Woodworks</small></footer>;
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: ReactNode; intro: string; image: string }) {
  return <section className="page-hero"><img src={image} alt="" /><div className="page-hero-shade" /><div className="page-hero-copy"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section>;
}
