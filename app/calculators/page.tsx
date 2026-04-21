import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "All Calculators",
  description:
    "Browse all free British Columbia legal calculators. Notice periods, eviction timelines, security deposits, employment termination, and Small Claims eligibility.",
  alternates: {
    canonical: "https://your-domain.com/calculators",
  },
  openGraph: {
    title: "All Calculators | BC Legal Calculators",
    description:
      "Browse all free British Columbia legal calculators. Notice periods, eviction timelines, security deposits, employment termination, and Small Claims eligibility.",
    url: "https://your-domain.com/calculators",
  },
};

interface CalculatorLink {
  href: string;
  title: string;
  description: string;
}

const calculators: CalculatorLink[] = [
  {
    href: "/calculators/bc/notice-period",
    title: "Notice Period Calculator",
    description: "Determine the required notice period for residential tenancy terminations in BC.",
  },
  {
    href: "/calculators/bc/eviction-timeline",
    title: "Eviction Timeline Calculator",
    description: "Estimate key dates and deadlines in the BC residential eviction process.",
  },
  {
    href: "/calculators/bc/security-deposit",
    title: "Security Deposit Calculator",
    description: "Calculate the deadline for returning a residential tenancy security deposit in BC.",
  },
  {
    href: "/calculators/bc/employment-termination",
    title: "Employment Termination Calculator",
    description: "Estimate statutory notice or pay in lieu for BC employment terminations.",
  },
  {
    href: "/calculators/bc/small-claims",
    title: "Small Claims Calculator",
    description: "Check claim limits and eligibility for BC Small Claims Court.",
  },
];

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

export default function CalculatorsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-navy mb-3">
            British Columbia Calculators
          </h1>
          <p className="text-gray-600 font-sans text-base md:text-lg max-w-2xl">
            Free online tools to help you understand key dates, amounts, and deadlines under British Columbia law.
          </p>
          <div className="mt-3 w-16 h-1 bg-gold rounded-full" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group block bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md hover:border-gold/30"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-serif text-navy group-hover:text-gold-dark transition-colors">
                    {calc.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 font-sans leading-relaxed">
                    {calc.description}
                  </p>
                </div>
                <span className="text-gold text-xl ml-4 shrink-0">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm text-amber-900">
            <strong>Not legal advice.</strong> These tools are for general information only. For advice about your situation, speak with a lawyer or legal clinic.
          </p>
        </div>
      </div>
    </>
  );
}
