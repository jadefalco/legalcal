import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import OntarioSmallClaimsClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Ontario Small Claims Court Calculator",
  description:
    "Determine eligibility, filing fees, service deadlines, and hearing timelines for Ontario Small Claims Court.",
  alternates: {
    canonical: "https://your-domain.com/calculators/on/small-claims",
  },
  openGraph: {
    title: "Ontario Small Claims Court Calculator",
    description:
      "Estimate timelines and requirements for filing a small claim in Ontario, including monetary limits and service rules.",
    url: "https://your-domain.com/calculators/on/small-claims",
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
      name: "Ontario",
      item: "https://your-domain.com/calculators/on",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Small Claims",
      item: "https://your-domain.com/calculators/on/small-claims",
    },
  ],
};

export default function OntarioSmallClaimsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-navy mb-4">
          Ontario Small Claims Court Calculator
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Determine eligibility, filing fees, service deadlines, and hearing
          timelines for Ontario Small Claims Court.
        </p>

        <div className="h-1 w-20 bg-[#00205B] rounded-full mb-8" />

        <OntarioSmallClaimsClient />
      </div>
    </>
  );
}