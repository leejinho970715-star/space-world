import Navigation from "../components/Navigation";
import { chatGPTSignInPath, getChatGPTUser } from "../chatgpt-auth";

export const dynamic="force-dynamic";

export default async function Page(){
  const user=await getChatGPTUser();
  return <main className="account-page signup-page"><header className="topbar solid"><a className="brand" href="/"><img className="brand-logo" src="/logo-cosmos.png" alt=""/>SPACE <b>WORLD</b></a><Navigation/></header>
    <section className="account-panel"><div className="account-art"><span className="account-orbit"/><img src="/astronaut-flight.png" alt="Mio beginning a new flight"/><small>NEW FLIGHT / 001</small></div><div className="account-copy"><p className="app-kicker">JOIN THE MISSION</p><h1>Create your<br/><span>explorer profile.</span></h1><p>Your ChatGPT identity securely creates a Space World profile. Your six-stage Flight Log begins at Earth.</p><ol><li><b>01</b><span>Connect your identity</span></li><li><b>02</b><span>Begin at Earth</span></li><li><b>03</b><span>Complete the universe</span></li></ol>{user?<a className="account-primary" href="/app">Start exploring <span>→</span></a>:<a className="account-primary" href={chatGPTSignInPath("/app")}>Sign up with ChatGPT <span>→</span></a>}<small>Already have a Flight Log? <a href="/login">Log in</a></small></div></section>
  </main>;
}
