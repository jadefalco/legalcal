import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import NoticePeriodClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Alberta Notice Period Calculator",
  description:
    "Calculate the minimum notice required for landlords or tenants under Alberta’s Residential Tenancies Act. Covers monthly, weekly, and fixed-term tenancies.",
  alternates: {
    canonical: "https://your-domain.com/calculators/ab/notice-period",
  },
  openGraph: {
    title: "Alberta Notice Period Calculator",
    description:
      "Determine the correct notice period for landlords or tenants under Alberta law.",
    url: "https://your-domain.com/calculators/ab/notice-period",
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
    {
      "@type": "ListItem",
      position: 4,
      name: "Notice Period",
      item: "https://your-domain.com/calculators/ab/notice-period",
    },
  ],
};

export default function AlbertaNoticePeriodPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-navy mb-4">
          Alberta Notice Period Calculator
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Determine the minimum notice required for landlords or tenants under
          Alberta’s Residential Tenancies Act (RTA). This tool covers monthly,
          weekly, and fixed-term tenancies.
        </p>

        <div className="h-1 w-20 bg-[#0077C8] rounded-full mb-8" />

        <NoticePeriodClient />
      </div>
    </>
  );
}