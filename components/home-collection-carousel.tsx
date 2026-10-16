"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PublicPiece } from "@/lib/cms-model";
import type { Promotion } from "@/lib/cms-model";
import { PromotionPrice } from "@/components/promotion-price";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

export function HomeCollectionCarousel({ pieces, promotion }: { pieces: PublicPiece[]; promotion: Promotion }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => { api.off("select", update); api.off("reInit", update); };
  }, [api]);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!api || userPaused || !pageVisible) return;
    const timer = window.setInterval(() => api.scrollNext(), 5_000);
    return () => window.clearInterval(timer);
  }, [api, current, userPaused, pageVisible]);

  if (!pieces.length) return <section className="intro section-pad"><h1>Made for your home.</h1><p>The collection is being updated. <Link href="/contact">Discuss your idea with Jeremy ↗</Link></p></section>;
  return <section className="home-collection" aria-labelledby="home-collection-title">
    <Carousel setApi={setApi} opts={{ loop: true }} className="home-carousel">
      <CarouselContent className="home-carousel-track">
        {pieces.map((piece, index) => <CarouselItem className="home-carousel-slide" key={piece.slug}>
          <article className="home-carousel-card">
            <img
              src={piece.heroImage}
              srcSet={`${piece.image} 640w, ${piece.heroImage} ${piece.heroWidth}w`}
              sizes="100vw"
              alt={piece.imageAlt}
              width={piece.heroWidth}
              height={piece.heroHeight}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <div className="home-carousel-shade" />
            <div className="home-carousel-kicker"><span>Semi-custom dining tables · Buda, Texas</span><span>{String(index + 1).padStart(2, "0")} / {String(pieces.length).padStart(2, "0")}</span></div>
            <div className="home-carousel-copy">
              <div><p className="eyebrow light">The Hill Country Collection · <PromotionPrice price={piece.price} promotion={promotion} /></p><h1 id={index === 0 ? "home-collection-title" : undefined}>{piece.name}</h1></div>
              <div className="home-carousel-aside"><Link href={`/work/${piece.slug}`}>Explore this design <span aria-hidden="true">↗</span></Link></div>
            </div>
          </article>
        </CarouselItem>)}
      </CarouselContent>
      <div className="home-carousel-controls">
        <div className="home-carousel-buttons"><button type="button" onClick={() => api?.scrollPrev()} aria-label="Previous table design">←</button><button type="button" onClick={() => api?.scrollNext()} aria-label="Next table design">→</button></div>
        <div className="home-carousel-dots" aria-label="Choose a table design">{pieces.map((piece, index) => <button type="button" key={piece.slug} className={current === index ? "is-current" : ""} onClick={() => api?.scrollTo(index)} aria-label={`Show ${piece.name}`} aria-current={current === index ? "true" : undefined}><span /></button>)}</div>
        <button className="home-carousel-autoplay" type="button" onClick={() => setUserPaused(value => !value)} aria-label={userPaused ? "Resume automatic carousel" : "Pause automatic carousel"}>{userPaused ? "Play" : "Pause"} <span aria-hidden="true">{userPaused ? "▶" : "Ⅱ"}</span></button>
      </div>
    </Carousel>
  </section>;
}
