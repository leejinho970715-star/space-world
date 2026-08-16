"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const planets = [
  { name:"Mercury", fact:"A cratered world shaped by extreme heat and cold.", temp:"167°C", orbit:"88 days", image:"/planet-mercury-transparent.png", size:240 },
  { name:"Venus", fact:"A dense atmosphere hides the hottest surface in the Solar System.", temp:"464°C", orbit:"225 days", image:"/planet-venus-transparent.png", size:270 },
  { name:"Earth", fact:"The only world known to hold liquid oceans and life.", temp:"15°C", orbit:"365 days", image:"/planet-earth-transparent.png", size:290 },
  { name:"Mars", fact:"A cold desert preserving the record of an ancient, wetter past.", temp:"−63°C", orbit:"687 days", image:"/planet-mars-transparent.png", size:260 },
  { name:"Jupiter", fact:"A gas giant whose storms have lasted for centuries.", temp:"−110°C", orbit:"11.9 years", image:"/planet-jupiter-transparent.png", size:390 },
  { name:"Saturn", fact:"An immense ring system built from ice, rock and dust.", temp:"−140°C", orbit:"29.5 years", image:"/planet-saturn-transparent.png", size:430 },
  { name:"Uranus", fact:"An ice giant rotating almost completely on its side.", temp:"−195°C", orbit:"84 years", image:"/planet-uranus-transparent.png", size:300 },
  { name:"Neptune", fact:"The outermost planet, driven by supersonic winds.", temp:"−200°C", orbit:"164.8 years", image:"/planet-neptune-transparent.png", size:300 },
];

