"use client";

import { useState } from "react";

export default function Navigation(){
  const [open,setOpen]=useState(false);
  const close=()=>setOpen(false);
  return <>
    <button className={`menu-toggle ${open?"open":""}`} type="button" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="primary-menu" onClick={()=>setOpen(!open)}><span/><span/><span/></button>
    <nav id="primary-menu" className={open?"menu-open":""} aria-label="Primary navigation">
      <a href="/" onClick={close}>Field guide</a>
      <a href="/my-space" onClick={close}>My page</a>
      <a href="/login" onClick={close}>Log in</a>
      <a href="/signup" onClick={close}>Sign up</a>
      <a className="view-app-link" href="/app" onClick={close}>View App <span>↗</span></a>
    </nav>
    {open&&<button className="menu-scrim" type="button" aria-label="Close navigation" onClick={close}/>}
  </>;
}
