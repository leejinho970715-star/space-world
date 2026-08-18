"use client";

export const dynamic = "force-static";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./components/Navigation";
import SiteFooter from "./components/SiteFooter";
import IntroExperience from "./components/IntroExperience";
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
const chatSuggestions=[
  {label:"Planet guide",question:"Tell me about planets"},
  {label:"Asteroid belt",question:"What is the asteroid belt?"},
  {label:"Galaxy types",question:"Tell me about galaxy types"},
  {label:"Constellations",question:"How do constellations work?"},
  {label:"Satellites",question:"Tell me about satellites"},
  {label:"The Moon",question:"Why is the Moon important?"},
  {label:"Black holes",question:"What is a black hole?"},
  {label:"Spacecraft",question:"How do spacecraft travel?"},
  {label:"Best viewing",question:"How is observing weather?"},
];
const flightLog=[
  {name:"Earth",image:"/flight-icon-earth.png",href:"/planets#earth"},
  {name:"Planets",image:"/flight-icon-planets.png",href:"/planets"},
  {name:"Asteroids",image:"/flight-icon-asteroids.png",href:"/deep-space#ceres"},
  {name:"Galaxy",image:"/flight-icon-galaxy.png",href:"/deep-space#the-milky-way"},
  {name:"Constellations",image:"/flight-icon-constellations.png",href:"/deep-space#orion"},
  {name:"Satellites",image:"/flight-icon-satellites.png",href:"/orbit-data"},
];
const constellationFacts=[
 "The Hunter is traced by three brilliant belt stars across the celestial equator.",
 "The Great Bear circles the northern sky and contains the familiar Big Dipper.",
 "Five bright stars form a distinctive W-shaped path near the north celestial pole.",
 "A long curved chain marks the Scorpion and its red supergiant heart, Antares.",
 "The Lion rises with spring skies, led by Regulus and a backward question-mark pattern.",
];
const galaxyTypes=[
 {name:"Barred Spiral",label:"THE MILKY WAY",fact:"A bright central bar feeds long spiral arms filled with stars and dust.",scale:"100,000 light-years"},
 {name:"Grand Design Spiral",label:"ORDERED ARMS",fact:"Two prominent arms trace a precise spiral through the galactic disc.",scale:"60,000–150,000 light-years"},
 {name:"Elliptical Galaxy",label:"ANCIENT STARS",fact:"A smooth stellar system with little cold gas and limited new star formation.",scale:"10,000–700,000 light-years"},
 {name:"Irregular Galaxy",label:"GRAVITY IN MOTION",fact:"An asymmetric galaxy reshaped by interaction, turbulence and stellar nurseries.",scale:"3,000–30,000 light-years"},
];
const nasaSpacecraft=[
 {name:"Orion",type:"CREW EXPLORATION",image:"/spacecraft-orion-transparent.png",note:"A deep-space crew vehicle designed for lunar missions and the journey beyond."},
 {name:"Voyager 1",type:"INTERSTELLAR PROBE",image:"/spacecraft-voyager-transparent.png",note:"A long-lived robotic explorer carrying humanity’s message into interstellar space."},
 {name:"Parker Solar Probe",type:"SOLAR SCIENCE",image:"/spacecraft-parker-transparent.png",note:"A heat-shielded observatory built to fly through the Sun’s outer atmosphere."},
 {name:"Space Shuttle",type:"REUSABLE ORBITER",image:"/spacecraft-shuttle-transparent.png",note:"The reusable spacecraft that carried crews, laboratories and observatories to orbit."},
];
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

function AnimatedChars({text}:{text:string}){return <>{[...text].map((char,index)=><span className="type-char" aria-hidden="true" key={`${char}-${index}`}>{char===" "?"\u00a0":char}</span>)}</>}

