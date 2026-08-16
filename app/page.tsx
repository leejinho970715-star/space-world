"use client";

import { useEffect, useRef, useState } from "react";

const planets = [
  { name: "수성", en: "MERCURY", fact: "태양과 가장 가까운 암석 행성", temp: "167°C", color: "#b9a895", size: 118, orbit: "88일" },
  { name: "금성", en: "VENUS", fact: "두꺼운 구름 아래 숨은 뜨거운 세계", temp: "464°C", color: "#d99b53", size: 156, orbit: "225일" },
  { name: "지구", en: "EARTH", fact: "우리가 아는 유일한 생명의 행성", temp: "15°C", color: "#2a8bd8", size: 172, orbit: "365일" },
  { name: "화성", en: "MARS", fact: "인류의 다음 발자국을 기다리는 붉은 행성", temp: "-63°C", color: "#c45737", size: 146, orbit: "687일" },
  { name: "목성", en: "JUPITER", fact: "태양계의 거대한 폭풍 수호자", temp: "-110°C", color: "#d6a26d", size: 254, orbit: "12년" },
  { name: "토성", en: "SATURN", fact: "얼음과 암석으로 빛나는 고리의 행성", temp: "-140°C", color: "#d6bd83", size: 218, orbit: "29년" },
  { name: "천왕성", en: "URANUS", fact: "옆으로 누워 공전하는 얼음 거인", temp: "-195°C", color: "#72d2d5", size: 174, orbit: "84년" },
  { name: "해왕성", en: "NEPTUNE", fact: "초음속 바람이 부는 푸른 경계", temp: "-200°C", color: "#3767da", size: 168, orbit: "165년" },
];

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const range = Math.max(1, el.offsetHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / range)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [ref]);
  return progress;
}

