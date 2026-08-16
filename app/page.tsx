"use client";

import { useEffect, useRef, useState } from "react";

const planets = [
  { name:"Mercury", fact:"A cratered world shaped by extreme heat and cold.", temp:"167°C", orbit:"88 days", image:"/planet-mercury.png", size:240 },
  { name:"Venus", fact:"A dense atmosphere hides the hottest surface in the Solar System.", temp:"464°C", orbit:"225 days", image:"/planet-venus.png", size:270 },
  { name:"Earth", fact:"The only world known to hold liquid oceans and life.", temp:"15°C", orbit:"365 days", image:"/planet-earth.png", size:290 },
  { name:"Mars", fact:"A cold desert preserving the record of an ancient, wetter past.", temp:"−63°C", orbit:"687 days", image:"/planet-mars.png", size:260 },
  { name:"Jupiter", fact:"A gas giant whose storms have lasted for centuries.", temp:"−110°C", orbit:"11.9 years", image:"/planet-jupiter.png", size:390 },
  { name:"Saturn", fact:"An immense ring system built from ice, rock and dust.", temp:"−140°C", orbit:"29.5 years", image:"/planet-saturn.png", size:430 },
  { name:"Uranus", fact:"An ice giant rotating almost completely on its side.", temp:"−195°C", orbit:"84 years", image:"/planet-uranus.png", size:300 },
  { name:"Neptune", fact:"The outermost planet, driven by supersonic winds.", temp:"−200°C", orbit:"164.8 years", image:"/planet-neptune.png", size:300 },
];

const objects = [
  { name:"Asteroids", tag:"NEAR-EARTH OBJECTS", value:"1.3M+", unit:"catalogued bodies", image:"/object-asteroid.png", note:"Rocky remnants from the formation of the Solar System." },
  { name:"The Milky Way", tag:"HOME GALAXY", value:"100K", unit:"light-years wide", image:"/object-galaxy.png", note:"A barred spiral galaxy containing hundreds of billions of stars." },
  { name:"Constellations", tag:"SKY MAP", value:"88", unit:"official regions", image:"/object-constellation.png", note:"Recognised patterns that divide the entire celestial sphere." },
  { name:"Satellites", tag:"LOW EARTH ORBIT", value:"11.7K+", unit:"active spacecraft", image:"/object-satellite.png", note:"Working machines observing, connecting and mapping our planet." },
];

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const range = Math.max(1, el.offsetHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -el.getBoundingClientRect().top / range)));
    };
    update(); window.addEventListener("scroll", update, { passive:true }); window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [ref]);
  return progress;
}

function Planet({ planet, index }: { planet: typeof planets[number]; index:number }) {
  return <article className="planet-card">
    <span className="planet-index">{String(index + 1).padStart(2,"0")} / 08</span>
    <img className="planet-image" src={planet.image} alt={`Photorealistic 3D render of ${planet.name}`} style={{ "--planet-size":`${planet.size}px` } as React.CSSProperties}/>
    <div className="planet-copy"><p>SOLAR SYSTEM</p><h3>{planet.name}</h3><span>{planet.fact}</span>
      <dl><div><dt>MEAN TEMPERATURE</dt><dd>{planet.temp}</dd></div><div><dt>ORBITAL PERIOD</dt><dd>{planet.orbit}</dd></div></dl>
    </div>
  </article>;
}

