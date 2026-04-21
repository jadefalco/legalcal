import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "Alberta Calculators",
  description:
    "Alberta legal calculators are coming soon. Check back for notice periods, eviction timelines, security deposit deadlines, employment termination, and Small Claims tools.",
  alternates: {
    canonical: "https://your-domain.com/calculators/ab",
  },
  openGraph: {
    title: "Alberta Calculators | BC Legal Calculators",
    description:
      "Alberta legal calculators are coming soon. Notice periods, eviction timelines, security deposits, employment termination, and Small Claims tools.",
    url: "https://your-domain.com/calculators/ab",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://your-domain.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculators",
      item: "https://your-domain.com/calculators",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Alberta",
      item: "https://your-domain.com/calculators/ab",
    },
  ],
};

export default function AlbertaPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-navy mb-3">
            Alberta Calculators
          </h1>
          <p className="text-gray-600 font-sans text-base md:text-lg max-w-2xl">
            Alberta legal calculators are currently in development. Explore our available British Columbia calculators below, or check back soon for Alberta tools.
          </p>
          <div className="mt-3 w-16 h-1 bg-gold rounded-full" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Notice Period Calculator", slug: "notice-period" },
            { title: "Eviction Timeline Calculator", slug: "eviction-timeline" },
            { title: "Security Deposit Calculator", slug: "security-deposit" },
            { title: "Employment Termination Calculator", slug: "employment-termination" },
            { title: "Small Claims Calculator", slug: "small-claims" },
          ].map((calc) => (
            <div
              key={calc.slug}
              className="block bg-white rounded-xl shadow-sm border border-gray-100 p-6 opacity-70"
            >
              <h2 className="text-lg font-serif text-navy">{calc.title}</h2>
              <p className="mt-2 text-sm text-gray-600">Coming soon.</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/calculators"
            className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-navy-light transition-colors"
          >
            ← Browse BC Calculators
          </Link>
        </div>
      </div>
    </>
  );
}
