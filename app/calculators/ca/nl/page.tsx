import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/app/components/JsonLd";
import { caProvinces } from "@/app/config/caProvinces";
import { calculators } from "@/app/config/calculators";

const province = caProvinces["nl"];

export const metadata: Metadata = {
  title: "Newfoundland and Labrador Legal Calculators",
  description:
    "Free legal calculators for Newfoundland and Labrador. Eviction timelines, notice periods, security deposits, employment termination, and more.",
  alternates: {
    canonical: "https://your-domain.com/calculators/ca/nl",
  },
  openGraph: {
    title: "Newfoundland and Labrador Legal Calculators | Legal Calculators",
    description:
      "Free legal calculators for Newfoundland and Labrador. Eviction timelines, notice periods, security deposits, employment termination, and more.",
    url: "https://your-domain.com/calculators/ca/nl",
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
    {
      "@type": "ListItem",
      position: 4,
      name: "Newfoundland and Labrador",
      item: "https://your-domain.com/calculators/ca/nl",
    },
  ],
};

export default function ProvinceIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            {province.seal && (
              <Image
                src={province.seal}
                alt="Newfoundland and Labrador seal"
                width={60}
                height={60}
                className="opacity-80"
              />
            )}
            <h1 className="text-3xl md:text-4xl font-serif text-navy">
              Newfoundland and Labrador Legal Calculators
            </h1>
          </div>
          <p className="text-gray-600 font-sans text-base md:text-lg max-w-2xl">
            Free online legal calculators for Newfoundland and Labrador. Estimate deadlines,
            notice periods, and eligibility under Newfoundland and Labrador law.
          </p>
          <div
            className="mt-3 w-20 h-1 rounded-full"
            style={{ backgroundColor: province.accent }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {calculators.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/ca/nl/${calc.slug}`}
              className="group block bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md hover:border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-serif text-navy group-hover:text-gray-700 transition-colors">
                    {calc.name}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 font-sans leading-relaxed">
                    {calc.description}
                  </p>
                </div>
                <span className="text-gray-400 text-xl ml-4 shrink-0">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
