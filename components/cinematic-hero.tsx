"use client";

import { useEffect, useRef, useState } from "react";

export function CinematicHero({ collection = false }: { collection?: boolean }) {
  const stage = useRef<HTMLElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const motionPaused = useRef(false);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const element = stage.current;
    const video = film.current;
    if (!element || !video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let frame = 0;
    let disposed = false;

    const render = () => {
      frame = 0;
      if (disposed) return;
      const hero = element.firstElementChild as HTMLElement;
      const distance = Math.max(1, element.offsetHeight - hero.offsetHeight);
      const progress = preference.matches ? 0 : Math.min(1, Math.max(0, -element.getBoundingClientRect().top / distance));
      element.style.setProperty("--hero-progress", String(progress));
      // Hold the full-width composition during the push, then pull the room into a frame.
      const retreat = Math.max(0, (progress - .68) / .32);
      const easedRetreat = retreat * retreat * (3 - 2 * retreat);
      element.style.setProperty("--hero-retreat", String(easedRetreat));
      if (!motionPaused.current) {
        element.style.setProperty("--room-zoom", String(1.12 + .4 * Math.sin(progress * Math.PI) - .12 * progress));
        if (!preference.matches && Number.isFinite(video.duration) && !video.seeking && !document.hidden) {
          const target = progress * Math.max(0, video.duration - 1 / 24);
          if (Math.abs(video.currentTime - target) > 1 / 30) video.currentTime = target;
        }
      }
    };
    const schedule = () => { if (!frame && !disposed) frame = requestAnimationFrame(render); };
    const syncPreference = () => {
      if (!preference.matches && !connection?.saveData && !video.getAttribute("src")) {
        video.src = "/woodworks-hero.mp4";
        video.load();
      }
      schedule();
    };
    video.addEventListener("loadedmetadata", schedule);
    video.addEventListener("seeked", schedule);
    element.addEventListener("motionchange", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    preference.addEventListener("change", syncPreference);
    syncPreference();
    render();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", schedule);
      video.removeEventListener("seeked", schedule);
      element.removeEventListener("motionchange", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      preference.removeEventListener("change", syncPreference);
    };
  }, []);

  const toggle = () => {
    motionPaused.current = !motionPaused.current;
    setPaused(motionPaused.current);
    stage.current?.dispatchEvent(new Event("motionchange"));
  };

  return <section ref={stage} className={`cinematic-stage${collection ? " collection-stage" : ""}`} aria-labelledby="hero-title">
    <div className="cinematic-hero">
      <div className={`cinematic-media${available ? " film-ready" : ""}`}>
        <img src="/heritage-table.jpg" alt="A solid oak dining table with black chairs in a warm, sunlit interior" width="1312" height="1199" fetchPriority="high" />
        <video ref={film} muted playsInline preload="auto" aria-hidden="true" onLoadedData={() => setAvailable(true)} onError={() => setAvailable(false)} />
      </div>
      <div className="cinematic-shade" />
      <div className="cinematic-topline"><p className="eyebrow light">{collection ? "The collection / Selected work" : "Bespoke furniture / Buda, Texas"}</p><p>One maker. Considered details.<br />A lifetime of belonging.</p></div>
      <div className="cinematic-content">
        <h1 id="hero-title">{collection ? <>Objects with<br /><em>a soul.</em></> : <>Made to<br /><em>be kept.</em></>}</h1>
        <div className="cinematic-aside"><span className="hero-index">{collection ? "01 — The collection" : "J. K. Oliver / Woodworks"}</span><p>{collection ? "An exploration of grain, proportion, and the places we gather." : "Exceptional wood. Personal design. Furniture that becomes part of your story."}</p><a className="film-link" href={collection ? "#collection" : "/work"}>{collection ? "Discover the pieces" : "Explore the collection"}<span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="cinematic-bottom"><a href={collection ? "#collection" : "#our-approach"}><span aria-hidden="true">↓</span> Scroll into the room</a><span>Come closer. Stay a little.</span>{available && <button type="button" className="film-control" onClick={toggle} aria-pressed={paused} aria-label={paused ? "Resume scroll motion" : "Pause scroll motion"}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span> {paused ? "Resume motion" : "Pause motion"}</button>}</div>
      <div className="room-progress" aria-hidden="true"><span /></div>
    </div>
  </section>;
}
