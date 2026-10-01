import Link from "next/link";
import type { ReactNode } from "react";

export function StoryIndex({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  return <nav className="story-index section-pad" aria-label={label}>
    <span className="story-index-label">{label}</span>
    <div>{items.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div>
  </nav>;
}

export function ChapterLabel({ children }: { number: string; children: ReactNode }) {
  return <p className="eyebrow story-chapter">{children}</p>;
}

export function StoryNext({ id, eyebrow, title, description, href, link, image, alt }: {
  id?: string; eyebrow: string; title: ReactNode; description: string; href: string; link: string; image: string; alt: string;
}) {
  return <section id={id} className="story-next section-pad">
    <div className="story-next-copy"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{description}</p><Link href={href} className="story-link"><span>{link}</span><span aria-hidden="true">↗</span></Link></div>
    <figure><img src={image} alt={alt} width="1400" height="1200" loading="lazy" /></figure>
  </section>;
}
