"use client";

import { useState } from "react";
import { siteNavigation } from "../lib/siteNavigation";

export default function Navigation(){
  const [open,setOpen]=useState(false);
  const close=()=>setOpen(false);
  return <>
    <button className={`menu-toggle ${open?"open":""}`} type="button" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="primary-menu" onClick={()=>setOpen(!open)}><span/><span/><span/></button>
    <nav id="primary-menu" className={open?"menu-open":""} aria-label="Primary navigation">
      {siteNavigation.map(item=>{
        const isAction="action" in item&&item.action;
        const isFeatured="featured" in item&&item.featured;
        return <a className={`${isAction?"nav-action-link":""} ${isFeatured?"view-app-link":""}`.trim()||undefined} href={item.href} onClick={close} key={item.href}>{item.label}{isFeatured?<span>↗</span>:null}</a>;
      })}
    </nav>
    {open&&<button className="menu-scrim" type="button" aria-label="Close navigation" onClick={close}/>}
  </>;
}
