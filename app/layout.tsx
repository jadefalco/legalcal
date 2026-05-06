import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

import GlobalNav from "@/app/components/GlobalNav";
import GlobalFooter from "@/app/components/GlobalFooter";

// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

// Metadata (merged + updated for US-first)
export const metadata: Metadata = {
  metadataBase: new URL("https://legalcals.com"),
  title: {
    default: "LegalCals — State-by-State Legal Calculators & Tools",
    template: "%s | LegalCals",
  },
  description:
    "Statute-based legal calculators for eviction timelines, security deposit deadlines, notice periods, and landlord-tenant rules across all 50 US states.",
  keywords: [
    "legal calculators",
    "US legal calculators",
    "state law calculators",
    "eviction calculator",
    "notice period calculator",
    "security deposit calculator",
    "legal timelines",
    "jurisdiction calculators",
    "landlord tenant law",
    "rent increase calculator",
  ],
  authors: [{ name: "LegalCals" }],
  creator: "LegalCals",
  publisher: "LegalCals",
  openGraph: {
    title: "LegalCals — State-by-State Legal Calculators & Tools",
    description:
      "Fast, statute-accurate legal calculators for eviction timelines, deposit deadlines, notice periods, and more.",
    url: "https://legalcals.com",
    siteName: "LegalCals",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LegalCals — Legal Calculators",
    description:
      "Statute-accurate legal calculators for eviction timelines, deposit deadlines, and notice periods.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://legalcals.com",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased font-sans bg-white text-slate-900`}
      >
        <GlobalNav />
        <main className="min-h-[calc(100vh-200px)] bg-white">{children}</main>
        <GlobalFooter />
      </body>
    </html>
  );
}
