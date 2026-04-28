import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "Canada Legal Calculators",
  description:
    "Browse free legal calculators for all Canadian provinces and territories. Eviction timelines, notice periods, security deposits, employment law, and more.",
  alternates: {
    canonical: "https://your-domain.com/calculators/ca",
  },
  openGraph: {
    title: "Canada Legal Calculators | Legal Calculators",
    description:
      "Browse free legal calculators for all Canadian provinces and territories. Eviction timelines, notice periods, security deposits, employment law, and more.",
    url: "https://your-domain.com/calculators/ca",
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
      name: "Canada",
      item: "https://your-domain.com/calculators/ca",
    },
  ],
};

const provinces = [
    { name: "Alberta", slug: "ab", accent: "#003A6C", seal: "/seals/ca/ab.png" },
  { name: "British Columbia", slug: "bc", accent: "#002D62", seal: "/seals/ca/bc.png" },
  { name: "Manitoba", slug: "mb", accent: "#00549F", seal: "/seals/ca/mb.png" },
  { name: "New Brunswick", slug: "nb", accent: "#00205B", seal: "/seals/ca/nb.png" },
  { name: "Newfoundland and Labrador", slug: "nl", accent: "#0055A4", seal: "/seals/ca/nl.png" },
  { name: "Nova Scotia", slug: "ns", accent: "#002D72", seal: "/seals/ca/ns.png" },
  { name: "Northwest Territories", slug: "nt", accent: "#005596", seal: "/seals/ca/nt.png" },
  { name: "Nunavut", slug: "nu", accent: "#FFD520", seal: "/seals/ca/nu.png" },
  { name: "Ontario", slug: "on", accent: "#BF0A30", seal: "/seals/ca/on.png" },
  { name: "Prince Edward Island", slug: "pe", accent: "#00693E", seal: "/seals/ca/pe.png" },
  { name: "Quebec", slug: "qc", accent: "#003DA5", seal: "/seals/ca/qc.png" },
  { name: "Saskatchewan", slug: "sk", accent: "#006A4E", seal: "/seals/ca/sk.png" },
  { name: "Yukon", slug: "yt", accent: "#FFB81C", seal: "/seals/ca/yt.png" }
];

export default function CAIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-navy mb-3">
            Canada Legal Calculators
          </h1>
          <p className="text-gray-600 font-sans text-base md:text-lg max-w-2xl">
            Select your province or territory to access accurate legal
            calculators for employment law, landlord-tenant law, and civil
            claims.
          </p>
          <div className="mt-3 w-16 h-1 bg-gold rounded-full" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {provinces.map((province) => (
            <Link
              key={province.slug}
              href={`/calculators/ca/${province.slug}`}
              className="group block bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md hover:border-gray-200"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={province.seal}
                  alt={`${province.name} seal`}
                  width={48}
                  height={48}
                  className="opacity-80"
                />
                <div>
                  <h2 className="text-lg font-serif text-navy group-hover:text-gray-700 transition-colors">
                    {province.name}
                  </h2>
                  <div
                    className="mt-1 w-12 h-1 rounded-full"
                    style={{ backgroundColor: province.accent }}
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
