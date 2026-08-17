"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Navigation from "./components/Navigation";
import { animateContent } from "./components/contentMotion";

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
  { name:"Asteroids", tag:"NEAR-EARTH OBJECTS", value:"1.3M+", unit:"catalogued bodies", image:"/object-asteroid-transparent.png", note:"Rocky remnants from the formation of the Solar System.", href:"/deep-space" },
  { name:"The Milky Way", tag:"HOME GALAXY", value:"100K", unit:"light-years wide", image:"/object-galaxy-transparent.png", note:"A barred spiral galaxy containing hundreds of billions of stars.", href:"/deep-space" },
  { name:"Constellations", tag:"SKY MAP", value:"88", unit:"official regions", image:"/object-constellation-transparent.png", note:"Recognised patterns that divide the entire celestial sphere.", href:"/deep-space" },
  { name:"Satellites", tag:"LOW EARTH ORBIT", value:"11.7K+", unit:"active spacecraft", image:"/object-satellite-transparent.png", note:"Working machines observing, connecting and mapping our planet.", href:"/orbit-data" },
];
const asteroidNames=["Ceres","Vesta","Pallas","Hygiea"];
const constellations=["Orion","Ursa Major","Cassiopeia","Scorpius","Leo"];
const satelliteData=[
 {name:"ISS",mission:"Orbital research laboratory",alt:"408 km",speed:"7.66 km/s",image:"/satellite-station-transparent.png"},
 {name:"Hubble",mission:"Deep-space observatory",alt:"525 km",speed:"7.59 km/s",image:"/satellite-telescope-transparent.png"},
 {name:"GPS III",mission:"Positioning and timing",alt:"20,200 km",speed:"3.87 km/s",image:"/object-satellite-transparent.png"},
 {name:"Sentinel-2",mission:"Multispectral Earth imaging",alt:"786 km",speed:"7.46 km/s",image:"/satellite-sentinel2-transparent.png"},
 {name:"Landsat 9",mission:"Long-term land observation",alt:"705 km",speed:"7.50 km/s",image:"/satellite-earth-observer-transparent.png"},
 {name:"GOES-19",mission:"Geostationary weather watch",alt:"35,786 km",speed:"3.07 km/s",image:"/satellite-goes19-transparent.png"},
 {name:"James Webb",mission:"Infrared deep-space observatory",alt:"1.5M km",speed:"0.47 km/s",image:"/satellite-infrared-transparent.png"},
 {name:"Starlink",mission:"Low-latency communications",alt:"550 km",speed:"7.58 km/s",image:"/satellite-earth-observer-transparent.png"},
];
const orbitPositions=[[12,22],[75,20],[80,63],[14,66],[45,12],[87,43],[43,74],[10,44]];
const observingWeather=[
 {icon:"/weather-icons-3d/cloud.png",label:"CLOUD COVER",value:"18%",status:"Clear windows"},
 {icon:"/weather-icons-3d/seeing.png",label:"SEEING",value:"1.2″",status:"Stable air"},
 {icon:"/weather-icons-3d/transparency.png",label:"TRANSPARENCY",value:"Good",status:"Low haze"},
 {icon:"/weather-icons-3d/wind.png",label:"WIND",value:"6 km/h",status:"Light NW"},
 {icon:"/weather-icons-3d/humidity.png",label:"HUMIDITY",value:"42%",status:"Low dew risk"},
 {icon:"/weather-icons-3d/moonlight.png",label:"MOONLIGHT",value:"24%",status:"Waning crescent"},
 {icon:"/weather-icons-3d/aurora.png",label:"AURORA Kp",value:"2",status:"Quiet field"},
 {icon:"/weather-icons-3d/dewpoint.png",label:"DEW POINT",value:"3°C",status:"Safe margin"},
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
  const [guideOpen,setGuideOpen]=useState(true), [active,setActive]=useState(0);
  const [activeConstellation,setActiveConstellation]=useState(0),[activeSatellite,setActiveSatellite]=useState(0);
  const [chatInput,setChatInput]=useState(""),[chatMessages,setChatMessages]=useState([{from:"mio",text:"Hi, I’m Mio. Ask me anything about this journey."}]);
  useLayoutEffect(()=>{gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{
    const heroTimeline=gsap.timeline({scrollTrigger:{trigger:".hero-scroll",start:"top top",end:()=>`+=${Math.max(1800,window.innerHeight*3.2)}`,scrub:1,pin:".hero-sticky",pinSpacing:true,anticipatePin:1,invalidateOnRefresh:true}});
    heroTimeline.fromTo(".hero-image",{opacity:0,scale:1.16},{opacity:1,scale:1.03,duration:1,ease:"power2.out"})
      .from(".hero-copy>.eyebrow",{opacity:0,y:24,duration:.5},">-.05")
      .from(".hero-line",{opacity:0,y:55,duration:.7,stagger:.42,ease:"power3.out"},">")
      .from(".hero-bottom",{opacity:0,y:30,duration:.55},">")
      .from(".hud-corners span",{opacity:0,scale:.55,duration:.45,stagger:.1},">")
      .from(".altimeter",{opacity:0,x:28,duration:.5},">")
      .to(".hero-copy",{opacity:.12,y:-55,duration:.65},"+=.35")
      .fromTo(".story-line",{opacity:0,y:35,scale:.92},{opacity:1,y:0,scale:1,duration:.8,ease:"power3.out"},">-.05");
    const planetTrack=document.querySelector<HTMLElement>(".planet-track");
    const planetDistance=()=>planetTrack?Math.max(0,planetTrack.scrollWidth-window.innerWidth):0;
    if(planetTrack) gsap.to(planetTrack,{x:()=>-planetDistance(),ease:"none",scrollTrigger:{trigger:".planet-scroll",start:"top top",end:()=>`+=${planetDistance()}`,scrub:1,pin:".planet-sticky",pinSpacing:true,anticipatePin:1,invalidateOnRefresh:true}});
    gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach(el=>gsap.from(el,{y:80,opacity:0,duration:1.1,scrollTrigger:{trigger:el,start:"top 82%"}}));
    gsap.utils.toArray<HTMLElement>(".space-asset").forEach((el,i)=>gsap.to(el,{rotation:i%2?18:-18,y:i%2?-45:45,ease:"none",scrollTrigger:{trigger:el,start:"top bottom",end:"bottom top",scrub:1.2}}));
    gsap.utils.toArray<HTMLElement>(".planet-image").forEach((el,i)=>{gsap.to(el,{rotation:i%2?32:-32,ease:"none",scrollTrigger:{trigger:".planet-scroll",start:"top top",end:()=>`+=${planetDistance()}`,scrub:1}});const enter=()=>gsap.to(el,{scale:1.1,duration:.6,ease:"power3.out"});const leave=()=>gsap.to(el,{scale:1,duration:.6,ease:"power3.out"});el.addEventListener("mouseenter",enter);el.addEventListener("mouseleave",leave)});
    gsap.utils.toArray<HTMLElement>(".asteroid-layer").forEach((el,i)=>gsap.to(el,{xPercent:i%2?28:-22,yPercent:i*8-8,rotation:i%2?70:-55,ease:"none",scrollTrigger:{trigger:".asteroid-belt",start:"top bottom",end:"bottom top",scrub:1+i*.25}}));
    gsap.fromTo(".galaxy-core",{scale:.18,opacity:.3},{scale:1.2,opacity:1,ease:"none",scrollTrigger:{trigger:".galaxy-explorer",start:"top top",end:"bottom bottom",scrub:1}});
    gsap.to(".galaxy-core",{xPercent:2,rotation:3,duration:9,repeat:-1,yoyo:true,ease:"sine.inOut"});
    gsap.to(".constellation-stage",{x:10,y:-14,duration:6,repeat:-1,yoyo:true,ease:"sine.inOut"});
    gsap.to(".constellation-stage img",{opacity:.76,duration:2.8,repeat:-1,yoyo:true,ease:"sine.inOut"});
    gsap.utils.toArray<HTMLElement>(".weather-icon img").forEach((icon,i)=>gsap.to(icon,{y:i%2?-7:7,rotation:i%2?5:-5,duration:2.8+i*.18,repeat:-1,yoyo:true,ease:"sine.inOut"}));
    gsap.to(".belt-mascot",{x:-34,y:-24,rotation:-9,duration:4.8,repeat:-1,yoyo:true,ease:"sine.inOut"});
    gsap.to(".constellation-mascot",{x:14,y:-20,rotation:6,duration:4.2,repeat:-1,yoyo:true,ease:"sine.inOut"});
    gsap.to(".finale-mascot",{y:-24,x:10,rotation:3.5,duration:3.6,repeat:-1,yoyo:true,ease:"sine.inOut"});
    gsap.fromTo(".finale-mascot-wrap",{xPercent:18,yPercent:12,rotation:7},{xPercent:-5,yPercent:-5,rotation:-4,ease:"none",scrollTrigger:{trigger:".finale",start:"top bottom",end:"bottom bottom",scrub:1.2}});
    gsap.to(".mini-system",{rotation:120,ease:"none",scrollTrigger:{trigger:".finale",start:"top bottom",end:"bottom bottom",scrub:1.2}});
    gsap.utils.toArray<HTMLElement>(".guide-transition").forEach((section)=>{const astronaut=section.querySelector(".transition-astronaut"),copy=section.querySelector(".transition-copy"),progress=section.querySelector(".transition-progress i"),dial=section.querySelector(".transition-orbit-dial"),stars=section.querySelectorAll(".transition-star");const tl=gsap.timeline({scrollTrigger:{trigger:section,start:"top top",end:"bottom bottom",scrub:1}});tl.fromTo(astronaut,{xPercent:68,yPercent:18,rotation:11,opacity:0},{xPercent:0,yPercent:0,rotation:0,opacity:1,duration:.34,ease:"power2.out"},0).fromTo(copy,{y:40,opacity:0},{y:0,opacity:1,duration:.24},.08).fromTo(stars,{scale:0,opacity:0},{scale:1,opacity:1,duration:.42,stagger:.035,ease:"back.out(1.8)"},.12).fromTo(dial,{scale:.65,rotation:-45,opacity:0},{scale:1.08,rotation:35,opacity:.7,duration:.78,ease:"none"},.08).fromTo(progress,{scaleX:0},{scaleX:1,duration:1,ease:"none"},0).to(copy,{y:-25,opacity:0,duration:.18},.8).to(stars,{y:-28,opacity:.18,duration:.24,stagger:.02},.74).to(astronaut,{xPercent:-105,yPercent:-12,rotation:-7,opacity:.12,duration:.3,ease:"power1.in"},.72)});
    gsap.to(".orbit-earth",{rotation:70,ease:"none",scrollTrigger:{trigger:".satellite-orbit",start:"top bottom",end:"bottom top",scrub:1.2}});
    gsap.utils.toArray<HTMLElement>(".journey-step").forEach((el,i)=>gsap.from(el,{y:45,opacity:0,duration:.7,delay:i*.05,scrollTrigger:{trigger:el,start:"top 88%"}}));
    const chapterHolds=[
      {selector:".asteroid-belt",distance:1.45},
      {selector:".constellation-explorer",distance:1.65},
      {selector:".satellite-orbit",distance:1.65},
      {selector:".finale",distance:1.35},
    ];
    chapterHolds.forEach(({selector,distance})=>{const section=document.querySelector<HTMLElement>(selector);if(section)ScrollTrigger.create({trigger:section,start:"top top",end:()=>`+=${Math.round(window.innerHeight*distance)}`,pin:true,pinSpacing:true,anticipatePin:1,invalidateOnRefresh:true})});
    animateContent(root.current!);
  },root);return()=>ctx.revert()},[]);
  const hover=(e:React.MouseEvent<HTMLElement>,enter:boolean)=>gsap.to(e.currentTarget.querySelector("img"),{rotation:enter?8:0,scale:enter?1.08:1,duration:.7,ease:"power3.out"});
  const askMio=(question:string)=>{const q=question.trim();if(!q)return;const lower=q.toLowerCase();let answer="Try asking me about planets, galaxies, constellations, satellites, asteroids, or observing conditions.";if(lower.includes("planet"))answer="Eight planets orbit our Sun. Open the Planets chapter to compare their temperatures, sizes, and orbital periods.";else if(lower.includes("galaxy")||lower.includes("milky"))answer="The Milky Way is a barred spiral galaxy roughly 100,000 light-years wide. Our Solar System sits in the Orion Arm.";else if(lower.includes("satellite")||lower.includes("orbit"))answer="Space World tracks research, weather, navigation, and communications satellites across several orbital regions.";else if(lower.includes("constellation"))answer="Constellations are 88 officially recognised regions that help us map and navigate the night sky.";else if(lower.includes("asteroid"))answer="Asteroids are rocky remnants of Solar System formation. Most orbit between Mars and Jupiter.";else if(lower.includes("weather")||lower.includes("observe"))answer="For clearer observing, look for low cloud cover, stable seeing, good transparency, light wind, and limited moonlight.";setChatMessages(messages=>[...messages,{from:"user",text:q},{from:"mio",text:answer}]);setChatInput("");};
  return <main ref={root}>
    <header className="topbar"><a className="brand" href="#top" aria-label="Space World home"><img className="brand-logo" src="/logo-cosmos.png" alt=""/>SPACE <b>WORLD</b></a>
      <Navigation/>
    </header>

    <section id="top" className="hero-scroll"><div className="hero-sticky">
      <img className="hero-image" src="/hero-space.png" alt="An astronaut standing on the lunar surface"/>
      <div className="space-vignette"/><div className="scan-grid"/><div className="hud-corners"><span/><span/><span/><span/></div>
      <div className="hero-copy"><p className="eyebrow"><i/>INTERSTELLAR FIELD GUIDE · 2026</p>
        <h1><span className="hero-line">Step beyond</span><span className="hero-line accent">the known.</span></h1>
        <div className="hero-bottom"><p>Scroll to begin<br/>the journey.</p><span className="scroll-cue"><i/></span><b>SEOUL / 37.56°N<br/>LIVE TELEMETRY</b></div>
      </div>
      <div className="story-line"><p>TRAJECTORY CONFIRMED</p><strong>DEEP SPACE</strong></div>
      <div className="altimeter"><span>DESTINATION</span><b>384,400</b><small>KM</small></div>
    </div></section>

    <section className="observing-weather gsap-reveal" aria-labelledby="weather-title"><div className="weather-heading"><p className="eyebrow"><i/>OBSERVATION CONDITIONS</p><h2 id="weather-title">Before you look up.</h2><p>Eight atmospheric and sky conditions that determine what a telescope can resolve. Sample session data for the Seoul observing field.</p></div><div className="weather-grid">{observingWeather.map(item=><article key={item.label}><span className="weather-icon" aria-hidden="true"><img src={item.icon} alt=""/></span><small>{item.label}</small><strong>{item.value}</strong><p>{item.status}</p></article>)}</div><div className="weather-verdict"><span>SESSION OUTLOOK</span><b>GOOD FOR DEEP-SKY OBSERVATION</b><i>Updated 22:30 KST · Sample telemetry</i></div></section>

    <section className="guide-transition" aria-label="Mio welcomes you to the asteroid belt"><div className="guide-transition-sticky"><div className="transition-copy"><p className="eyebrow"><i/>MIO / FLIGHT GUIDE</p><h2>Ready for the<br/><span>next frontier?</span></h2><p>Stay with me. We are entering a field of ancient worlds.</p></div><div className="transition-field" aria-hidden="true">{[0,1,2,3,4,5].map(i=><span className={`transition-star star-${i}`} key={i}/>)}</div><span className="transition-orbit-dial" aria-hidden="true"><i/><i/></span><img className="transition-astronaut" src="/astronaut.png" alt="Mio welcoming you"/><span className="transition-destination">NEXT · ASTEROID BELT</span><span className="transition-progress"><i/></span></div></section>

    <section className="asteroid-belt" id="asteroids"><div className="belt-copy gsap-reveal"><p className="eyebrow"><i/>REGION 02 · ASTEROID BELT</p><h2>Through the<br/><span>ancient debris.</span></h2><p>Fragments left behind 4.6 billion years ago move on separate planes and at separate speeds.</p></div>
      {[0,1,2].map(layer=><div className={`asteroid-layer layer-${layer}`} key={layer}>{[0,1,2,3].map((_,i)=><img key={i} src="/object-asteroid-transparent.png" alt="" style={{left:`${8+i*27-(layer*4)}%`,top:`${14+((i+layer)%3)*27}%`,width:`${130+layer*70}px`}}/>)}</div>)}
      <div className="asteroid-index">{asteroidNames.map((name,i)=><Link href="/deep-space" key={name} aria-label={`Explore ${name}`}><span>0{i+1}</span><b>{name}</b><small>{i===0?"Dwarf planet":i===1?"Brightest asteroid":i===2?"High-inclination orbit":"Carbon-rich body"}</small></Link>)}</div>
      <img className="belt-mascot" src="/astronaut-flight.png" alt="Mio flying through the asteroid belt"/>
    </section>

    <section className="galaxy-explorer"><div className="galaxy-sticky"><div className="galaxy-copy"><p className="eyebrow"><i/>SCALE TRANSITION</p><h2>One system.<br/><span>A much larger home.</span></h2><div><span>SOLAR SYSTEM</span><span>MILKY WAY</span><span>LOCAL GROUP</span></div></div><img className="galaxy-core" src="/object-galaxy-transparent.png" alt="The Milky Way galaxy"/><span className="solar-marker"><i/>YOU ARE HERE</span><dl><div><dt>DIAMETER</dt><dd>100,000 light-years</dd></div><div><dt>ESTIMATED STARS</dt><dd>100–400 billion</dd></div></dl></div></section>

    <section className="constellation-explorer"><div className="constellation-copy gsap-reveal"><p className="eyebrow"><i/>CELESTIAL NAVIGATION</p><h2>Connect the<br/><span>night sky.</span></h2><p>Choose a constellation to redraw the pattern from our point of view on Earth.</p></div><div className="constellation-stage"><img key={activeConstellation} src="/object-constellation-transparent.png" alt={`${constellations[activeConstellation]} constellation`} style={{transform:`rotate(${activeConstellation*34}deg) scale(${1-activeConstellation*.035})`}}/><span className="constellation-name">{constellations[activeConstellation]}</span></div><div className="constellation-menu">{constellations.map((name,i)=><button className={activeConstellation===i?"active":""} key={name} onClick={()=>setActiveConstellation(i)}><span>0{i+1}</span>{name}</button>)}</div><img className="constellation-mascot" src="/astronaut-guide.png" alt="Mio pointing toward the constellations"/></section>

    <section className="guide-transition transition-orbit" aria-label="Mio guides you toward Earth orbit"><div className="guide-transition-sticky"><div className="transition-copy"><p className="eyebrow"><i/>MIO / ORBIT APPROACH</p><h2>Look alive.<br/><span>Orbit is busy.</span></h2><p>Follow my trajectory and meet the machines circling Earth.</p></div><div className="transition-field" aria-hidden="true">{[0,1,2,3,4,5].map(i=><span className={`transition-star star-${i}`} key={i}/>)}</div><span className="transition-orbit-dial" aria-hidden="true"><i/><i/></span><img className="transition-astronaut" src="/astronaut-flight.png" alt="Mio flying toward Earth orbit"/><span className="transition-destination">NEXT · SATELLITE NETWORK</span><span className="transition-progress"><i/></span></div></section>

    <section className="satellite-orbit"><div className="satellite-copy gsap-reveal"><p className="eyebrow"><i/>EARTH ORBIT · NETWORK</p><h2>Machines that<br/><span>never stand still.</span></h2><p>{satelliteData[activeSatellite].mission}</p><dl><div><dt>ALTITUDE</dt><dd>{satelliteData[activeSatellite].alt}</dd></div><div><dt>ORBITAL SPEED</dt><dd>{satelliteData[activeSatellite].speed}</dd></div></dl><div className="satellite-roster">{satelliteData.map((sat,i)=><button key={sat.name} className={activeSatellite===i?"active":""} onClick={()=>setActiveSatellite(i)}>{String(i+1).padStart(2,"0")} <b>{sat.name}</b></button>)}</div></div><div className="orbit-stage"><span className="orbit-ring ring-one"/><span className="orbit-ring ring-two"/><img className="orbit-earth" src="/planet-earth-transparent.png" alt="Rotating Earth"/>{satelliteData.map((sat,i)=><button key={sat.name} style={{left:`${orbitPositions[i][0]}%`,top:`${orbitPositions[i][1]}%`}} className={`orbiting-satellite ${activeSatellite===i?"active":""}`} onClick={()=>setActiveSatellite(i)} aria-label={`Show ${sat.name}`}><img src={sat.image} alt=""/><span>{sat.name}</span></button>)}</div></section>

    <section id="planets" className="planet-scroll"><div className="planet-sticky">
      <div className="section-head"><p className="eyebrow"><i/>SOLAR SYSTEM / 01—08</p><h2>Eight worlds.<br/><span>One system.</span></h2><small>SCROLL TO TRAVEL →</small></div><div className="orbit-line"/>
      <div className="planet-track">{planets.map((p,i)=><Planet key={p.name} planet={p} index={i}/>)}</div>
    </div></section>

    <section id="deep-space" className="deep-space"><div className="deep-title gsap-reveal"><p className="eyebrow"><i/>BEYOND THE PLANETS</p><h2>Explore what lives<br/><span>between the light.</span></h2><p className="deep-intro">A closer look at the objects, structures and machines that define our place in space.</p></div>
      <div className="object-grid" id="signals">{objects.map((item,i)=><Link href={item.href} key={item.name} className={active===i?"active":""} onClick={()=>setActive(i)} onMouseEnter={e=>hover(e,true)} onMouseLeave={e=>hover(e,false)} aria-label={`Explore ${item.name}`}>
        <img className="space-asset" src={item.image} alt={`Photorealistic 3D view of ${item.name}`}/><span className="object-shade"/><div className="object-meta"><small>{String(i+1).padStart(2,"0")} / {item.tag}</small><h3>{item.name}</h3><p>{item.note}</p><b>{item.value}<em>{item.unit}</em></b></div><i>↗</i>
      </Link>)}</div>
      <aside className="signal-detail"><span>LIVE OBJECT</span><b>{objects[active].name}</b><p>Telemetry received · Signal strength 98.7%</p><div><i/></div></aside>
    </section>

    <section className="journey-log"><p className="eyebrow"><i/>YOUR FLIGHT LOG</p><div>{["Earth","Planets","Asteroids","Galaxy","Constellations","Satellites"].map((step,i)=><span className="journey-step" key={step}><b>0{i+1}</b>{step}<i>→</i></span>)}</div></section>
    <section className="finale"><div className="final-orbit mini-system" aria-hidden="true"><img className="mini-sun" src="/sun-3d-transparent.png" alt=""/><span className="mini-orbit orbit-a"><img src="/planet-mercury-transparent.png" alt=""/></span><span className="mini-orbit orbit-b"><img src="/planet-earth-transparent.png" alt=""/></span><span className="mini-orbit orbit-c"><img src="/planet-mars-transparent.png" alt=""/></span><span className="mini-orbit orbit-d"><img src="/planet-neptune-transparent.png" alt=""/></span></div><div className="finale-mascot-wrap"><img className="finale-mascot" src="/astronaut-complete.png" alt="Mio celebrating the completed journey"/></div><div><p className="eyebrow"><i/>EXPLORATION COMPLETE</p><h2>You crossed<br/><span>the known universe.</span></h2><div className="final-actions"><a href="#top">Explore again <span>↑</span></a><a href="/orbit-data">My space <span>→</span></a></div></div></section>
    <aside className={`mascot-guide ${guideOpen?"open":""}`}><button className="mascot-trigger" onClick={()=>setGuideOpen(!guideOpen)} aria-label={guideOpen?"Close Mio chatbot":"Open Mio chatbot"}><img src="/astronaut.png" alt=""/></button>{guideOpen&&<div className="mio-chat"><button className="chat-close" onClick={()=>setGuideOpen(false)} aria-label="Close chatbot">×</button><b>MIO / SPACE GUIDE</b><div className="chat-log" aria-live="polite">{chatMessages.map((message,i)=><p className={message.from} key={i}>{message.text}</p>)}</div><div className="chat-suggestions"><button onClick={()=>askMio("Tell me about planets")}>Planets</button><button onClick={()=>askMio("How is observing weather?")}>Weather</button><button onClick={()=>askMio("Tell me about satellites")}>Satellites</button></div><form onSubmit={e=>{e.preventDefault();askMio(chatInput)}}><input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Ask Mio about space…" aria-label="Message Mio"/><button type="submit" aria-label="Send message">→</button></form></div>}</aside>
    <footer><a className="brand" href="#top"><img className="brand-logo" src="/logo-cosmos.png" alt=""/>SPACE <b>WORLD</b></a><p>A FIELD GUIDE TO THE OBSERVABLE UNIVERSE.</p><small>© 2026 SPACE WORLD</small></footer>
  </main>;
}