function Planet({ planet, index, activeIndex, onSelect }: { planet: typeof planets[number]; index:number; activeIndex:number; onSelect:()=>void }) {
  const raw=index-activeIndex;
  const offset=((raw+4)%8)-4;
  const angle=offset*Math.PI/4;
  const x=Math.sin(angle)*46;
  const z=(Math.cos(angle)-1)*720;
  const scale=.42+.58*((Math.cos(angle)+1)/2);
  const opacity=Math.max(.12,1-Math.abs(offset)*.22);
  return <article className={`planet-card panorama-planet ${offset===0?"active":""}`} onClick={onSelect} style={{"--planet-x":`${x}vw`,"--planet-z":`${z}px`,"--planet-scale":scale,"--planet-angle":`${-offset*38}deg`,"--planet-opacity":opacity,"--planet-order":8-Math.abs(offset)} as React.CSSProperties}>
    <span className="planet-index">{String(index + 1).padStart(2,"0")} / 08</span>
    <img className="planet-image" src={planet.image} alt={`Photorealistic 3D render of ${planet.name}`} style={{ "--planet-size":`${planet.size}px` } as React.CSSProperties}/>
    <div className="planet-copy"><p>SOLAR SYSTEM</p><h3>{planet.name}</h3><span>{planet.fact}</span>
      <dl><div><dt>MEAN TEMPERATURE</dt><dd>{planet.temp}</dd></div><div><dt>ORBITAL PERIOD</dt><dd>{planet.orbit}</dd></div></dl>
    </div>
  </article>;
}

