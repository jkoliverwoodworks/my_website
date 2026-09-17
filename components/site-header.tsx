"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRef } from "react";

const links = [["/work", "Our work"], ["/craftsmanship", "Craftsmanship"], ["/process", "The process"], ["/maker", "The maker"]];

export function Header({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  return <><a className="skip-link" href="#main-content">Skip to content</a><header className={`site-header${overlay ? " header-overlay" : ""}`}><Link className="wordmark" href="/" aria-label="J. K. Oliver Woodworks home"><span>J. K. OLIVER</span><small>WOODWORKS</small></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([href, label]) => <a href={href} key={href} aria-current={pathname === href ? "page" : undefined}>{label}</a>)}</nav><a className="header-cta" href="/contact">Start a project <span aria-hidden="true">↗</span></a><details className="mobile-menu" ref={menu} onKeyDown={(event) => { if (event.key === "Escape" && menu.current) { menu.current.open = false; menu.current.querySelector("summary")?.focus(); } }}><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Mobile navigation">{[...links, ["/investment", "Investment & FAQs"], ["/contact", "Start a project"]].map(([href, label]) => <a href={href} key={href} aria-current={pathname === href ? "page" : undefined}>{label}</a>)}</nav></details></header></>;
}
