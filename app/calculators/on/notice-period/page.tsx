import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import OntarioNoticeClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Ontario Notice Period Calculator",
  description:
    "Calculate the required notice period for landlords and tenants under Ontario’s Residential Tenancies Act (RTA).",
  alternates: {
    canonical: "https://your-domain.com/calculators/on/notice-period",
  },
  openGraph: {
    title: "Ontario Notice Period Calculator",
    description:
      "Determine the correct notice period for eviction or termination of tenancy in Ontario.",
    url: "https://your-domain.com/calculators/on/notice-period",
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
      name: "Notice Period",
      item: "https://your-domain.com/calculators/on/notice-period",
    },
  ],
};

export default function OntarioNoticePeriodPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-navy mb-4">
          Ontario Notice Period Calculator
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Calculate the required notice period for landlords and tenants under
          Ontario’s Residential Tenancies Act (RTA), including N4, N5, N7, N12,
          N13, and tenant termination rules.
        </p>

        <div className="h-1 w-20 bg-[#00205B] rounded-full mb-8" />

        <OntarioNoticeClient />
      </div>
    </>
  );
}