const objects = [
  { name:"Asteroids", tag:"NEAR-EARTH OBJECTS", value:"1.3M+", unit:"catalogued bodies", image:"/object-asteroid-transparent.png", note:"Rocky remnants from the formation of the Solar System." },
  { name:"The Milky Way", tag:"HOME GALAXY", value:"100K", unit:"light-years wide", image:"/object-galaxy-transparent.png", note:"A barred spiral galaxy containing hundreds of billions of stars." },
  { name:"Constellations", tag:"SKY MAP", value:"88", unit:"official regions", image:"/object-constellation-transparent.png", note:"Recognised patterns that divide the entire celestial sphere." },
  { name:"Satellites", tag:"LOW EARTH ORBIT", value:"11.7K+", unit:"active spacecraft", image:"/object-satellite-transparent.png", note:"Working machines observing, connecting and mapping our planet." },
];

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
  const root=useRef<HTMLElement>(null);
  const [sound,setSound]=useState(false), [guideOpen,setGuideOpen]=useState(true), [active,setActive]=useState(0);
  useLayoutEffect(()=>{gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{
    gsap.to(".hero-image",{scale:1.42,xPercent:-3,yPercent:3,ease:"none",scrollTrigger:{trigger:".hero-scroll",start:"top top",end:"bottom bottom",scrub:1}});
    gsap.to(".hero-copy",{y:-90,opacity:0,ease:"none",scrollTrigger:{trigger:".hero-scroll",start:"top top",end:"28% top",scrub:1}});
    gsap.fromTo(".story-line",{opacity:0,y:30},{opacity:1,y:0,scrollTrigger:{trigger:".hero-scroll",start:"22% top",end:"70% top",scrub:1}});
    gsap.to(".planet-track",{xPercent:-88,ease:"none",scrollTrigger:{trigger:".planet-scroll",start:"top top",end:"bottom bottom",scrub:1}});
    gsap.to(".pan-progress span",{width:"100%",ease:"none",scrollTrigger:{trigger:".planet-scroll",start:"top top",end:"bottom bottom",scrub:1}});
    gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach(el=>gsap.from(el,{y:80,opacity:0,duration:1.1,scrollTrigger:{trigger:el,start:"top 82%"}}));
    gsap.utils.toArray<HTMLElement>(".space-asset").forEach((el,i)=>gsap.to(el,{rotation:i%2?18:-18,y:i%2?-45:45,ease:"none",scrollTrigger:{trigger:el,start:"top bottom",end:"bottom top",scrub:1.2}}));
    gsap.utils.toArray<HTMLElement>(".planet-image").forEach((el,i)=>{gsap.to(el,{rotation:i%2?32:-32,ease:"none",scrollTrigger:{trigger:".planet-scroll",start:"top top",end:"bottom bottom",scrub:1}});const enter=()=>gsap.to(el,{scale:1.1,duration:.6,ease:"power3.out"});const leave=()=>gsap.to(el,{scale:1,duration:.6,ease:"power3.out"});el.addEventListener("mouseenter",enter);el.addEventListener("mouseleave",leave)});
  },root);return()=>ctx.revert()},[]);
  const hover=(e:React.MouseEvent<HTMLElement>,enter:boolean)=>gsap.to(e.currentTarget.querySelector("img"),{rotation:enter?8:0,scale:enter?1.08:1,duration:.7,ease:"power3.out"});
  return <main ref={root}>
    <header className="topbar"><a className="brand" href="#top" aria-label="Cosmos AR home"><span className="brand-mark">C</span>COSMOS <b>/ AR</b></a>
      <nav aria-label="Primary navigation"><a href="/planets">Planets</a><a href="/deep-space">Deep space</a><a href="/orbit-data">Orbit data</a></nav>
      <button className="sound" onClick={()=>setSound(!sound)} aria-pressed={sound}><i>{sound?"●":"○"}</i> SOUND {sound?"ON":"OFF"}</button>
    </header>

    <section id="top" className="hero-scroll"><div className="hero-sticky">
      <img className="hero-image" src="/hero-space.png" alt="An astronaut standing on the lunar surface"/>
      <div className="space-vignette"/><div className="scan-grid"/><div className="hud-corners"><span/><span/><span/><span/></div>
      <div className="hero-copy"><p className="eyebrow"><i/>INTERSTELLAR FIELD GUIDE · 2026</p>
        <h1>Step beyond<br/><span>the known.</span></h1>
        <div className="hero-bottom"><p>Scroll to begin<br/>the journey.</p><span className="scroll-cue"><i/></span><b>SEOUL / 37.56°N<br/>LIVE TELEMETRY</b></div>
      </div>
      <div className="story-line"><p>TRAJECTORY CONFIRMED</p><strong>DEEP SPACE</strong></div>
      <div className="altimeter"><span>DESTINATION</span><b>384,400</b><small>KM</small></div>
    </div></section>

    <section id="planets" className="planet-scroll"><div className="planet-sticky">
      <div className="section-head"><p className="eyebrow"><i/>SOLAR SYSTEM / 01—08</p><h2>Eight worlds.<br/><span>One system.</span></h2><small>SCROLL TO TRAVEL →</small></div><div className="orbit-line"/>
      <div className="planet-track">{planets.map((p,i)=><Planet key={p.name} planet={p} index={i}/>)}</div><div className="pan-progress"><span/></div>
    </div></section>

    <section id="deep-space" className="deep-space"><div className="deep-title gsap-reveal"><p className="eyebrow"><i/>BEYOND THE PLANETS</p><h2>Explore what lives<br/><span>between the light.</span></h2><p className="deep-intro">A closer look at the objects, structures and machines that define our place in space.</p></div>
      <div className="object-grid" id="signals">{objects.map((item,i)=><button key={item.name} className={active===i?"active":""} onClick={()=>setActive(i)} onMouseEnter={e=>hover(e,true)} onMouseLeave={e=>hover(e,false)}>
        <img className="space-asset" src={item.image} alt={`Photorealistic 3D view of ${item.name}`}/><span className="object-shade"/><div className="object-meta"><small>{String(i+1).padStart(2,"0")} / {item.tag}</small><h3>{item.name}</h3><p>{item.note}</p><b>{item.value}<em>{item.unit}</em></b></div><i>↗</i>
      </button>)}</div>
      <aside className="signal-detail"><span>LIVE OBJECT</span><b>{objects[active].name}</b><p>Telemetry received · Signal strength 98.7%</p><div><i/></div></aside>
    </section>

    <section className="finale"><div className="final-orbit"><span/><span/><span/></div><img src="/astronaut.png" alt="Mio, the astronaut field guide"/><div><p className="eyebrow"><i/>MISSION COMPLETE</p><h2>The next discovery<br/>starts <span>with you.</span></h2><a href="#top">Restart journey <span>↑</span></a></div></section>
    <button className={`mascot-guide ${guideOpen?"open":""}`} onClick={()=>setGuideOpen(!guideOpen)} aria-label="Open Mio's field guide"><img src="/astronaut.png" alt=""/>{guideOpen&&<span><b>Hi, I’m Mio.</b>Take it slowly. The view changes as you scroll.<i>×</i></span>}</button>
    <footer><a className="brand" href="#top"><span className="brand-mark">C</span>COSMOS <b>/ AR</b></a><p>A FIELD GUIDE TO THE OBSERVABLE UNIVERSE.</p><small>© 2026 COSMOS AR LAB</small></footer>
  </main>;
}
