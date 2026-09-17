"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const nodes = document.querySelectorAll(".intro-grid, .section-heading, .work-card, .craft-copy, .maker-copy, .maker-note-title, .maker-letter, .maker-portrait-composition, .steps article, .editorial > div, .portfolio article, .process-long article, .product-story");
    const observer = new IntersectionObserver((entries) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    nodes.forEach(node => { node.classList.add("reveal-ready"); observer.observe(node); });
    return () => { observer.disconnect(); nodes.forEach(node => node.classList.remove("reveal-ready", "is-revealed")); };
  }, [pathname]);
  return null;
}
