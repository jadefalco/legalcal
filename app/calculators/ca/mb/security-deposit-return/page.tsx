import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { caProvinces } from "@/app/config/caProvinces";
import { StateThemeProvider } from "@/app/components/StateThemeProvider";
import StateHeader from "@/app/components/StateHeader";
import CACalculatorClient from "./CalculatorClient";

const province = caProvinces["mb"];

export const metadata: Metadata = {
  title: "Manitoba – Security Deposit Return Calculator",
  description: "Calculate security deposit return deadlines and allowable deductions.",
  alternates: {
    canonical: "https://your-domain.com/calculators/ca/mb/security-deposit-return",
  },
  openGraph: {
    title: "Manitoba – Security Deposit Return Calculator | Legal Calculators",
    description: "Calculate security deposit return deadlines and allowable deductions.",
    url: "https://your-domain.com/calculators/ca/mb/security-deposit-return",
  },
};

export default function CACalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://your-domain.com" },
      { "@type": "ListItem", position: 2, name: "Calculators", item: "https://your-domain.com/calculators" },
      { "@type": "ListItem", position: 3, name: "Canada", item: "https://your-domain.com/calculators/ca" },
      { "@type": "ListItem", position: 4, name: province.name, item: `https://your-domain.com/calculators/ca/${province.slug}` },
      { "@type": "ListItem", position: 5, name: "Security Deposit Return" },
    ],
  };

  return (
    <StateThemeProvider state={province}>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <StateHeader
          title={`${province.name} Security Deposit Return Calculator`}
          description="Calculate security deposit return deadlines and allowable deductions."
        />
        <CACalculatorClient />
      </div>
    </StateThemeProvider>
  );
}
