import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { caProvinces } from "@/app/config/caProvinces";
import { StateThemeProvider } from "@/app/components/StateThemeProvider";
import StateHeader from "@/app/components/StateHeader";
import CACalculatorClient from "./CalculatorClient";

const province = caProvinces["nt"];

export const metadata: Metadata = {
  title: "Northwest Territories – Rent Increase Limits Calculator",
  description: "Explain rent increase limits, notice requirements, and exemption rules.",
  alternates: {
    canonical: "https://your-domain.com/calculators/ca/nt/rent-increase-limits",
  },
  openGraph: {
    title: "Northwest Territories – Rent Increase Limits Calculator | Legal Calculators",
    description: "Explain rent increase limits, notice requirements, and exemption rules.",
    url: "https://your-domain.com/calculators/ca/nt/rent-increase-limits",
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
      { "@type": "ListItem", position: 5, name: "Rent Increase Limits" },
    ],
  };

  return (
    <StateThemeProvider state={province}>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <StateHeader
          title={`${province.name} Rent Increase Limits Calculator`}
          description="Explain rent increase limits, notice requirements, and exemption rules."
        />
        <CACalculatorClient />
      </div>
    </StateThemeProvider>
  );
}
