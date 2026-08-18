import { exploreNavigation, explorerNavigation } from "../lib/siteNavigation";

export default function SiteFooter({compact=false}:{compact?:boolean}){
  return <footer className={`site-footer${compact?" compact":""}`}>
    <div className="footer-brand-block">
      <a className="brand" href="/" aria-label="Space World home"><img className="brand-logo" src="/logo-cosmos.png" alt=""/>SPACE <b>WORLD</b></a>
      <p>A FIELD GUIDE TO THE OBSERVABLE UNIVERSE.</p>
    </div>
    <nav className="footer-sitemap" aria-label="Explore sitemap"><strong>EXPLORE</strong>{exploreNavigation.map(item=><a href={item.href} key={item.href}>{item.label}</a>)}</nav>
    <nav className="footer-sitemap" aria-label="Explorer account sitemap"><strong>EXPLORER</strong>{explorerNavigation.map(item=><a href={item.href} key={item.href}>{item.label}</a>)}</nav>
    <div className="footer-credit"><small>© 2026 SPACE WORLD</small><small>Developed By Eungyu Lee</small></div>
  </footer>;
}
