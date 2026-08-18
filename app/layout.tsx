import type { Metadata } from "next";
import "./globals.css";

const siteTitle = "Space World — Explorer App";
const siteDescription = "Complete a six-stage journey from Earth to Satellites, record every discovery in your Flight Log, and become a Space World explorer.";
const socialImage = "https://cosmos-ar-explorer.leejinho970715.chatgpt.site/og-app.png";

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
      width: 1536,
      height: 1024,
      alt: "Space World Explorer App Flight Log journey",
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
