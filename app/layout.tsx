import type { Metadata } from "next";
import "./globals.css";

const siteTitle = "Space World — Step Beyond the Known";
const siteDescription = "Explore planets, asteroids, galaxies, constellations, satellites and NASA spacecraft through an immersive, interactive journey across the universe.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Space World",
    title: siteTitle,
    description: siteDescription,
    images: [{
      url: "/og.png",
      width: 1732,
      height: 909,
      alt: "Space World interactive universe exploration",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
