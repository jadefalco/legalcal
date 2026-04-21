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
  metadataBase: new URL("https://legalcals.com"),
  title: {
    default: "LegalCals — Legal Calculators for BC, AB, and ON",
    template: "%s | LegalCals",
  },
  description:
    "Accurate legal calculators for tenancy, employment, and small claims law across Canada. Free, fast, and easy to use.",
  keywords: [
    "legal calculators",
    "BC legal calculators",
    "AB legal calculators",
    "ON legal calculators",
    "tenancy calculator",
    "eviction timeline calculator",
    "employment termination calculator",
    "security deposit calculator",
    "small claims calculator",
    "Canadian law tools",
  ],
  authors: [{ name: "LegalCals" }],
  creator: "LegalCals",
  publisher: "LegalCals",
  openGraph: {
    title: "LegalCals — Legal Calculators for Canada",
    description:
      "Free legal calculators for tenancy, employment, and small claims law across Canada.",
    url: "https://legalcals.com",
    siteName: "LegalCals",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LegalCals — Legal Calculators",
    description:
      "Free legal calculators for tenancy, employment, and small claims law across Canada.",
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
    icon: "/favicon.png", // ⭐ Your favicon is now active
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
            <Link href="/" className="group flex items-center gap-3">
              <img
                src="/logo-blue.png"
                alt="LegalCals Logo"
                className="h-12 w-auto md:h-14 group-hover:brightness-110 transition-filter"
              />
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
            <p>
              © {new Date().getFullYear()} LegalCals. For informational purposes
              only. Not legal advice.
            </p>
            <p className="text-xs">
              Not affiliated with the Government of British Columbia.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}