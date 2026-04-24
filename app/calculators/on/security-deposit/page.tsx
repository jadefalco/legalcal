import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import OntarioSecurityDepositClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Ontario Security Deposit Calculator",
  description:
    "Understand Ontario’s rules for last month’s rent, interest, and prohibited security deposits under the Residential Tenancies Act (RTA).",
  alternates: {
    canonical: "https://your-domain.com/calculators/on/security-deposit",
  },
  openGraph: {
    title: "Ontario Security Deposit Calculator",
    description:
      "Calculate last month’s rent interest and learn what deposits are allowed or prohibited in Ontario.",
    url: "https://your-domain.com/calculators/on/security-deposit",
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
      name: "Security Deposit",
      item: "https://your-domain.com/calculators/on/security-deposit",
    },
  ],
};

export default function OntarioSecurityDepositPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-navy mb-4">
          Ontario Security Deposit Calculator
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Ontario does not allow traditional security or damage deposits. This
          tool explains what landlords can collect (last month’s rent), how
          interest works, and what tenants are entitled to under the Residential
          Tenancies Act (RTA).
        </p>

        <div className="h-1 w-20 bg-[#00205B] rounded-full mb-8" />

        <OntarioSecurityDepositClient />
      </div>
    </>
  );
}