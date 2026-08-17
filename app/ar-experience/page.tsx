"use client";

export const dynamic = "force-static";

import {useRef,useState,type CSSProperties} from "react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import SiteFooter from "../components/SiteFooter";

const clamp=(value:number,min:number,max:number)=>Math.min(max,Math.max(min,value));
const MIN_ZOOM=.7;
const MAX_ZOOM=2.2;
const DEFAULT_ZOOM=1;

export default function ARExperience(){
  const dragging=useRef(false),last=useRef({x:0,y:0});
  const [yaw,setYaw]=useState(50),[pitch,setPitch]=useState(50),[zoom,setZoom]=useState(DEFAULT_ZOOM),[intro,setIntro]=useState(true);
  const move=(dx:number,dy:number)=>{
    setYaw(value=>(value-dx*.075+1000)%100);
    setPitch(value=>clamp(value-dy*.09,12,88));
  };
  const reset=()=>{setYaw(50);setPitch(50);setZoom(DEFAULT_ZOOM)};
  const zoomIn=()=>setZoom(value=>clamp(Number((value+.12).toFixed(2)),MIN_ZOOM,MAX_ZOOM));
  const zoomOut=()=>setZoom(value=>clamp(Number((value-.12).toFixed(2)),MIN_ZOOM,MAX_ZOOM));

  return <main className="ar-page">
    <header className="topbar ar-topbar"><Link className="brand" href="/"><img className="brand-logo" src="/logo-cosmos.png" alt=""/>SPACE <b>WORLD</b></Link><Navigation/><Link className="back-home" href="/">← Field guide</Link></header>
    <section className={`ar-viewer ${dragging.current?"dragging":""}`} tabIndex={0} aria-label="Interactive 360 degree view of deep space"
      onPointerDown={event=>{dragging.current=true;last.current={x:event.clientX,y:event.clientY};event.currentTarget.setPointerCapture(event.pointerId);setIntro(false)}}
      onPointerMove={event=>{if(dragging.current){move(event.clientX-last.current.x,event.clientY-last.current.y);last.current={x:event.clientX,y:event.clientY}}}}
      onPointerUp={event=>{dragging.current=false;event.currentTarget.releasePointerCapture(event.pointerId)}}
      onPointerCancel={()=>{dragging.current=false}}
      onWheel={event=>{event.preventDefault();setIntro(false);if(event.ctrlKey||event.metaKey)setZoom(value=>clamp(value-event.deltaY*.0012,MIN_ZOOM,MAX_ZOOM));else move(event.deltaY*.75,event.deltaX*.5)}}
      onKeyDown={event=>{if(event.key==="ArrowLeft")move(-18,0);if(event.key==="ArrowRight")move(18,0);if(event.key==="ArrowUp")move(0,-12);if(event.key==="ArrowDown")move(0,12);if(event.key==="+"||event.key==="=")setZoom(value=>clamp(value+.1,MIN_ZOOM,MAX_ZOOM));if(event.key==="-")setZoom(value=>clamp(value-.1,MIN_ZOOM,MAX_ZOOM))}}>
      <div className="ar-panorama" style={{backgroundPosition:`${yaw}% ${pitch}%`,"--panorama-zoom":zoom} as CSSProperties}/>
      <div className="ar-vignette"/><div className="ar-scanlines"/>
      <div className="ar-reticle" aria-hidden="true"><i/><i/><span/></div>
      <button className="ar-hotspot hotspot-earth" onClick={()=>{setYaw(30);setPitch(48);setZoom(1.25)}}><i/>EARTH <small>384,400 KM</small></button>
      <button className="ar-hotspot hotspot-core" onClick={()=>{setYaw(60);setPitch(52);setZoom(1.2)}}><i/>MILKY WAY CORE <small>26,000 LY</small></button>
      <button className="ar-hotspot hotspot-belt" onClick={()=>{setYaw(82);setPitch(55);setZoom(1.3)}}><i/>ASTEROID FIELD <small>TRACKED</small></button>
      <div className="ar-heading"><p className="eyebrow"><i/>IMMERSIVE MODE / 360°</p><h1>Space,<br/><span>all around you.</span></h1></div>
      <div className="ar-telemetry"><span>AZIMUTH <b>{Math.round(yaw*3.6)}°</b></span><span>ELEVATION <b>{Math.round((50-pitch)*1.8)}°</b></span><span>ZOOM <b>{zoom.toFixed(1)}×</b></span></div>
      <div className="ar-controls"><button type="button" onClick={zoomOut} aria-label="Zoom out">−</button><button type="button" onClick={reset}>RESET VIEW</button><button type="button" onClick={zoomIn} aria-label="Zoom in">+</button></div>
      {intro&&<div className="ar-intro"><span>360°</span><b>Explore a wider universe</b><p>Drag, swipe, or scroll through the expanded 4K celestial sphere.</p><button onClick={()=>setIntro(false)}>ENTER AR MODE →</button></div>}
      <div className="ar-drag-hint">DRAG / SWIPE TO ROTATE · SCROLL TO TRAVEL · CTRL + SCROLL TO ZOOM</div>
    </section>
    <SiteFooter compact/>
  </main>;
}
