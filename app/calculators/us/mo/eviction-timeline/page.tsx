import type { Metadata } from "next";
import type { USState } from "@/app/types/USStates";
import type { Theme } from "@/app/types/Theme";
import JsonLd from "@/app/components/JsonLd";
import { usStates } from "@/app/config/usStates";
import { getTheme } from "@/app/theme";
import { StateThemeProvider } from "@/app/components/StateThemeProvider";
import StateHeader from "@/app/components/StateHeader";
import USCalculatorClient from "./CalculatorClient";

const state: USState = usStates["mo"];
const theme: Theme = getTheme("us", "mo");

export const metadata: Metadata = {
  title: "Missouri – Eviction Timeline Calculator",
  description: "Calculate eviction timelines and key deadlines for your jurisdiction.",
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
      { "@type": "ListItem", position: 5, name: "Eviction Timeline" },
    ],
  };

  return (
    <StateThemeProvider state={state}>
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <StateHeader
          title={`${state.name} Eviction Timeline Calculator`}
          description="Calculate eviction timelines and key deadlines for your jurisdiction."
        />

        <USCalculatorClient theme={theme} />
      </div>
    </StateThemeProvider>
  );
}
