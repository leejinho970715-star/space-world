"use client";

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import Navigation from "./Navigation";
import SiteFooter from "./SiteFooter";

export type ExhibitionItem = {
  eyebrow: string;
  title: string;
  period: string;
  intro: string;
  body: string;
  image: string;
  alt: string;
  facts: Array<[string, string]>;
};

type Props = {
  chapter: string;
  title: string;
  lede: string;
  note: string;
  items: ExhibitionItem[];
  tone?: "archive" | "orbit";
};

const wrappedDistance = (index: number, active: number, length: number) => {
  let distance = (index - active + length) % length;
  if (distance > length / 2) distance -= length;
  return distance;
};

export default function InfiniteExhibition({ chapter, title, lede, note, items, tone = "archive" }: Props) {
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const pointerStart = useRef(0);
  const wheelLock = useRef(false);
  const activeItem = items[active];
  const go = useCallback((direction: number) => setActive(current => (current + direction + items.length) % items.length), [items.length]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!dragging && !document.hidden) go(1);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [dragging, go]);

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const motion = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(motion) < 12 || wheelLock.current) return;
    wheelLock.current = true;
    go(motion > 0 ? 1 : -1);
    window.setTimeout(() => { wheelLock.current = false; }, 520);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) setDrag(event.clientX - pointerStart.current);
  };

  const finishDrag = () => {
    if (!dragging) return;
    if (Math.abs(drag) > 45) go(drag < 0 ? 1 : -1);
    setDrag(0);
    setDragging(false);
  };

  return <main className={`subpage exhibition-page exhibition-${tone}`}>
    <header className="topbar solid">
      {/* Static hosting uses a full document navigation here; this avoids an unnecessary RSC prefetch. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a className="brand" href="/" aria-label="Space World home"><img className="brand-logo" src="/logo-cosmos.png" alt=""/>SPACE <b>WORLD</b></a>
      <Navigation/>
    </header>

    <section className="exhibition-intro">
      <p className="eyebrow"><i/>{chapter}</p>
      <h1>{title}</h1>
      <p>{lede}</p>
      <a href="#exhibition-gallery">ENTER EXHIBITION <span aria-hidden="true">↓</span></a>
    </section>

    <section id="exhibition-gallery" className="exhibition-gallery" aria-roledescription="carousel" aria-label={`${chapter} exhibition`}>
      <header className="exhibition-heading">
        <p className="eyebrow"><i/>CURATED COLLECTION · {String(items.length).padStart(2, "0")} STORIES</p>
        <h2>{note}</h2>
        <div className="exhibition-arrows" aria-label="Exhibition controls">
          <button type="button" onClick={() => go(-1)} aria-label="Previous exhibit">←</button>
          <button type="button" onClick={() => go(1)} aria-label="Next exhibit">→</button>
        </div>
      </header>

      <div
        className={`exhibition-viewport${dragging ? " is-dragging" : ""}`}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={event => {
          if (event.key === "ArrowLeft") go(-1);
          if (event.key === "ArrowRight") go(1);
        }}
        tabIndex={0}
        role="slider"
        aria-valuemin={1}
        aria-valuemax={items.length}
        aria-valuenow={active + 1}
        aria-valuetext={activeItem.title}
        aria-label="Drag, scroll, swipe, or use arrow keys to explore"
      >
        <div className="exhibition-track">
          {items.map((item, index) => {
            const slot = wrappedDistance(index, active, items.length);
            const style = { "--slot": slot, "--drag": `${drag}px` } as CSSProperties;
            return <button
              className={`exhibition-card${slot === 0 ? " active" : ""}`}
              style={style}
              data-slot={slot}
              type="button"
              onClick={() => setActive(index)}
              aria-current={slot === 0 ? "true" : undefined}
              aria-label={`${item.title}, ${item.period}`}
              key={item.title}
            >
              <img src={item.image} alt={item.alt} draggable={false}/>
              <span className="exhibition-card-shade"/>
              <span className="exhibition-card-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="exhibition-card-label"><small>{item.eyebrow}</small><b>{item.title}</b></span>
            </button>;
          })}
        </div>
      </div>

      <article className="exhibition-story" aria-live="polite" key={activeItem.title}>
        <div><small>{activeItem.eyebrow}</small><strong>{activeItem.period}</strong></div>
        <div><h3>{activeItem.title}</h3><p>{activeItem.intro}</p></div>
        <p>{activeItem.body}</p>
        <dl>{activeItem.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </article>

      <nav className="exhibition-dots" aria-label="Choose an exhibit">
        {items.map((item, index) => <button type="button" className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Open ${item.title}`} key={item.title}><span>{String(index + 1).padStart(2, "0")}</span></button>)}
      </nav>
      <p className="exhibition-gesture">DRAG · SWIPE · SCROLL <span aria-hidden="true">↔</span></p>
    </section>
    <SiteFooter/>
  </main>;
}
