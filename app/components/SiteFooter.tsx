import Link from "next/link";

export default function SiteFooter({compact=false}:{compact?:boolean}){
  return <footer className={`site-footer${compact?" compact":""}`}>
    <Link className="brand" href="/" aria-label="Space World home">
      <img className="brand-logo" src="/logo-cosmos.png" alt=""/>
      SPACE <b>WORLD</b>
    </Link>
    <p>A FIELD GUIDE TO THE OBSERVABLE UNIVERSE.</p>
    <div className="footer-credit"><small>© 2026 SPACE WORLD</small><small>Developed By Eungyu Lee</small></div>
  </footer>;
}
