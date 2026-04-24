import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { usStates } from "@/app/config/usStates";
import { StateThemeProvider } from "@/app/components/StateThemeProvider";
import StateHeader from "@/app/components/StateHeader";
import USCalculatorClient from "./CalculatorClient";

const state = usStates["ma"];

export const metadata: Metadata = {
  title: "Massachusetts – Final Paycheck Deadline Calculator",
  description: "Calculate final paycheck deadlines and accrued vacation payouts.",
};

export default function USCalculatorPage() {

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Calculators", item: "/calculators" },
      { "@type": "ListItem", position: 3, name: "United States", item: "/calculators/us" },
      { "@type": "ListItem", position: 4, name: state.name, item: `/calculators/us/${state.slug}` },
      { "@type": "ListItem", position: 5, name: "Final Paycheck Deadline" },
    ],
  };

  return (
    <StateThemeProvider state={state}>
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <StateHeader
          title={`${state.name} Final Paycheck Deadline Calculator`}
          description="Calculate final paycheck deadlines and accrued vacation payouts."
        />

        <USCalculatorClient />
      </div>
    </StateThemeProvider>
  );
}