export default function Home() {
  const heroRef=useRef<HTMLElement>(null), planetsRef=useRef<HTMLElement>(null);
  const hero=useScrollProgress(heroRef), pan=useScrollProgress(planetsRef);
  const [sound,setSound]=useState(false), [guideOpen,setGuideOpen]=useState(true), [active,setActive]=useState(0);
  const stage=hero < .27 ? 0 : hero < .57 ? 1 : 2;
  const stageCopy=[{small:"CLEARING EARTH'S ATMOSPHERE",large:"ASCENT"},{small:"384,400 KM FROM HOME",large:"LUNAR ORBIT"},{small:"TRAJECTORY CONFIRMED",large:"DEEP SPACE"}][stage];
  return <main>
    <header className="topbar"><a className="brand" href="#top" aria-label="Cosmos AR home"><span className="brand-mark">C</span>COSMOS <b>/ AR</b></a>
      <nav aria-label="Primary navigation"><a href="#planets">Planets</a><a href="#deep-space">Deep space</a><a href="#signals">Orbit data</a></nav>
      <button className="sound" onClick={()=>setSound(!sound)} aria-pressed={sound}><i>{sound?"●":"○"}</i> SOUND {sound?"ON":"OFF"}</button>
    </header>

    <section id="top" className="hero-scroll" ref={heroRef}><div className="hero-sticky">
      <img className="hero-image" src="/hero-space.png" alt="An astronaut standing on the lunar surface" style={{transform:`scale(${1+hero*.42}) translate3d(${-hero*3}%,${hero*3}%,0)`}}/>
      <div className="space-vignette"/><div className="scan-grid" style={{opacity:.1+hero*.25}}/><div className="hud-corners"><span/><span/><span/><span/></div>
      <div className="hero-copy" style={{opacity:1-Math.min(1,hero*2.8),transform:`translateY(${-hero*90}px)`}}><p className="eyebrow"><i/>INTERSTELLAR FIELD GUIDE · 2026</p>
        <h1>Step beyond<br/><span>the known.</span></h1>
        <div className="hero-bottom"><p>Scroll to begin<br/>the journey.</p><span className="scroll-cue"><i/></span><b>SEOUL / 37.56°N<br/>LIVE TELEMETRY</b></div>
      </div>
      <div className={`story-line story-${stage}`}><p>{stageCopy.small}</p><strong>{stageCopy.large}</strong></div>
      <div className="altimeter"><span>ALTITUDE</span><b>{Math.round(384400*hero).toLocaleString()}</b><small>KM</small></div><div className="hero-progress"><span style={{height:`${hero*100}%`}}/></div>
    </div></section>

    <section id="planets" className="planet-scroll" ref={planetsRef}><div className="planet-sticky">
      <div className="section-head"><p className="eyebrow"><i/>SOLAR SYSTEM / 01—08</p><h2>Eight worlds.<br/><span>One system.</span></h2><small>SCROLL TO TRAVEL →</small></div><div className="orbit-line"/>
      <div className="planet-track" style={{transform:`translate3d(calc(6vw - ${pan*685}vw),0,0)`}}>{planets.map((p,i)=><Planet key={p.name} planet={p} index={i}/>)}</div>
      <div className="pan-progress"><span style={{width:`${pan*100}%`}}/></div>
    </div></section>

    <section id="deep-space" className="deep-space"><div className="deep-title"><p className="eyebrow"><i/>BEYOND THE PLANETS</p><h2>Explore what lives<br/><span>between the light.</span></h2><p className="deep-intro">A closer look at the objects, structures and machines that define our place in space.</p></div>
      <div className="object-grid" id="signals">{objects.map((item,i)=><button key={item.name} className={active===i?"active":""} onClick={()=>setActive(i)}>
        <img src={item.image} alt={`Photorealistic 3D view of ${item.name}`}/><span className="object-shade"/><div className="object-meta"><small>{String(i+1).padStart(2,"0")} / {item.tag}</small><h3>{item.name}</h3><p>{item.note}</p><b>{item.value}<em>{item.unit}</em></b></div><i>↗</i>
      </button>)}</div>
      <aside className="signal-detail"><span>LIVE OBJECT</span><b>{objects[active].name}</b><p>Telemetry received · Signal strength 98.7%</p><div><i/></div></aside>
    </section>

    <section className="finale"><div className="final-orbit"><span/><span/><span/></div><img src="/astronaut.png" alt="Mio, the astronaut field guide"/><div><p className="eyebrow"><i/>MISSION COMPLETE</p><h2>The next discovery<br/>starts <span>with you.</span></h2><a href="#top">Restart journey <span>↑</span></a></div></section>
    <button className={`mascot-guide ${guideOpen?"open":""}`} onClick={()=>setGuideOpen(!guideOpen)} aria-label="Open Mio's field guide"><img src="/astronaut.png" alt=""/>{guideOpen&&<span><b>Hi, I’m Mio.</b>Take it slowly. The view changes as you scroll.<i>×</i></span>}</button>
    <footer><a className="brand" href="#top"><span className="brand-mark">C</span>COSMOS <b>/ AR</b></a><p>A FIELD GUIDE TO THE OBSERVABLE UNIVERSE.</p><small>© 2026 COSMOS AR LAB</small></footer>
  </main>;
}
