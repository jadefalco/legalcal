import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import SecurityDepositClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Alberta Security Deposit Calculator",
  description:
    "Check maximum security deposit limits, return deadlines, and interest rules under Alberta’s Residential Tenancies Act.",
  alternates: {
    canonical: "https://your-domain.com/calculators/ab/security-deposit",
  },
  openGraph: {
    title: "Alberta Security Deposit Calculator",
    description:
      "Determine if a security deposit complies with Alberta law, including maximum amounts, return deadlines, and interest rules.",
    url: "https://your-domain.com/calculators/ab/security-deposit",
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
      name: "Security Deposit",
      item: "https://your-domain.com/calculators/ab/security-deposit",
    },
  ],
};

export default function AlbertaSecurityDepositPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-navy mb-4">
          Alberta Security Deposit Calculator
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Check whether a security deposit complies with Alberta law, including
          maximum amounts, return deadlines, and interest rules under the
          Residential Tenancies Act.
        </p>

        <div className="h-1 w-20 bg-[#0077C8] rounded-full mb-8" />

        <SecurityDepositClient />
      </div>
    </>
  );
}