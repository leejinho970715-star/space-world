import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"Space World — Step Beyond the Known",description:"An interactive field guide to the Solar System and deep space.",icons:{icon:"/favicon.svg"},openGraph:{title:"Space World — Step Beyond the Known",description:"Explore the Solar System and deep space through an interactive journey.",images:[{url:"/og.png",width:1732,height:909,alt:"Space World space exploration"}]},twitter:{card:"summary_large_image",images:["/og.png"]}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
