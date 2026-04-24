import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "Legal Calculators",
  description:
    "Free legal calculators for the United States and Canada. Eviction timelines, notice periods, security deposits, employment termination, overtime, and small claims.",
  alternates: {
    canonical: "https://your-domain.com/calculators",
  },
  openGraph: {
    title: "Legal Calculators | United States & Canada",
    description:
      "Free legal calculators for the United States and Canada. Eviction timelines, notice periods, security deposits, employment termination, overtime, and small claims.",
    url: "https://your-domain.com/calculators",
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
  ],
};

export default function CalculatorsIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-navy mb-3">
            Legal Calculators
          </h1>
          <p className="text-gray-600 font-sans text-base md:text-lg max-w-2xl">
            Free online legal calculators for the United States and Canada.
            Estimate deadlines, notice periods, and eligibility under local law.
          </p>
          <div className="mt-3 w-16 h-1 bg-gold rounded-full" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Link
            href="/calculators/us"
            className="group block bg-white rounded-xl shadow-sm border border-gray-100 p-8 transition-all hover:shadow-md hover:border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-serif text-navy group-hover:text-gray-700 transition-colors">
                United States
              </h2>
              <span className="text-gray-400 text-2xl">→</span>
            </div>
            <p className="text-gray-600 font-sans">
              Browse calculators for all 50 US states. Employment law,
              landlord-tenant law, wage &amp; hour rules, and civil claims.
            </p>
          </Link>

          <Link
            href="/calculators/ca"
            className="group block bg-white rounded-xl shadow-sm border border-gray-100 p-8 transition-all hover:shadow-md hover:border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-serif text-navy group-hover:text-gray-700 transition-colors">
                Canada
              </h2>
              <span className="text-gray-400 text-2xl">→</span>
            </div>
            <p className="text-gray-600 font-sans">
              Browse calculators for all Canadian provinces and territories.
              Employment standards, residential tenancies, and civil procedure.
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
