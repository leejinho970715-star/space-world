import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COSMOS / AR — 우주를 걷는 순간",
  description: "스크롤로 태양계와 딥 스페이스를 여행하는 인터랙티브 우주 탐사 경험",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "COSMOS / AR — 우주를 걷는 순간",
    description: "스크롤로 태양계와 딥 스페이스를 여행하세요.",
    images: [{ url: "/og.png", width: 1732, height: 909, alt: "COSMOS / AR 우주 탐사" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
