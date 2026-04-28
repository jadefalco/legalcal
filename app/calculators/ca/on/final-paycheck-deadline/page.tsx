import type { Metadata } from "next";
import type { CAProvince } from "@/app/types/CAProvinces";
import type { Theme } from "@/app/types/Theme";
import JsonLd from "@/app/components/JsonLd";
import { caProvinces } from "@/app/config/caProvinces";
import { getTheme } from "@/app/theme";
import { StateThemeProvider } from "@/app/components/StateThemeProvider";
import StateHeader from "@/app/components/StateHeader";
import CACalculatorClient from "./CalculatorClient";

const province: CAProvince = caProvinces["on"];
const theme: Theme = getTheme("ca", "on");

export const metadata: Metadata = {
  title: "Ontario – Final Paycheck Deadline Calculator",
  description: "Calculate final paycheck deadlines and accrued vacation payouts.",
  alternates: {
    canonical: "https://your-domain.com/calculators/ca/on/final-paycheck-deadline",
  },
  openGraph: {
    title: "Ontario – Final Paycheck Deadline Calculator | Legal Calculators",
    description: "Calculate final paycheck deadlines and accrued vacation payouts.",
    url: "https://your-domain.com/calculators/ca/on/final-paycheck-deadline",
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
      { "@type": "ListItem", position: 5, name: "Final Paycheck Deadline" },
    ],
  };

  return (
    <StateThemeProvider state={province}>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <StateHeader
          title={`${province.name} Final Paycheck Deadline Calculator`}
          description="Calculate final paycheck deadlines and accrued vacation payouts."
        />
        <CACalculatorClient theme={theme} />
      </div>
    </StateThemeProvider>
  );
}
