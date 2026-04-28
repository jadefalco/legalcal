import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "Alaska Legal Calculators",
  description:
    "Free legal calculators for Alaska. Eviction timelines, notice periods, security deposits, employment termination, and more.",
  alternates: {
    canonical: "https://your-domain.com/calculators/us/ak",
  },
  openGraph: {
    title: "Alaska Legal Calculators | Legal Calculators",
    description:
      "Free legal calculators for Alaska. Eviction timelines, notice periods, security deposits, employment termination, and more.",
    url: "https://your-domain.com/calculators/us/ak",
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
    {
      "@type": "ListItem",
      position: 4,
      name: "Alaska",
      item: "https://your-domain.com/calculators/us/ak",
    },
  ],
};

const calculators = [
    { name: "Eviction Timeline", slug: "eviction-timeline", description: "Calculate eviction timelines and key deadlines for your jurisdiction." },
  { name: "Notice Period", slug: "notice-period", description: "Calculate notice period requirements for residential and employment terminations." },
  { name: "Security Deposit Return", slug: "security-deposit-return", description: "Calculate security deposit return deadlines and allowable deductions." },
  { name: "Rent Increase Limits", slug: "rent-increase-limits", description: "Explain rent increase limits, notice requirements, and exemption rules." },
  { name: "Final Paycheck Deadline", slug: "final-paycheck-deadline", description: "Calculate final paycheck deadlines and accrued vacation payouts." },
  { name: "Overtime Calculator", slug: "overtime-calculator", description: "Estimate overtime pay rules and eligibility for your jurisdiction." },
  { name: "Small Claims Eligibility", slug: "small-claims-eligibility", description: "Explain small claims court eligibility, limits, and filing procedures." }
];

export default function StateIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src="/seals/us/ak.png"
              alt="Alaska state seal"
              width={60}
              height={60}
              className="opacity-80"
            />
            <h1 className="text-3xl md:text-4xl font-serif text-navy">
              Alaska Legal Calculators
            </h1>
          </div>
          <p className="text-gray-600 font-sans text-base md:text-lg max-w-2xl">
            Free online legal calculators for Alaska. Estimate deadlines,
            notice periods, and eligibility under Alaska law.
          </p>
          <div
            className="mt-3 w-20 h-1 rounded-full"
            style={{ backgroundColor: "#0F204B" }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {calculators.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/us/ak/${calc.slug}`}
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
