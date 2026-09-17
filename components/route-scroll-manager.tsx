"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RouteScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const reset = () => window.scrollTo(0, 0);

    reset();
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      reset();
      secondFrame = window.requestAnimationFrame(reset);
    });
    const settleReset = window.setTimeout(reset, 80);
    const finalReset = window.setTimeout(reset, 250);
    const restoreBehavior = window.setTimeout(() => {
      root.style.scrollBehavior = previousBehavior;
    }, 300);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(settleReset);
      window.clearTimeout(finalReset);
      window.clearTimeout(restoreBehavior);
      root.style.scrollBehavior = previousBehavior;
    };
  }, [pathname]);

  return null;
}
