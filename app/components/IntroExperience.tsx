"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const INTRO_SESSION_KEY = "space-world-intro-seen";

export default function IntroExperience(){
  const [visible,setVisible]=useState(true);
  const skipButton=useRef<HTMLButtonElement>(null);
  const previousOverflow=useRef("");

  useEffect(()=>{
    if(window.sessionStorage.getItem(INTRO_SESSION_KEY)==="true"){
      setVisible(false);
      return;
    }
    previousOverflow.current=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return()=>{document.body.style.overflow=previousOverflow.current};
  },[]);

  const finish=()=>{
    window.sessionStorage.setItem(INTRO_SESSION_KEY,"true");
    document.body.style.overflow=previousOverflow.current;
    setVisible(false);
    window.scrollTo({top:0,behavior:"auto"});
    window.requestAnimationFrame(()=>window.dispatchEvent(new Event("resize")));
  };

  const followCursor=(event:ReactPointerEvent<HTMLDivElement>)=>{
    if(event.pointerType==="touch"||!skipButton.current)return;
    skipButton.current.style.left=`${event.clientX}px`;
    skipButton.current.style.top=`${event.clientY}px`;
  };

  if(!visible)return null;

  return <div className="intro-experience" onPointerMove={followCursor}>
    <video className="intro-video" src="/space-world-intro.mp4" autoPlay muted playsInline preload="auto" onEnded={finish} onError={finish}/>
    <div className="intro-shade" aria-hidden="true"/>
    <p className="intro-label">SPACE WORLD · INITIALISING JOURNEY</p>
    <button ref={skipButton} className="intro-skip" type="button" onClick={finish} aria-label="Skip intro and enter Space World">
      <span>SKIP</span><i>↗</i>
    </button>
  </div>;
}
