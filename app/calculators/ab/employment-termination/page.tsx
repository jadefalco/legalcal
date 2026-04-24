import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import EmploymentTerminationClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Alberta Employment Termination Calculator",
  description:
    "Estimate minimum notice or pay in lieu under Alberta’s Employment Standards Code based on length of service and reason for termination.",
  alternates: {
    canonical:
      "https://your-domain.com/calculators/ab/employment-termination",
  },
  openGraph: {
    title: "Alberta Employment Termination Calculator",
    description:
      "Calculate minimum statutory notice or pay in lieu for Alberta employees based on length of service and termination type.",
    url: "https://your-domain.com/calculators/ab/employment-termination",
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
      name: "Employment Termination",
      item: "https://your-domain.com/calculators/ab/employment-termination",
    },
  ],
};

export default function AlbertaEmploymentTerminationPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-navy mb-4">
          Alberta Employment Termination Calculator
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Estimate minimum statutory notice or pay in lieu under Alberta’s
          Employment Standards Code, based on length of service and the reason
          for termination.
        </p>

        <div className="h-1 w-20 bg-[#0077C8] rounded-full mb-8" />

        <EmploymentTerminationClient />
      </div>
    </>
  );
}