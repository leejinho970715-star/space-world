"use client";

import { useMemo, useState } from "react";
import { JOURNEY_STAGES, type JourneyStageSlug } from "../lib/journey";
import type { JourneyProgress } from "../../db/progress";

export default function AppJourney({initialProgress,explorerName}:{initialProgress:JourneyProgress;explorerName:string}){
  const [progress,setProgress]=useState(initialProgress);
  const [activeSlug,setActiveSlug]=useState<JourneyStageSlug>(initialProgress.currentStage);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");
  const activeIndex=JOURNEY_STAGES.findIndex(stage=>stage.slug===activeSlug);
  const activeStage=JOURNEY_STAGES[activeIndex];
  const completedCount=progress.completed.length;
  const percentage=Math.round(completedCount/JOURNEY_STAGES.length*100);
  const unlockedIndex=Math.min(completedCount,JOURNEY_STAGES.length-1);
  const activeCompleted=progress.completed.includes(activeSlug);
  const canComplete=!progress.isComplete&&!activeCompleted&&activeIndex===unlockedIndex;
  const statusLabel=progress.isComplete?"Exploration Complete":`${completedCount} of ${JOURNEY_STAGES.length} stages complete`;

  const missionCopy=useMemo(()=>progress.isComplete
    ?"Your complete route is now preserved in the Flight Log. The universe is ready for another pass."
    :`Current location: ${JOURNEY_STAGES[unlockedIndex].name}. Complete this stage to unlock the next destination.`,[progress.isComplete,unlockedIndex]);

  const completeStage=async()=>{
    if(!canComplete||saving)return;
    setSaving(true);setError("");
    try{
      const response=await fetch("/api/progress",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({stage:activeSlug})});
      if(!response.ok)throw new Error("Flight Log could not be updated.");
      const next=await response.json() as JourneyProgress;
      setProgress(next);
      if(!next.isComplete)setActiveSlug(next.currentStage);
    }catch(reason){setError(reason instanceof Error?reason.message:"Flight Log could not be updated.")}
    finally{setSaving(false)}
  };

  return <main className="space-app-shell">
    <header className="space-app-header">
      <a className="app-brand" href="/"><img src="/logo-cosmos.png" alt=""/><span>SPACE WORLD<small>EXPLORER APP</small></span></a>
      <div className="app-header-status"><span className="status-pulse"/>MISSION ONLINE</div>
      <nav aria-label="App navigation"><a href="/">Field guide</a><a href="/my-space">My page</a><a href="/signout-with-chatgpt?return_to=/">Sign out</a></nav>
    </header>

    <section className="app-dashboard">
      <aside className="app-sidebar">
        <div><p className="app-kicker">FLIGHT LOG / 2026</p><h1>Welcome back,<br/><span>{explorerName}.</span></h1><p>{missionCopy}</p></div>
        <div className="app-progress-summary"><div><span>JOURNEY PROGRESS</span><b>{percentage}%</b></div><i><span style={{width:`${percentage}%`}}/></i><small>{statusLabel}</small></div>
        <a className="app-profile-link" href="/my-space">Open explorer profile <span>→</span></a>
      </aside>

      <div className="app-mission-area">
        <div className="app-mission-toolbar"><div><small>CURRENT TRAJECTORY</small><b>{progress.isComplete?"Journey archived":activeStage.name}</b></div><span>SPACE WORLD / FLIGHT 001</span></div>

        <div className="app-stage-rail" aria-label="Exploration stages">
          {JOURNEY_STAGES.map((stage,index)=>{
            const complete=progress.completed.includes(stage.slug),active=stage.slug===activeSlug,locked=index>unlockedIndex&&!complete;
            return <button key={stage.slug} className={`${active?"active ":""}${complete?"complete ":""}${locked?"locked":""}`} disabled={locked} onClick={()=>setActiveSlug(stage.slug)} aria-label={`${stage.name}${complete?", complete":locked?", locked":", current"}`}>
              <span>{complete?"✓":stage.number}</span><b>{stage.name}</b><i/>
            </button>;
          })}
        </div>

        <article className={`app-stage-card${progress.isComplete?" journey-complete":""}`}>
          <div className="app-stage-visual"><span className="app-orbit orbit-one"/><span className="app-orbit orbit-two"/><img src={progress.isComplete?"/astronaut-complete.png":activeStage.image} alt={progress.isComplete?"Mio celebrating a complete exploration":`${activeStage.name} stage`}/><small>{progress.isComplete?"ALL SYSTEMS COMPLETE":`${activeStage.number} / 06`}</small></div>
          <div className="app-stage-copy">
            <p className="app-kicker">{progress.isComplete?"EXPLORATION COMPLETE":activeStage.eyebrow}</p>
            <h2>{progress.isComplete?<>One journey.<br/><span>Fully crossed.</span></>:activeStage.title}</h2>
            <p>{progress.isComplete?"Earth, planets, ancient debris, the Milky Way, constellations and orbit are now connected in your personal Flight Log.":activeStage.description}</p>
            {error&&<p className="app-error" role="alert">{error}</p>}
            <div className="app-stage-actions">
              {progress.isComplete?<><a className="app-primary" href="/my-space">View completed log <span>→</span></a><a href="/">Return to field guide</a></>:
              <><button className="app-primary" type="button" disabled={!canComplete||saving} onClick={completeStage}>{activeCompleted?"Stage complete":saving?"Updating log…":"Complete this stage"}<span>→</span></button><small>{activeCompleted?"Recorded in your Flight Log":canComplete?"Completing unlocks the next destination":"Complete the current stage first"}</small></>}
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>;
}
