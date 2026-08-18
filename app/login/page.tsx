import Navigation from "../components/Navigation";
import { chatGPTSignInPath, getChatGPTUser } from "../chatgpt-auth";

export const dynamic="force-dynamic";

export default async function Page(){
  const user=await getChatGPTUser();
  return <main className="account-page"><header className="topbar solid"><a className="brand" href="/"><img className="brand-logo" src="/logo-cosmos.png" alt=""/>SPACE <b>WORLD</b></a><Navigation/></header>
    <section className="account-panel"><div className="account-art"><span className="account-orbit"/><img src="/astronaut-guide.png" alt="Mio welcoming an explorer"/><small>IDENTITY LINK / SECURE</small></div><div className="account-copy"><p className="app-kicker">EXPLORER ACCESS</p><h1>Return to<br/><span>your journey.</span></h1><p>Sign in to restore your Flight Log, current location and exploration progress across every stage.</p>{user?<a className="account-primary" href="/app">Continue as {user.displayName} <span>→</span></a>:<a className="account-primary" href={chatGPTSignInPath("/app")}>Log in with ChatGPT <span>→</span></a>}<small>New explorer? <a href="/signup">Create your profile</a></small></div></section>
  </main>;
}
