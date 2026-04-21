import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Link from "next/link";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "BC Tenancy & Employment Law Calculators",
    template: "%s | BC Legal Calculators",
  },
  description:
    "Free, easy-to-use legal calculators for British Columbia. Estimate notice periods, eviction timelines, deposit deadlines, employment termination entitlements, and Small Claims eligibility.",
  keywords: [
    "BC legal calculators",
    "BC tenancy notice calculator",
    "BC eviction timeline",
    "BC employment termination notice",
    "BC security deposit deadline",
    "BC small claims eligibility",
    "British Columbia tenancy law",
    "BC employment law tools",
    "BC landlord tenant calculator",
    "BC notice period estimator",
  ],
  authors: [{ name: "BC Legal Calculators" }],
  creator: "BC Legal Calculators",
  publisher: "BC Legal Calculators",
  openGraph: {
    title: "BC Tenancy & Employment Law Calculators",
    description:
      "Free legal calculators for British Columbia. Quickly estimate notice periods, eviction timelines, deposit deadlines, and employment entitlements.",
    url: "https://your-domain.com",
    siteName: "BC Legal Calculators",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BC Tenancy & Employment Law Calculators",
    description:
      "Free legal calculators for British Columbia. Estimate notice periods, eviction timelines, deposit deadlines, and employment entitlements.",
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
    canonical: "https://your-domain.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA">
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased font-sans`}
      >
        <header className="bg-navy text-white py-5">
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
            <Link href="/" className="group">
              <h1 className="text-2xl md:text-3xl font-serif text-gold tracking-tight group-hover:text-gold-light transition-colors">
                Legal Calculators
              </h1>
              <p className="text-sm text-gray-300 mt-0.5 font-sans">
                British Columbia Law Tools
              </p>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/calculators"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Calculators
              </Link>
            </nav>
          </div>
        </header>
        <main className="min-h-[calc(100vh-160px)] bg-gray-50">
          {children}
        </main>
        <footer className="bg-navy text-white py-6">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Legal Calculators. For informational purposes only. Not legal advice.</p>
            <p className="text-xs">Not affiliated with the Government of British Columbia.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
