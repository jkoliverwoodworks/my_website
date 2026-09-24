"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRef } from "react";

const links = [["/work", "Our work"], ["/craftsmanship", "Craftsmanship"], ["/process", "The process"], ["/maker", "The maker"]];

export function Header({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  return <><a className="skip-link" href="#main-content">Skip to content</a><header className={`site-header${overlay ? " header-overlay" : ""}`}><Link className="brand-logo" href="/" scroll aria-label="J. K. Oliver Woodworks home"><span><img src="/jko-logo-transparent.png" alt="" width="1536" height="1024" /></span></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([href, label]) => <Link href={href} scroll key={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav><Link className="header-cta" href="/contact" scroll>Start a project <span aria-hidden="true">↗</span></Link><details className="mobile-menu" ref={menu} onKeyDown={(event) => { if (event.key === "Escape" && menu.current) { menu.current.open = false; menu.current.querySelector("summary")?.focus(); } }}><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Mobile navigation">{[...links, ["/investment", "Investment & FAQs"], ["/contact", "Start a project"]].map(([href, label]) => <Link href={href} scroll key={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav></details></header></>;
}
