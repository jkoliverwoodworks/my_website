"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/pieces";
import { promotionalPrice, promotionIsActive, type Promotion } from "@/lib/cms-model";

export function PromotionPrice({ price, promotion, prefix = "From " }: { price: number; promotion: Promotion; prefix?: string }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const refresh = () => setActive(promotionIsActive(promotion));
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(timer);
  }, [promotion]);
  if (!active) return <>{prefix}{formatPrice(price)}</>;
  return <span className="promotion-price"><span>{promotion.percentOff}% off</span>{prefix}<del>{formatPrice(price)}</del> <ins>{formatPrice(promotionalPrice(price, promotion))}</ins></span>;
}