export default function Home() {
  const root=useRef<HTMLElement>(null);
  const planetDrag=useRef({active:false,startX:0,startIndex:0,moved:false});
  const [guideOpen,setGuideOpen]=useState(true), [active,setActive]=useState(0);
  const [activeConstellation,setActiveConstellation]=useState(0),[activeSatellite,setActiveSatellite]=useState(0),[activeGalaxy,setActiveGalaxy]=useState(0),[activePlanet,setActivePlanet]=useState(0);
  const [chatInput,setChatInput]=useState(""),[chatMessages,setChatMessages]=useState([{from:"mio",text:"Hi, I’m Mio. Ask me anything about this journey."}]);
  useLayoutEffect(()=>{gsap.registerPlugin(ScrollTrigger);let removeWheelSteps=()=>{};const ctx=gsap.context(()=>{
    document.querySelectorAll<HTMLElement>("main > .planet-scroll").forEach((section,index)=>{if(index>0)section.remove()});
    const sceneDistance=()=>Math.max(2600,window.innerHeight*5);
    const heroTimeline=gsap.timeline({paused:true});
    heroTimeline.fromTo(".hero-image",{opacity:0,scale:1.18},{opacity:1,scale:1.04,duration:1.2,ease:"power2.out"})
      .from(".hero-copy>.eyebrow",{opacity:0,y:26,duration:.55},">")
      .from(".hero-line",{opacity:0,y:60,duration:.78,stagger:.48,ease:"power3.out"},">")
      .from(".hero-bottom",{opacity:0,y:34,duration:.62},">")
      .from(".hud-corners span",{opacity:0,scale:.5,duration:.48,stagger:.12},">")
      .from(".altimeter",{opacity:0,x:32,duration:.55},">")
      .to(".hero-copy",{opacity:.12,y:-55,duration:.72},"+=.45")
      .fromTo(".story-line",{opacity:0,y:38,scale:.9},{opacity:1,y:0,scale:1,duration:.9,ease:"power3.out"},">");
    const heroSection=document.querySelector<HTMLElement>(".hero-scroll");
    const asteroidSection=document.querySelector<HTMLElement>(".asteroid-belt");
    const spacecraftSection=document.querySelector<HTMLElement>(".spacecraft-showcase");
    const spacecraftGrid=document.querySelector<HTMLElement>(".spacecraft-grid");
    const spacecraftTimeline=gsap.timeline({paused:true}).fromTo(".spacecraft-card",
      {scale:.08,y:140,z:-900,opacity:.38,rotation:(i,target)=>target.dataset.side==="left"?-10:10,filter:"blur(1.8px)"},
      {scale:1,y:0,z:0,opacity:1,rotation:0,filter:"blur(0px)",duration:1,stagger:.12,ease:"power2.out"},0);
    const isTouchViewport=window.matchMedia("(max-width: 800px), (pointer: coarse)").matches;
    if(isTouchViewport){
      heroTimeline.progress(.16);
      if(heroSection)ScrollTrigger.create({trigger:heroSection,start:"top top",end:"bottom top",scrub:.7,onUpdate:self=>heroTimeline.progress(.16+self.progress*.84)});
      if(spacecraftGrid)ScrollTrigger.create({trigger:spacecraftGrid,start:"top 70%",end:"bottom 55%",scrub:.8,onUpdate:self=>spacecraftTimeline.progress(self.progress)});
    }
    const steppedSections=[
      {element:document.querySelector<HTMLElement>(".galaxy-explorer"),length:galaxyTypes.length,set:setActiveGalaxy},
      {element:document.querySelector<HTMLElement>(".constellation-explorer"),length:constellations.length,set:setActiveConstellation},
      {element:document.querySelector<HTMLElement>(".satellite-orbit"),length:satelliteData.length,set:setActiveSatellite},
      {element:document.querySelector<HTMLElement>(".planet-scroll"),length:planets.length,set:setActivePlanet},
    ];
    const stepIndexes=new Map<HTMLElement,number>();
    steppedSections.forEach(item=>{if(item.element)stepIndexes.set(item.element,0)});
    let heroStep=0,spacecraftStep=0,lastWheelAt=0,smoothFrame=0,aligningElement:HTMLElement|null=null,asteroidStarted=false,asteroidComplete=false,spacecraftLeaving=false;
    const isHeroActive=(element:HTMLElement)=>{const rect=element.getBoundingClientRect();return rect.top<=window.innerHeight*.12&&rect.bottom>=window.innerHeight*.88};
    const isMidActive=(element:HTMLElement)=>{const rect=element.getBoundingClientRect();const midpoint=window.innerHeight*.5;return rect.top<=midpoint&&rect.bottom>=midpoint};
    const alignSection=(element:HTMLElement)=>{if(aligningElement)return;const offset=element.getBoundingClientRect().top;if(Math.abs(offset)<=2)return;const from=window.scrollY,target=Math.max(0,from+offset),started=performance.now(),duration=620;aligningElement=element;const tick=(time:number)=>{const progress=Math.min(1,(time-started)/duration),eased=1-Math.pow(1-progress,4);window.scrollTo({top:from+(target-from)*eased,behavior:"auto"});if(progress<1)smoothFrame=requestAnimationFrame(tick);else{aligningElement=null;ScrollTrigger.update()}};smoothFrame=requestAnimationFrame(tick)};
    const onWheel=(event:WheelEvent)=>{
      if(Math.abs(event.deltaY)<4)return;
      const direction=event.deltaY>0?1:-1;
      const now=Date.now();
      if(aligningElement){event.preventDefault();return}
      if(heroSection&&isHeroActive(heroSection)){
        const waiting=direction>0&&heroStep<8;
        const rewinding=direction<0&&heroStep>0;
        if(waiting||rewinding){event.preventDefault();alignSection(heroSection);if(now-lastWheelAt>300){heroStep=Math.max(0,Math.min(8,heroStep+direction));gsap.to(heroTimeline,{progress:heroStep/8,duration:.45,ease:"power2.out",overwrite:true});lastWheelAt=now}return}
      }
      if(asteroidSection&&isMidActive(asteroidSection)&&direction>0&&!asteroidComplete){event.preventDefault();alignSection(asteroidSection);if(!asteroidStarted){asteroidStarted=true;gsap.timeline({onComplete:()=>{asteroidComplete=true;const nextSection=asteroidSection.nextElementSibling as HTMLElement|null;if(nextSection)requestAnimationFrame(()=>alignSection(nextSection))}}).to(".asteroid-layer",{xPercent:(i)=>i%2?28:-22,yPercent:(i)=>i*8-8,rotation:(i)=>i%2?70:-55,duration:3,ease:"power1.inOut",stagger:.08},0).to(".belt-mascot",{x:-34,y:-24,rotation:-9,duration:3,ease:"sine.inOut"},0)}return}
      const spacecraftGridRect=spacecraftGrid?.getBoundingClientRect();
      const spacecraftImagesVisible=!!spacecraftGridRect&&spacecraftGridRect.top<=window.innerHeight*.5&&spacecraftGridRect.bottom>=window.innerHeight*.5;
      if(spacecraftSection&&spacecraftImagesVisible&&(spacecraftLeaving||(direction>0&&spacecraftStep<8)||(direction<0&&spacecraftStep>0))){
        event.preventDefault();
        if(spacecraftLeaving)return;
        if(now-lastWheelAt>300){
          const next=Math.max(0,Math.min(8,spacecraftStep+direction));
          spacecraftStep=next;
          const completed=direction>0&&next===8;
          if(completed)spacecraftLeaving=true;
          gsap.to(spacecraftTimeline,{progress:next/8,duration:.55,ease:"power2.out",overwrite:true,onComplete:()=>{
            if(!completed)return;
            const nextSection=spacecraftSection.nextElementSibling as HTMLElement|null;
            if(nextSection)requestAnimationFrame(()=>alignSection(nextSection));
            window.setTimeout(()=>{spacecraftLeaving=false},900);
          }});
          lastWheelAt=now;
        }
        return;
      }
      for(const item of steppedSections){
        if(!item.element||!isMidActive(item.element))continue;
        const current=stepIndexes.get(item.element)??0;
        const shouldHold=direction>0?current<item.length-1:current>0;
        if(shouldHold){event.preventDefault();alignSection(item.element);if(now-lastWheelAt>420){const next=Math.max(0,Math.min(item.length-1,current+direction));stepIndexes.set(item.element,next);item.set(next);lastWheelAt=now}return}
      }
    };
    if(!isTouchViewport)window.addEventListener("wheel",onWheel,{passive:false,capture:true});
    removeWheelSteps=()=>{cancelAnimationFrame(smoothFrame);if(!isTouchViewport)window.removeEventListener("wheel",onWheel,{capture:true})};
    gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach(el=>gsap.from(el,{y:80,opacity:0,duration:1.1,scrollTrigger:{trigger:el,start:"top 50%"}}));
    gsap.utils.toArray<HTMLElement>(".space-asset").forEach((el,i)=>gsap.to(el,{rotation:i%2?18:-18,y:i%2?-45:45,ease:"none",scrollTrigger:{trigger:el,start:"top 50%",end:"bottom top",scrub:1.2}}));
    gsap.utils.toArray<HTMLElement>(".planet-image").forEach((el,i)=>{gsap.to(el,{rotation:i%2?32:-32,ease:"none",scrollTrigger:{trigger:".planet-scroll",start:"top 50%",end:"bottom top",scrub:.55}});const enter=()=>gsap.to(el,{scale:1.1,duration:.6,ease:"power3.out"});const leave=()=>gsap.to(el,{scale:1,duration:.6,ease:"power3.out"});el.addEventListener("mouseenter",enter);el.addEventListener("mouseleave",leave)});
    gsap.fromTo(".galaxy-core",{scale:.18,opacity:.3},{scale:1.2,opacity:1,ease:"none",scrollTrigger:{trigger:".galaxy-explorer",start:"top 50%",end:()=>`+=${sceneDistance()}`,scrub:1}});
    gsap.to(".galaxy-core",{xPercent:2,rotation:3,duration:9,repeat:-1,yoyo:true,ease:"sine.inOut"});
    gsap.to(".constellation-stage",{x:10,y:-14,duration:6,repeat:-1,yoyo:true,ease:"sine.inOut"});
    gsap.to(".constellation-stage img",{opacity:.76,duration:2.8,repeat:-1,yoyo:true,ease:"sine.inOut"});
    gsap.utils.toArray<HTMLElement>(".weather-icon img").forEach((icon,i)=>gsap.to(icon,{y:i%2?-7:7,rotation:i%2?5:-5,duration:2.8+i*.18,repeat:-1,yoyo:true,ease:"sine.inOut"}));
    gsap.to(".constellation-mascot",{x:14,y:-20,rotation:6,duration:4.2,repeat:-1,yoyo:true,ease:"sine.inOut"});
    gsap.to(".finale-mascot",{y:-24,x:10,rotation:3.5,duration:3.6,repeat:-1,yoyo:true,ease:"sine.inOut"});
    gsap.fromTo(".finale-mascot-wrap",{xPercent:18,yPercent:12,rotation:7},{xPercent:-5,yPercent:-5,rotation:-4,ease:"none",scrollTrigger:{trigger:".finale",start:"top 50%",end:"bottom top",scrub:1.2}});
    gsap.to(".mini-system",{rotation:120,ease:"none",scrollTrigger:{trigger:".finale",start:"top 50%",end:"bottom top",scrub:1.2}});
    gsap.utils.toArray<HTMLElement>(".guide-transition").forEach((section)=>{const astronaut=section.querySelector(".transition-astronaut"),copy=section.querySelector(".transition-copy"),progress=section.querySelector(".transition-progress i"),dial=section.querySelector(".transition-orbit-dial"),stars=section.querySelectorAll(".transition-star");const tl=gsap.timeline({scrollTrigger:{trigger:section,start:"top 50%",end:"bottom 50%",scrub:1}});tl.fromTo(astronaut,{xPercent:68,yPercent:18,rotation:11,opacity:0},{xPercent:0,yPercent:0,rotation:0,opacity:1,duration:.34,ease:"power2.out"},0).fromTo(copy,{y:40,opacity:0},{y:0,opacity:1,duration:.24},.08).fromTo(stars,{scale:0,opacity:0},{scale:1,opacity:1,duration:.42,stagger:.035,ease:"back.out(1.8)"},.12).fromTo(dial,{scale:.65,rotation:-45,opacity:0},{scale:1.08,rotation:35,opacity:.7,duration:.78,ease:"none"},.08).fromTo(progress,{scaleX:0},{scaleX:1,duration:1,ease:"none"},0).to(copy,{y:-25,opacity:0,duration:.18},.8).to(stars,{y:-28,opacity:.18,duration:.24,stagger:.02},.74).to(astronaut,{xPercent:-105,yPercent:-12,rotation:-7,opacity:.12,duration:.3,ease:"power1.in"},.72)});
    gsap.to(".orbit-earth",{rotation:70,ease:"none",scrollTrigger:{trigger:".satellite-orbit",start:"top 50%",end:()=>`+=${sceneDistance()}`,scrub:1.2}});
    gsap.utils.toArray<HTMLElement>(".journey-step").forEach((el,i)=>gsap.from(el,{y:45,opacity:0,duration:.7,delay:i*.05,scrollTrigger:{trigger:el,start:"top 50%"}}));
    animateContent(root.current!);
    Promise.all([...document.images].map(image=>image.complete?Promise.resolve():new Promise<void>(resolve=>{image.addEventListener("load",()=>resolve(),{once:true});image.addEventListener("error",()=>resolve(),{once:true})}))).then(()=>{ScrollTrigger.sort();ScrollTrigger.refresh()});
  },root);return()=>{removeWheelSteps();ctx.revert()}},[]);
  const hover=(e:React.MouseEvent<HTMLElement>,enter:boolean)=>gsap.to(e.currentTarget.querySelector("img"),{rotation:enter?8:0,scale:enter?1.08:1,duration:.7,ease:"power3.out"});
  const startPlanetDrag=(e:React.PointerEvent<HTMLDivElement>)=>{if((e.target as HTMLElement).closest("button"))return;planetDrag.current={active:true,startX:e.clientX,startIndex:activePlanet,moved:false};e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.classList.add("dragging")};
  const movePlanetDrag=(e:React.PointerEvent<HTMLDivElement>)=>{if(!planetDrag.current.active)return;const distance=planetDrag.current.startX-e.clientX;if(Math.abs(distance)>8)planetDrag.current.moved=true;const steps=Math.round(distance/90);if(steps!==0)setActivePlanet((planetDrag.current.startIndex+steps+planets.length*10)%planets.length)};
  const endPlanetDrag=(e:React.PointerEvent<HTMLDivElement>)=>{if(!planetDrag.current.active)return;planetDrag.current.active=false;e.currentTarget.classList.remove("dragging");if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId)};
  const askMio=(question:string)=>{const q=question.trim();if(!q)return;const lower=q.toLowerCase();let answer="Try asking me about planets, galaxies, constellations, satellites, asteroids, spacecraft, the Moon, black holes, or observing conditions.";if(lower.includes("planet"))answer="Eight planets orbit our Sun. Open the Planets chapter to compare their temperatures, sizes, and orbital periods.";else if(lower.includes("galaxy")||lower.includes("milky"))answer="The Milky Way is a barred spiral galaxy roughly 100,000 light-years wide. Our Solar System sits in the Orion Arm.";else if(lower.includes("satellite")||lower.includes("orbit"))answer="Space World tracks research, weather, navigation, and communications satellites across several orbital regions.";else if(lower.includes("constellation"))answer="Constellations are 88 officially recognised regions that help us map and navigate the night sky.";else if(lower.includes("asteroid"))answer="Asteroids are rocky remnants of Solar System formation. Most orbit between Mars and Jupiter.";else if(lower.includes("moon"))answer="The Moon stabilises Earth's axial tilt, drives most ocean tides, and preserves a record of the early Solar System on its ancient surface.";else if(lower.includes("black hole"))answer="A black hole is a region where gravity is so intense that beyond its event horizon even light cannot escape. We detect them through their effects on nearby matter.";else if(lower.includes("spacecraft")||lower.includes("rocket"))answer="Spacecraft use rockets to reach orbit, then carefully timed engine burns and gravity assists to reshape their trajectories through space.";else if(lower.includes("weather")||lower.includes("observe")||lower.includes("view"))answer="For clearer observing, look for low cloud cover, stable seeing, good transparency, light wind, and limited moonlight.";setChatMessages(messages=>[...messages,{from:"user",text:q},{from:"mio",text:answer}]);setChatInput("");};
  return <main ref={root}>
    <IntroExperience/>
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

    <section className="asteroid-belt" id="asteroids"><div className="cinematic-sticky"><div className="belt-copy gsap-reveal"><p className="eyebrow"><i/>REGION 02 · ASTEROID BELT</p><h2>Through the<br/><span>ancient debris.</span></h2><p>Fragments left behind 4.6 billion years ago move on separate planes and at separate speeds.</p></div>
      {[0,1,2].map(layer=><div className={`asteroid-layer layer-${layer}`} key={layer}>{[0,1,2,3].map((_,i)=><img key={i} src="/object-asteroid-transparent.png" alt="" style={{left:`${8+i*27-(layer*4)}%`,top:`${14+((i+layer)%3)*27}%`,width:`${130+layer*70}px`}}/>)}</div>)}
      <div className="asteroid-index">{asteroidNames.map((name,i)=><a href="/deep-space" key={name} aria-label={`Explore ${name}`}><span>0{i+1}</span><b>{name}</b><small>{i===0?"Dwarf planet":i===1?"Brightest asteroid":i===2?"High-inclination orbit":"Carbon-rich body"}</small></a>)}</div>
      <img className="belt-mascot" src="/astronaut-flight.png" alt="Mio flying through the asteroid belt"/></div>
    </section>

    <section className="spacecraft-showcase"><div className="spacecraft-heading"><p className="eyebrow"><i/>NASA SPACECRAFT ARCHIVE</p><h2>Machines built<br/><span>to cross the impossible.</span></h2><p>Four spacecraft, four radically different ways of extending human reach.</p><a href="/spacecraft">Explore the fleet →</a></div><div className="spacecraft-grid">{nasaSpacecraft.map((craft,i)=><a href="/spacecraft" className="spacecraft-card" data-side={i%2?"right":"left"} key={craft.name}><small>0{i+1} · {craft.type}</small><img src={craft.image} alt={`Photorealistic 3D render of NASA ${craft.name}`}/><h3>{craft.name}</h3><p>{craft.note}</p></a>)}</div></section>

    <section className="galaxy-explorer"><div className="galaxy-sticky"><div className="galaxy-copy" aria-live="polite"><p className="eyebrow"><i/>GALAXY TYPE · 0{activeGalaxy+1} / 0{galaxyTypes.length}</p><h2 key={galaxyTypes[activeGalaxy].name} className="step-change">{galaxyTypes[activeGalaxy].name}.<br/><span>{galaxyTypes[activeGalaxy].label}.</span></h2><p className="galaxy-fact step-change" key={galaxyTypes[activeGalaxy].fact}>{galaxyTypes[activeGalaxy].fact}</p><div className="galaxy-pagination" role="group" aria-label="Choose a galaxy type">{galaxyTypes.map((galaxy,i)=><button type="button" className={activeGalaxy===i?"active":""} aria-label={`Show ${galaxy.name}`} aria-pressed={activeGalaxy===i} onClick={()=>setActiveGalaxy(i)} key={galaxy.name}>0{i+1}</button>)}</div></div><img key={activeGalaxy} className={`galaxy-core galaxy-variant-${activeGalaxy}`} src="/object-galaxy-transparent.png" alt={`${galaxyTypes[activeGalaxy].name} galaxy`}/><dl><div><dt>TYPE</dt><dd>{galaxyTypes[activeGalaxy].name}</dd></div><div><dt>TYPICAL SCALE</dt><dd>{galaxyTypes[activeGalaxy].scale}</dd></div></dl></div></section>

    <section className="constellation-explorer"><div className="cinematic-sticky"><div className="constellation-copy"><p className="eyebrow"><i/>CELESTIAL NAVIGATION · 0{activeConstellation+1} / 0{constellations.length}</p><h2 aria-label="Connect the night sky."><AnimatedChars text="Connect the"/><br/><span><AnimatedChars text="night sky."/></span></h2><p className="constellation-fact step-change" key={constellationFacts[activeConstellation]}>{constellationFacts[activeConstellation]}</p></div><div className="constellation-stage"><img key={constellations[activeConstellation]} className={`constellation-step constellation-variant-${activeConstellation}`} src="/object-constellation-transparent.png" alt={`${constellations[activeConstellation]} constellation`} style={{transform:`rotate(${activeConstellation*34}deg) scale(${1-activeConstellation*.035})`}}/><span key={`${constellations[activeConstellation]}-name`} className="constellation-name step-change">{constellations[activeConstellation]}</span></div><div className="constellation-menu">{constellations.map((name,i)=><button className={activeConstellation===i?"active":""} key={name} onClick={()=>setActiveConstellation(i)}><span>0{i+1}</span>{name}</button>)}</div><img className="constellation-mascot" src="/astronaut-guide.png" alt="Mio pointing toward the constellations"/></div></section>

    <section className="guide-transition transition-orbit" aria-label="Mio guides you toward Earth orbit"><div className="guide-transition-sticky"><div className="transition-copy"><p className="eyebrow"><i/>MIO / ORBIT APPROACH</p><h2>Look alive.<br/><span>Orbit is busy.</span></h2><p>Follow my trajectory and meet the machines circling Earth.</p></div><div className="transition-field" aria-hidden="true">{[0,1,2,3,4,5].map(i=><span className={`transition-star star-${i}`} key={i}/>)}</div><span className="transition-orbit-dial" aria-hidden="true"><i/><i/></span><img className="transition-astronaut" src="/astronaut-flight.png" alt="Mio flying toward Earth orbit"/><span className="transition-destination">NEXT · SATELLITE NETWORK</span><span className="transition-progress"><i/></span></div></section>

    <section className="satellite-orbit"><div className="cinematic-sticky"><div className="satellite-copy gsap-reveal"><p className="eyebrow"><i/>EARTH ORBIT · 0{activeSatellite+1} / 0{satelliteData.length}</p><h2>Machines that<br/><span>never stand still.</span></h2><p className="step-change" key={satelliteData[activeSatellite].mission}>{satelliteData[activeSatellite].mission}</p><dl className="step-change" key={`${satelliteData[activeSatellite].name}-facts`}><div><dt>ALTITUDE</dt><dd>{satelliteData[activeSatellite].alt}</dd></div><div><dt>ORBITAL SPEED</dt><dd>{satelliteData[activeSatellite].speed}</dd></div></dl><div className="satellite-roster">{satelliteData.map((sat,i)=><button key={sat.name} className={activeSatellite===i?"active":""} onClick={()=>setActiveSatellite(i)}>{String(i+1).padStart(2,"0")} <b>{sat.name}</b></button>)}</div></div><div className="orbit-stage"><span className="orbit-ring ring-one"/><span className="orbit-ring ring-two"/><img className="orbit-earth" src="/planet-earth-transparent.png" alt="Rotating Earth"/><button key={satelliteData[activeSatellite].name} style={{left:`${orbitPositions[activeSatellite][0]}%`,top:`${orbitPositions[activeSatellite][1]}%`}} className="orbiting-satellite active satellite-step" onClick={()=>setActiveSatellite((activeSatellite+1)%satelliteData.length)} aria-label={`Show next satellite after ${satelliteData[activeSatellite].name}`}><img src={satelliteData[activeSatellite].image} alt=""/><span>{satelliteData[activeSatellite].name}</span></button></div></div></section>

    <section id="planets" className="planet-scroll"><div className="planet-sticky" onPointerDown={startPlanetDrag} onPointerMove={movePlanetDrag} onPointerUp={endPlanetDrag} onPointerCancel={endPlanetDrag}>
      <div className="section-head"><p className="eyebrow"><i/>SOLAR SYSTEM / 01—08</p><h2>Eight worlds.<br/><span>One system.</span></h2><div className="planet-heading-actions"><div className="planet-panorama-controls" aria-label="Planet carousel controls" onPointerDown={event=>event.stopPropagation()}><button type="button" onClick={()=>setActivePlanet((activePlanet-1+planets.length)%planets.length)} aria-label="Show previous planet">←</button><button type="button" onClick={()=>setActivePlanet((activePlanet+1)%planets.length)} aria-label="Show next planet">→</button></div><div className="planet-panorama-index" aria-live="polite"><b>{String(activePlanet+1).padStart(2,"0")}</b><span>/ 08</span><small>{planets[activePlanet].name}</small></div></div><small>SCROLL TO TRAVEL →</small></div><div className="orbit-line"/>
      <div className="planet-track panorama-track">{planets.map((p,i)=><Planet key={p.name} planet={p} index={i} activeIndex={activePlanet} onSelect={()=>{if(planetDrag.current.moved){planetDrag.current.moved=false;return}setActivePlanet(i)}}/>)}</div>
    </div></section>

    <section id="deep-space" className="deep-space"><div className="deep-title gsap-reveal"><p className="eyebrow"><i/>BEYOND THE PLANETS</p><h2>Explore what lives<br/><span>between the light.</span></h2><p className="deep-intro">A closer look at the objects, structures and machines that define our place in space.</p></div>
      <div className="object-grid" id="signals">{objects.map((item,i)=><a href={item.href} key={item.name} className={active===i?"active":""} onClick={()=>setActive(i)} onMouseEnter={e=>hover(e,true)} onMouseLeave={e=>hover(e,false)} aria-label={`Explore ${item.name}`}>
        <img className="space-asset" src={item.image} alt={`Photorealistic 3D view of ${item.name}`}/><span className="object-shade"/><div className="object-meta"><small>{String(i+1).padStart(2,"0")} / {item.tag}</small><h3>{item.name}</h3><p>{item.note}</p><b>{item.value}<em>{item.unit}</em></b></div><i>↗</i>
      </a>)}</div>
      <aside className="signal-detail"><span>LIVE OBJECT</span><b>{objects[active].name}</b><p>Telemetry received · Signal strength <strong>98.7%</strong></p><div><i/></div></aside>
    </section>

    <section className="journey-log"><p className="eyebrow"><i/>YOUR FLIGHT LOG</p><div>{flightLog.map((step,i)=><a className="journey-step" href={step.href} key={step.name} aria-label={`Explore ${step.name}`}><b>0{i+1}</b><img src={step.image} alt=""/><span>{step.name}</span><i aria-hidden="true">→</i></a>)}</div></section>
    <section className="finale"><div className="final-orbit mini-system" aria-hidden="true"><img className="mini-sun" src="/sun-3d-transparent.png" alt=""/><span className="mini-orbit orbit-a"><img src="/planet-mercury-transparent.png" alt=""/></span><span className="mini-orbit orbit-b"><img src="/planet-earth-transparent.png" alt=""/></span><span className="mini-orbit orbit-c"><img src="/planet-mars-transparent.png" alt=""/></span><span className="mini-orbit orbit-d"><img src="/planet-neptune-transparent.png" alt=""/></span></div><div className="finale-mascot-wrap"><img className="finale-mascot" src="/astronaut-complete.png" alt="Mio celebrating the completed journey"/></div><div><p className="eyebrow"><i/>EXPLORATION COMPLETE</p><h2>You crossed<br/><span>the known universe.</span></h2><div className="final-actions"><a href="#top">Explore again <span>↑</span></a><a href="/my-space">My space <span>→</span></a></div></div></section>
    <aside className={`mascot-guide ${guideOpen?"open":""}`}><button className="mascot-trigger" onClick={()=>setGuideOpen(!guideOpen)} aria-label={guideOpen?"Close Mio chatbot":"Open Mio chatbot"}><img src="/astronaut.png" alt=""/></button>{guideOpen&&<div className="mio-chat"><button className="chat-close" onClick={()=>setGuideOpen(false)} aria-label="Close chatbot">×</button><b>MIO / SPACE GUIDE</b><div className="chat-log" aria-live="polite">{chatMessages.map((message,i)=><p className={message.from} key={i}>{message.text}</p>)}</div><small className="chat-suggestions-title">QUICK QUESTIONS · {String(chatSuggestions.length).padStart(2,"0")}</small><div className="chat-suggestions">{chatSuggestions.map(item=><button type="button" onClick={()=>askMio(item.question)} key={item.label}>{item.label}</button>)}</div><form onSubmit={e=>{e.preventDefault();askMio(chatInput)}}><input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Ask Mio about space…" aria-label="Message Mio"/><button type="submit" aria-label="Send message">→</button></form></div>}</aside>
    <SiteFooter/>
  </main>;
}
