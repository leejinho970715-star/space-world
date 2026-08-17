import gsap from "gsap";

const headlineSelector=".story-line strong,.section-head h2,.belt-copy h2,.galaxy-copy h2,.satellite-copy h2,.weather-heading h2,.transition-copy h2,.deep-title h2,.planet-copy h3,.object-meta h3,.finale h2,.sub-hero h1,.detail-copy h2";
const numberSelector=".altimeter b,.planet-index,.planet-copy dd,.object-meta b,.signal-detail p,.galaxy-sticky dd,.satellite-copy dd,.weather-grid strong,.journey-step b,.detail-copy dd,.detail-visual>span";

export function animateContent(scope:HTMLElement){
  scope.querySelectorAll<HTMLElement>(headlineSelector).forEach((heading)=>{if(heading.dataset.animated)return;heading.dataset.animated="true";gsap.from(heading,{opacity:0,y:32,duration:.75,ease:"power3.out",scrollTrigger:{trigger:heading,start:"top 50%",once:true}})});
  const constellationChars=scope.querySelectorAll<HTMLElement>(".constellation-copy .type-char");
  if(constellationChars.length)gsap.from(constellationChars,{opacity:0,y:".8em",scale:.55,rotation:4,duration:.42,stagger:.025,ease:"back.out(2.4)",scrollTrigger:{trigger:".constellation-copy",start:"top 50%",once:true}});
  scope.querySelectorAll<HTMLElement>(numberSelector).forEach((element)=>{
    if(element.dataset.counted)return;element.dataset.counted="true";
    const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);const nodes:Text[]=[];let node:Node|null;
    while((node=walker.nextNode()))nodes.push(node as Text);
    nodes.forEach(text=>{const original=text.data;const matches=[...original.matchAll(/\d[\d,.]*/g)];if(!matches.length)return;const values=matches.map(m=>Number(m[0].replaceAll(",","")));const decimals=matches.map(m=>(m[0].split(".")[1]||"").length);const state={progress:0};gsap.to(state,{progress:1,duration:1.35,ease:"power2.out",scrollTrigger:{trigger:element,start:"top 50%",once:true},onUpdate:()=>{let index=0;text.data=original.replace(/\d[\d,.]*/g,()=>{const output=(values[index]*state.progress).toLocaleString("en-US",{minimumFractionDigits:decimals[index],maximumFractionDigits:decimals[index]});index++;return output})}})});
  });
}
