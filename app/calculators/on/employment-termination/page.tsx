import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import OntarioEmploymentTerminationClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Ontario Employment Termination Calculator",
  description:
    "Calculate minimum notice, termination pay, and severance pay under Ontario’s Employment Standards Act (ESA).",
  alternates: {
    canonical: "https://your-domain.com/calculators/on/employment-termination",
  },
  openGraph: {
    title: "Ontario Employment Termination Calculator",
    description:
      "Estimate ESA minimum notice, termination pay, and severance pay based on years of service and employer size.",
    url: "https://your-domain.com/calculators/on/employment-termination",
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
      name: "Employment Termination",
      item: "https://your-domain.com/calculators/on/employment-termination",
    },
  ],
};

export default function OntarioEmploymentTerminationPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-navy mb-4">
          Ontario Employment Termination Calculator
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Estimate minimum notice, termination pay, and severance pay under
          Ontario’s Employment Standards Act (ESA), based on years of service,
          employer payroll, and weekly earnings.
        </p>

        <div className="h-1 w-20 bg-[#00205B] rounded-full mb-8" />

        <OntarioEmploymentTerminationClient />
      </div>
    </>
  );
}