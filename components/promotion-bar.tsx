"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { promotionIsActive, type Promotion } from "@/lib/cms-model";

export function PromotionBar({ promotion }: { promotion: Promotion | null }) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  useEffect(() => {
    const refresh = () => setActive(Boolean(promotion && promotionIsActive(promotion)));
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(timer);
  }, [promotion]);
  if (!promotion || !active || pathname.startsWith("/studio")) return null;
  return <aside className="promotion-bar" aria-label="Current offer">
    <span>{promotion.percentOff}% off</span>
    <p><strong>{promotion.name}</strong> — {promotion.message}</p>
    <Link href="/work">Shop the collection <span aria-hidden="true">↗</span></Link>
  </aside>;
}
