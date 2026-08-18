"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const INTRO_SESSION_KEY = "space-world-intro-seen-v2";
const manifestoSegments = [
  { kind:"title", text:"Why Should We Know About Space?" },
  { kind:"lead", text:"Space may feel distant, but its influence is already part of our everyday lives." },
  { kind:"body", text:"Space isn't something that belongs only to scientists or astronomers." },
  { kind:"body", text:"From GPS, satellite communications, and weather observation to understanding Earth's environment and climate, many of the technologies and information systems we rely on every day are connected to space." },
  { kind:"body", text:"But understanding space matters for more than just practical reasons." },
  { kind:"body", text:"Looking into space also allows us to see Earth from a wider perspective. By discovering our place among countless planets and stars, we begin to understand just how small and extraordinary our world really is." },
  { kind:"body", text:"And you don't need to be an expert to begin." },
  { kind:"lead", text:"It can begin with something as simple as discovering a planet, finding a constellation, or wondering about the satellites passing above us right now." },
  { kind:"body", text:"SPACE WORLD begins with that simple curiosity." },
  { kind:"final", text:"You don't have to study space. Just explore it." },
] as const;
const manifestoOffsets=manifestoSegments.map((_,index)=>manifestoSegments.slice(0,index).reduce((sum,item)=>sum+item.text.length,0));
const manifestoLength=manifestoSegments.reduce((sum,item)=>sum+item.text.length,0);

export default function IntroExperience(){
  const [phase,setPhase]=useState<"video"|"manifesto"|"hidden">("video");
  const [typedCount,setTypedCount]=useState(0);
  const skipButton=useRef<HTMLButtonElement>(null);
  const previousOverflow=useRef("");

  useEffect(()=>{
    if(window.sessionStorage.getItem(INTRO_SESSION_KEY)==="true"){
      setPhase("hidden");
      return;
    }
    previousOverflow.current=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return()=>{document.body.style.overflow=previousOverflow.current};
  },[]);

  useEffect(()=>{
    if(phase!=="manifesto")return;
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){setTypedCount(manifestoLength);return}
    const timer=window.setInterval(()=>setTypedCount(count=>{
      if(count>=manifestoLength){window.clearInterval(timer);return manifestoLength}
      return Math.min(manifestoLength,count+3);
    }),18);
    return()=>window.clearInterval(timer);
  },[phase]);

  const showManifesto=()=>{setTypedCount(0);setPhase("manifesto")};

  const finish=()=>{
    window.sessionStorage.setItem(INTRO_SESSION_KEY,"true");
    document.body.style.overflow=previousOverflow.current;
    setPhase("hidden");
    window.scrollTo({top:0,behavior:"auto"});
    window.requestAnimationFrame(()=>window.dispatchEvent(new Event("resize")));
  };

  const followCursor=(event:ReactPointerEvent<HTMLDivElement>)=>{
    if(event.pointerType==="touch"||!skipButton.current)return;
    skipButton.current.style.left=`${event.clientX}px`;
    skipButton.current.style.top=`${event.clientY}px`;
  };

  if(phase==="hidden")return null;

  if(phase==="video")return <div className="intro-experience" onPointerMove={followCursor}>
      <video className="intro-video" src="/space-world-intro.mp4" autoPlay muted playsInline preload="auto" onEnded={showManifesto} onError={showManifesto}/>
      <div className="intro-shade" aria-hidden="true"/>
      <p className="intro-label">SPACE WORLD · INITIALISING JOURNEY</p>
      <button ref={skipButton} className="intro-skip" type="button" onClick={showManifesto} aria-label="Skip the film and continue to the Space World introduction"><span>SKIP FILM</span><i>↗</i></button>
    </div>;

  const complete=typedCount>=manifestoLength;
  return <section className="manifesto-intro" aria-label="Why everyone should explore space">
    <div className="manifesto-stars" aria-hidden="true"><i/><i/><i/><i/><i/></div>
    <article className="manifesto-book">
      <div className="manifesto-binding" aria-hidden="true"/>
      <div className="manifesto-copy">
        <header><span>SPACE WORLD / WHITE PAPER 01</span><small>{String(Math.round(typedCount/manifestoLength*100)).padStart(3,"0")}%</small></header>
        <div className="manifesto-text">
          {manifestoSegments.map((segment,index)=>{
            const visibleText=segment.text.slice(0,Math.max(0,Math.min(segment.text.length,typedCount-manifestoOffsets[index])));
            const cursor=typedCount>=manifestoOffsets[index]&&typedCount<manifestoOffsets[index]+segment.text.length;
            if(!visibleText&&!cursor)return null;
            if(segment.kind==="title")return <h1 key={segment.text}>{visibleText}{cursor&&<i className="type-cursor"/>}</h1>;
            return <p className={`manifesto-${segment.kind}`} key={segment.text}>{visibleText}{cursor&&<i className="type-cursor"/>}</p>;
          })}
        </div>
      </div>
      <aside className="manifesto-guide">
        <span className="manifesto-orbit" aria-hidden="true"><i/><i/></span>
        <img src="/astronaut-guide.png" alt="Mio, the Space World astronaut guide"/>
        <div><small>MIO / FIELD NOTE</small><b>“Start with curiosity.<br/>I’ll guide the way.”</b></div>
        <p>OBSERVATION LOG<br/>EARTH · 2026</p>
      </aside>
      <footer className="manifesto-actions">
        <button type="button" className="manifesto-skip" onClick={finish}>Skip introduction</button>
        <button type="button" className="manifesto-enter" onClick={complete?finish:()=>setTypedCount(manifestoLength)}>{complete?"Begin exploring":"Read full message"}<span>↗</span></button>
      </footer>
    </article>
  </section>;
}
