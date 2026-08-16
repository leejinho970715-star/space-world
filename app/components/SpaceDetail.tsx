"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

type Item={eyebrow:string;title:string;intro:string;image:string;facts:Array<[string,string]>;body:string};
export default function SpaceDetail({section,title,lede,items}:{section:string;title:string;lede:string;items:Item[]}){
 const root=useRef<HTMLElement>(null);
 useLayoutEffect(()=>{gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{
   gsap.from(".sub-hero>*",{y:70,opacity:0,duration:1.1,stagger:.12,ease:"power3.out"});
   gsap.utils.toArray<HTMLElement>(".detail-row").forEach((row,i)=>{const asset=row.querySelector(".detail-asset");gsap.from(row.querySelector(".detail-copy"),{x:i%2?80:-80,opacity:0,duration:1,scrollTrigger:{trigger:row,start:"top 72%"}});gsap.to(asset,{rotation:i%2?28:-28,yPercent:i%2?-12:12,ease:"none",scrollTrigger:{trigger:row,start:"top bottom",end:"bottom top",scrub:1.1}})});
 },root);return()=>ctx.revert()},[]);
 const hover=(e:React.MouseEvent<HTMLDivElement>,on:boolean)=>gsap.to(e.currentTarget.querySelector("img"),{rotation:on?12:0,scale:on?1.07:1,duration:.8,ease:"power3.out"});
 return <main ref={root} className="subpage"><header className="topbar solid"><Link className="brand" href="/"><span className="brand-mark">C</span>COSMOS <b>/ AR</b></Link><nav><Link href="/planets">Planets</Link><Link href="/deep-space">Deep space</Link><Link href="/orbit-data">Orbit data</Link></nav><Link className="back-home" href="/">← Field guide</Link></header>
   <section className="sub-hero"><p className="eyebrow"><i/>{section}</p><h1>{title}</h1><p>{lede}</p><span>SCROLL TO EXPLORE ↓</span></section>
   <section className="detail-list">{items.map((item,i)=><article className={`detail-row ${i%2?"reverse":""}`} key={item.title}>
     <div className="detail-visual" onMouseEnter={e=>hover(e,true)} onMouseLeave={e=>hover(e,false)}><span>{String(i+1).padStart(2,"0")}</span><img className="detail-asset" src={item.image} alt={`Transparent photorealistic 3D render of ${item.title}`}/></div>
     <div className="detail-copy"><p className="eyebrow"><i/>{item.eyebrow}</p><h2>{item.title}</h2><p>{item.intro}</p><dl>{item.facts.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><small>{item.body}</small></div>
   </article>)}</section><footer><Link className="brand" href="/"><span className="brand-mark">C</span>COSMOS <b>/ AR</b></Link><p>A FIELD GUIDE TO THE OBSERVABLE UNIVERSE.</p><small>© 2026 COSMOS AR LAB</small></footer>
 </main>
}
