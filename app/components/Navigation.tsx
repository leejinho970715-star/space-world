"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation(){
  const [open,setOpen]=useState(false);
  const close=()=>setOpen(false);
  return <>
    <button className={`menu-toggle ${open?"open":""}`} type="button" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="primary-menu" onClick={()=>setOpen(!open)}><span/><span/><span/></button>
    <nav id="primary-menu" className={open?"menu-open":""} aria-label="Primary navigation">
      <Link href="/" onClick={close}>Field guide</Link>
      <Link href="/planets" onClick={close}>Planets</Link>
      <Link href="/deep-space" onClick={close}>Deep space</Link>
      <Link href="/orbit-data" onClick={close}>Orbit data</Link>
      <Link href="/spacecraft" onClick={close}>NASA spacecraft</Link>
      <Link href="/ar-experience" onClick={close}>AR Experience</Link>
    </nav>
    {open&&<button className="menu-scrim" type="button" aria-label="Close navigation" onClick={close}/>}
  </>;
}
