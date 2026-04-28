import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "United States Legal Calculators",
  description:
    "Browse free legal calculators for all 50 US states. Eviction timelines, notice periods, security deposits, employment law, and more.",
  alternates: {
    canonical: "https://your-domain.com/calculators/us",
  },
  openGraph: {
    title: "United States Legal Calculators | Legal Calculators",
    description:
      "Browse free legal calculators for all 50 US states. Eviction timelines, notice periods, security deposits, employment law, and more.",
    url: "https://your-domain.com/calculators/us",
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
      name: "United States",
      item: "https://your-domain.com/calculators/us",
    },
  ],
};

const states = [
  /* STATES_ARRAY */
];

export default function USIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-navy mb-3">
            United States Legal Calculators
          </h1>
          <p className="text-gray-600 font-sans text-base md:text-lg max-w-2xl">
            Select your state to access accurate legal calculators for
            employment law, landlord-tenant law, wage &amp; hour rules, and civil
            claims.
          </p>
          <div className="mt-3 w-16 h-1 bg-gold rounded-full" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {states.map((state) => (
            <Link
              key={state.slug}
              href={`/calculators/us/${state.slug}`}
              className="group block bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md hover:border-gray-200"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={state.seal}
                  alt={`${state.name} state seal`}
                  width={48}
                  height={48}
                  className="opacity-80"
                />
                <div>
                  <h2 className="text-lg font-serif text-navy group-hover:text-gray-700 transition-colors">
                    {state.name}
                  </h2>
                  <div
                    className="mt-1 w-12 h-1 rounded-full"
                    style={{ backgroundColor: state.accent }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
