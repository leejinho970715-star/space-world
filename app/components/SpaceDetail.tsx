"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./Navigation";
import SiteFooter from "./SiteFooter";
import { animateContent } from "./contentMotion";

type Item={eyebrow:string;title:string;intro:string;image:string;facts:Array<[string,string]>;body:string};
const slugify=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

function MagnifierVisual({item,index}:{item:Item;index:number}){
 const visualRef=useRef<HTMLDivElement>(null);
 const positionLens=(clientX:number,clientY:number)=>{
   const visual=visualRef.current;
   if(!visual)return;
   const bounds=visual.getBoundingClientRect();
   const x=Math.max(0,Math.min(bounds.width,clientX-bounds.left));
   const y=Math.max(0,Math.min(bounds.height,clientY-bounds.top));
   visual.style.setProperty("--lens-x",`${x}px`);
   visual.style.setProperty("--lens-y",`${y}px`);
 };
 return <div
   ref={visualRef}
   className="detail-visual magnifier-visual"
   tabIndex={0}
   aria-label={`${item.title} 확대 보기. 마우스를 움직여 세부 영역을 탐색하세요.`}
   onPointerEnter={event=>{positionLens(event.clientX,event.clientY);event.currentTarget.classList.add("is-magnifying")}}
   onPointerMove={event=>positionLens(event.clientX,event.clientY)}
   onPointerLeave={event=>event.currentTarget.classList.remove("is-magnifying")}
   onFocus={event=>event.currentTarget.classList.add("is-magnifying")}
   onBlur={event=>event.currentTarget.classList.remove("is-magnifying")}
 >
   <span>{String(index+1).padStart(2,"0")}</span>
   <img className="detail-asset" src={item.image} alt={`Transparent photorealistic 3D render of ${item.title}`}/>
   <div className="magnifier-crop" aria-hidden="true"><img src={item.image} alt=""/></div>
   <i className="magnifier-ring" aria-hidden="true"/>
   <small className="magnifier-hint" aria-hidden="true">HOVER TO MAGNIFY</small>
 </div>;
}

export default function SpaceDetail({section,title,lede,items}:{section:string;title:string;lede:string;items:Item[]}){
 const root=useRef<HTMLElement>(null);
 useLayoutEffect(()=>{gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{
   const heroItems=gsap.utils.toArray<HTMLElement>(".sub-hero>*");
   gsap.fromTo(heroItems,{y:70,opacity:0},{y:0,opacity:1,duration:1.1,stagger:.12,ease:"power3.out",clearProps:"transform,opacity"});
   gsap.utils.toArray<HTMLElement>(".detail-row").forEach((row,i)=>{const asset=row.querySelector(".detail-asset");gsap.from(row.querySelector(".detail-copy"),{x:i%2?80:-80,opacity:0,duration:1,scrollTrigger:{trigger:row,start:"top 50%"}});gsap.to(asset,{rotation:i%2?28:-28,yPercent:i%2?-12:12,ease:"none",scrollTrigger:{trigger:row,start:"top 50%",end:"bottom top",scrub:1.1}})});
   gsap.utils.toArray<HTMLElement>(".detail-visual").forEach((visual,i)=>gsap.to(visual,{y:i%2?-10:10,rotation:i%2?-.35:.35,duration:3.8+i*.35,repeat:-1,yoyo:true,ease:"sine.inOut"}));
   animateContent(root.current!);
 },root);return()=>ctx.revert()},[]);
 return <main ref={root} className="subpage"><header className="topbar solid"><a className="brand" href="/"><img className="brand-logo" src="/logo-cosmos.png" alt=""/>SPACE <b>WORLD</b></a><Navigation/><a className="back-home" href="/">← Field guide</a></header>
   <section className="sub-hero"><p className="eyebrow"><i/>{section}</p><h1>{title}</h1><p>{lede}</p><span>SCROLL TO EXPLORE ↓</span></section>
   <section className="detail-list">{items.map((item,i)=><article id={slugify(item.title)} className={`detail-row ${i%2?"reverse":""}`} key={item.title}>
     <MagnifierVisual item={item} index={i}/>
     <div className="detail-copy"><p className="eyebrow"><i/>{item.eyebrow}</p><h2>{item.title}</h2><p>{item.intro}</p><dl>{item.facts.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><small>{item.body}</small></div>
 </article>)}</section><SiteFooter/>
 </main>
}
