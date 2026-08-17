import gsap from "gsap";

const headlineSelector=".story-line strong,.section-head h2,.belt-copy h2,.galaxy-copy h2,.constellation-copy h2,.satellite-copy h2,.weather-heading h2,.transition-copy h2,.deep-title h2,.planet-copy h3,.object-meta h3,.finale h2,.sub-hero h1,.detail-copy h2";
const numberSelector=".altimeter b,.planet-index,.planet-copy dd,.object-meta b,.signal-detail p,.galaxy-sticky dd,.satellite-copy dd,.weather-grid strong,.journey-step b,.detail-copy dd,.detail-visual>span";

function splitIntoChars(element:HTMLElement){
  element.setAttribute("aria-label",element.innerText.replace(/\s+/g," ").trim());
  const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);const nodes:Text[]=[];let node:Node|null;
  while((node=walker.nextNode()))nodes.push(node as Text);
  const chars:HTMLElement[]=[];
  nodes.forEach(text=>{const fragment=document.createDocumentFragment();[...text.data].forEach(char=>{const span=document.createElement("span");span.className="type-char";span.setAttribute("aria-hidden","true");span.textContent=char;fragment.appendChild(span);chars.push(span)});text.parentNode?.replaceChild(fragment,text)});
  return chars;
}

export function animateContent(scope:HTMLElement){
  scope.querySelectorAll<HTMLElement>(headlineSelector).forEach((heading)=>{
    if(heading.dataset.typed)return;heading.dataset.typed="true";
    const chars=splitIntoChars(heading),isNightSky=heading.matches(".constellation-copy h2");
    gsap.from(chars,isNightSky?{opacity:0,y:".75em",scale:.55,rotation:4,duration:.42,stagger:.038,ease:"back.out(2.4)",scrollTrigger:{trigger:heading,start:"top 84%",once:true}}:{opacity:0,y:".18em",duration:.03,stagger:.025,ease:"none",scrollTrigger:{trigger:heading,start:"top 88%",once:true}});
  });
  scope.querySelectorAll<HTMLElement>(".constellation-copy>p:last-child").forEach((paragraph)=>{if(paragraph.dataset.typed)return;paragraph.dataset.typed="true";const chars=splitIntoChars(paragraph);gsap.from(chars,{opacity:0,y:".9em",scale:.5,duration:.36,stagger:.018,ease:"back.out(2.2)",scrollTrigger:{trigger:paragraph,start:"top 88%",once:true}})});
  scope.querySelectorAll<HTMLElement>(numberSelector).forEach((element)=>{
    if(element.dataset.counted)return;element.dataset.counted="true";
    const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);const nodes:Text[]=[];let node:Node|null;
    while((node=walker.nextNode()))nodes.push(node as Text);
    nodes.forEach(text=>{const original=text.data;const matches=[...original.matchAll(/\d[\d,.]*/g)];if(!matches.length)return;const values=matches.map(m=>Number(m[0].replaceAll(",","")));const decimals=matches.map(m=>(m[0].split(".")[1]||"").length);const state={progress:0};gsap.to(state,{progress:1,duration:1.35,ease:"power2.out",scrollTrigger:{trigger:element,start:"top 92%",once:true},onUpdate:()=>{let index=0;text.data=original.replace(/\d[\d,.]*/g,()=>{const output=(values[index]*state.progress).toLocaleString("en-US",{minimumFractionDigits:decimals[index],maximumFractionDigits:decimals[index]});index++;return output})}})});
  });
}
