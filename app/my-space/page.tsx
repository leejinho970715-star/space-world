import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import { JOURNEY_STAGES } from "../lib/journey";
import { getJourneyProgress } from "../../db/progress";

export const dynamic="force-dynamic";

async function ExplorerProfile(){
  const user=await requireChatGPTUser("/my-space");
  const progress=await getJourneyProgress(user);
  const completed=new Set(progress.completed);
  const percentage=Math.round(progress.completed.length/JOURNEY_STAGES.length*100);
  return <main className="profile-page">
    <header className="space-app-header"><a className="app-brand" href="/"><img src="/logo-cosmos.png" alt=""/><span>SPACE WORLD<small>MY SPACE</small></span></a><nav aria-label="Profile navigation"><a href="/app">View App</a><a href="/">Field guide</a><a href={chatGPTSignOutPath("/")}>Sign out</a></nav></header>
    <section className="profile-hero"><div><p className="app-kicker">EXPLORER PROFILE / ACTIVE</p><h1>{progress.isComplete?"Exploration complete.":"Your place in the journey."}</h1><p>{progress.isComplete?"You crossed all six stages and completed the Space World expedition.":"Your current location, completed stages and next destination are preserved here."}</p></div><div className="profile-person"><span>{user.displayName.slice(0,1).toUpperCase()}</span><div><b>{user.displayName}</b><small>{user.email}</small></div></div></section>
    <section className="profile-grid">
      <aside className="profile-stats"><div><span>COMPLETION</span><b>{percentage}%</b><i><span style={{width:`${percentage}%`}}/></i></div><div><span>STAGES LOGGED</span><b>{progress.completed.length}<small>/ 06</small></b></div><div><span>EXPLORER SINCE</span><b className="profile-date">{new Intl.DateTimeFormat("en",{month:"short",day:"2-digit",year:"numeric"}).format(new Date(progress.createdAt))}</b></div><a href="/app">Continue in App <span>→</span></a></aside>
      <div className="profile-log"><div className="profile-log-head"><div><p className="app-kicker">FLIGHT LOG</p><h2>Earth to orbit.</h2></div><span>{progress.isComplete?"EXPLORATION COMPLETE":"MISSION IN PROGRESS"}</span></div>
        <div className="profile-route">{JOURNEY_STAGES.map((stage,index)=>{const done=completed.has(stage.slug),current=!progress.isComplete&&stage.slug===progress.currentStage;return <article className={`${done?"complete ":""}${current?"current":""}`} key={stage.slug}><div><span>{done?"✓":stage.number}</span><i/></div><img src={stage.image} alt=""/><small>{done?"LOGGED":current?"CURRENT":"LOCKED"}</small><h3>{stage.name}</h3><p>{stage.description}</p>{index<JOURNEY_STAGES.length-1&&<b className="route-arrow">→</b>}</article>})}</div>
        {progress.isComplete&&<div className="profile-complete"><img src="/astronaut-complete.png" alt="Mio celebrating"/><div><p className="app-kicker">EXPLORATION COMPLETE</p><h2>Journey archived.</h2><p>Every destination is connected in your personal history.</p></div><a href="/app">Explore again <span>↗</span></a></div>}
      </div>
    </section>
  </main>;
}

export default function Page(){return <ExplorerProfile/>}
