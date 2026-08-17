"use client";

import { useState } from "react";

export default function Navigation(){
  const [open,setOpen]=useState(false);
  const close=()=>setOpen(false);
  return <>
    <button className={`menu-toggle ${open?"open":""}`} type="button" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="primary-menu" onClick={()=>setOpen(!open)}><span/><span/><span/></button>
    <nav id="primary-menu" className={open?"menu-open":""} aria-label="Primary navigation">
      <a href="/" onClick={close}>Field guide</a>
      <a href="/planets" onClick={close}>Planets</a>
      <a href="/deep-space" onClick={close}>Deep space</a>
      <a href="/orbit-data" onClick={close}>Orbit data</a>
      <a href="/spacecraft" onClick={close}>NASA spacecraft</a>
      <a href="/ar-experience" onClick={close}>AR Experience</a>
    </nav>
    {open&&<button className="menu-scrim" type="button" aria-label="Close navigation" onClick={close}/>}
  </>;
}