function Planet({ planet, index }: { planet: typeof planets[number]; index: number }) {
  return (
    <article className="planet-card">
      <span className="planet-index">0{index + 1}</span>
      <div className={`planet-orb planet-${index}`} style={{ "--planet": planet.color, "--size": `${planet.size}px` } as React.CSSProperties}>
        {index === 5 && <span className="saturn-ring" />}
        <span className="planet-glow" />
      </div>
      <div className="planet-copy">
        <p>{planet.en}</p><h3>{planet.name}</h3><span>{planet.fact}</span>
        <dl><div><dt>평균 기온</dt><dd>{planet.temp}</dd></div><div><dt>공전 주기</dt><dd>{planet.orbit}</dd></div></dl>
      </div>
    </article>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const planetsRef = useRef<HTMLElement>(null);
  const hero = useScrollProgress(heroRef);
  const pan = useScrollProgress(planetsRef);
  const [sound, setSound] = useState(false);
  const [guideOpen, setGuideOpen] = useState(true);
  const [activeSignal, setActiveSignal] = useState("소행성");
  const heroText = hero < .27 ? 0 : hero < .57 ? 1 : 2;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="COSMOS AR 홈"><span className="brand-orbit">✦</span> COSMOS<span>/AR</span></a>
        <nav aria-label="주요 메뉴"><a href="#planets">행성</a><a href="#deep-space">딥 스페이스</a><a href="#signals">궤도 신호</a></nav>
        <button className="sound" onClick={() => setSound(!sound)} aria-pressed={sound}><i>{sound ? "◉" : "○"}</i> SOUND {sound ? "ON" : "OFF"}</button>
      </header>

      <section id="top" className="hero-scroll" ref={heroRef}>
        <div className="hero-sticky">
          <img className="hero-image" src="/hero-space.png" alt="달 표면에서 우주를 바라보는 우주인" style={{ transform: `scale(${1 + hero * .42}) translate3d(${hero * -3}%, ${hero * 3}%, 0)` }} />
          <div className="space-vignette" />
          <div className="scan-grid" style={{ opacity: .15 + hero * .3 }} />
          <div className="hud-corners"><span /><span /><span /><span /></div>
          <div className="hero-copy" style={{ opacity: 1 - Math.min(1, hero * 2.8), transform: `translateY(${-hero * 90}px)` }}>
            <p className="eyebrow"><i /> INTERSTELLAR EXPLORATION · 2026</p>
            <h1>우주를<br/><em>걷는</em> 순간</h1>
            <div className="hero-bottom"><p>스크롤을 내려<br/>탐사를 시작하세요</p><span className="scroll-cue"><i /></span><b>SEOUL / 37.56°N<br/>LIVE SIGNAL</b></div>
          </div>
          <div className={`story-line story-${heroText}`}>
            <p>{heroText === 0 ? "대기권을 벗어나는 중" : heroText === 1 ? "38만 km 너머, 달의 궤도" : "이제 태양계를 가로지릅니다"}</p>
            <strong>{heroText === 0 ? "ASCENDING" : heroText === 1 ? "LUNAR ORBIT" : "SYSTEM ONLINE"}</strong>
          </div>
          <div className="altimeter"><span>ALT</span><b>{Math.round(384400 * hero).toLocaleString()}</b><small>KM</small></div>
          <div className="hero-progress"><span style={{ height: `${hero * 100}%` }} /></div>
        </div>
      </section>

      <section id="planets" className="planet-scroll" ref={planetsRef}>
        <div className="planet-sticky">
          <div className="section-head"><p className="eyebrow"><i /> SOLAR SYSTEM / 01—08</p><h2>여덟 개의 세계,<br/><em>하나의 궤도</em></h2><span>SCROLL TO TRAVEL →</span></div>
          <div className="orbit-line" />
          <div className="planet-track" style={{ transform: `translate3d(calc(6vw - ${pan * 685}vw), 0, 0)` }}>
            {planets.map((p, i) => <Planet key={p.name} planet={p} index={i} />)}
          </div>
          <div className="pan-progress"><span style={{ width: `${pan * 100}%` }} /></div>
        </div>
      </section>

      <section id="deep-space" className="deep-space">
        <img src="/deep-space-panorama.png" alt="소행성, 은하수, 별자리, 인공위성이 펼쳐진 우주" />
        <div className="deep-overlay" />
        <div className="deep-title"><p className="eyebrow"><i /> BEYOND THE PLANETS</p><h2>행성 너머의<br/><em>미지와 조우하다</em></h2></div>
        <div className="signals" id="signals">
          {[{n:"소행성",e:"ASTEROID",v:"1,329,351",u:"발견된 천체"},{n:"은하수",e:"MILKY WAY",v:"100,000",u:"광년의 지름"},{n:"별자리",e:"CONSTELLATION",v:"88",u:"공식 별자리"},{n:"인공위성",e:"SATELLITE",v:"11,700+",u:"활성 궤도체"}].map((item, i) => (
            <button key={item.n} className={activeSignal === item.n ? "active" : ""} onClick={() => setActiveSignal(item.n)}>
              <span>0{i+1} / {item.e}</span><h3>{item.n}</h3><p>{item.v}<small>{item.u}</small></p><i>↗</i>
            </button>
          ))}
        </div>
        <aside className="signal-detail"><span>LIVE OBJECT</span><b>{activeSignal}</b><p>탐사 데이터 수신 중 · 신호 강도 98.7%</p><div><i /></div></aside>
      </section>

      <section className="finale">
        <div className="final-orbit"><span /><span /><span /></div>
        <img src="/astronaut.png" alt="손을 흔드는 우주인 가이드 미오" />
        <div><p className="eyebrow"><i /> MISSION COMPLETE</p><h2>다음 발견은<br/>당신의 <em>스크롤</em> 끝에</h2><a href="#top">탐사 다시 시작 <span>↑</span></a></div>
      </section>

      <button className={`mascot-guide ${guideOpen ? "open" : ""}`} onClick={() => setGuideOpen(!guideOpen)} aria-label="우주인 미오의 탐사 가이드">
        <img src="/astronaut.png" alt="" />
        {guideOpen && <span><b>안녕, 나는 미오!</b>천천히 스크롤하면 우주가 움직여요.<i>×</i></span>}
      </button>
      <footer><a className="brand" href="#top"><span className="brand-orbit">✦</span> COSMOS<span>/AR</span></a><p>THE UNIVERSE IS WAITING FOR YOU.</p><small>© 2026 COSMOS AR LAB</small></footer>
    </main>
  );
}
