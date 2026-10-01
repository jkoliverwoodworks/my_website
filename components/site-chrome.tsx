import Link from "next/link";
import type { ReactNode } from "react";
export { Header } from "@/components/site-header";

export function Footer() {
  return <footer className="atelier-footer" id="footer">
    <div className="footer-invitation"><div><p className="eyebrow">Your next chapter, made by hand</p><h2>Let’s make<br /><em>it yours.</em></h2></div><Link className="footer-project-link" href="/contact"><span>Start a conversation</span><span className="footer-project-arrow" aria-hidden="true">↗</span></Link></div>
    <div className="footer-directory"><div className="footer-studio"><p className="eyebrow">Made in Buda. Made one at a time.</p><p>Buda, Texas.<br />Serving Central Texas.</p><span>Semi-custom and completely custom furniture.<br />Crafted by Jeremy Oliver.</span></div><nav className="footer-links" aria-label="Explore"><p>Explore</p><Link href="/work">The collection</Link><Link href="/craftsmanship">Craftsmanship</Link><Link href="/process">The process</Link><Link href="/maker">Meet Jeremy</Link></nav><div className="footer-links"><p>Let’s talk</p><a href="mailto:jeremyoliver@att.net">jeremyoliver@att.net <span aria-hidden="true">↗</span></a><Link href="/contact">Custom commissions</Link><Link href="/investment">Investment, warranty & FAQs</Link></div></div>
    <Link className="footer-brand-lockup" href="/" aria-label="J. K. Oliver Woodworks home"><span className="footer-logo-crop"><img src="/jko-logo-transparent.png" alt="" width="1536" height="1024" /></span><strong>Hill Country Roots. Authentic Craftsmanship.</strong></Link>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} J. K. Oliver Woodworks</span><span>Made in Buda. Made to be kept.</span><a href="#main-content">Back to top <span aria-hidden="true">↑</span></a></div>
  </footer>;
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: ReactNode; intro: string; image: string }) {
  return <section className="page-hero"><img src={image} alt="" width="1400" height="1200" fetchPriority="high" /><div className="page-hero-shade" /><div className="page-hero-copy"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section>;
}
