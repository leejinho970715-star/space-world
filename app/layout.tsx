import type { Metadata } from "next";
import "./globals.css";

const siteTitle = "Space World — Step Beyond the Known";
const siteDescription = "Explore planets, asteroids, galaxies, constellations, satellites and NASA spacecraft through an immersive, interactive journey across the universe.";
const socialImage = "https://leejinho970715-star.github.io/space-world/og.png";

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
      url: socialImage,
      width: 1254,
      height: 1254,
      alt: "Space World astronaut exploring a vivid universe",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
