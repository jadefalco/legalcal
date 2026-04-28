import type { Metadata } from "next";
import type { CAProvince } from "@/app/types/CAProvinces";
import type { Theme } from "@/app/types/Theme";
import JsonLd from "@/app/components/JsonLd";
import { caProvinces } from "@/app/config/caProvinces";
import { getTheme } from "@/app/theme";
import { StateThemeProvider } from "@/app/components/StateThemeProvider";
import StateHeader from "@/app/components/StateHeader";
import CACalculatorClient from "./CalculatorClient";

const province: CAProvince = caProvinces["yt"];
const theme: Theme = getTheme("ca", "yt");

export const metadata: Metadata = {
  title: "Yukon – Notice Period Calculator",
  description: "Calculate notice period requirements for residential and employment terminations.",
  alternates: {
    canonical: "https://your-domain.com/calculators/ca/yt/notice-period",
  },
  openGraph: {
    title: "Yukon – Notice Period Calculator | Legal Calculators",
    description: "Calculate notice period requirements for residential and employment terminations.",
    url: "https://your-domain.com/calculators/ca/yt/notice-period",
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
      { "@type": "ListItem", position: 5, name: "Notice Period" },
    ],
  };

  return (
    <StateThemeProvider state={province}>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <StateHeader
          title={`${province.name} Notice Period Calculator`}
          description="Calculate notice period requirements for residential and employment terminations."
        />
        <CACalculatorClient theme={theme} />
      </div>
    </StateThemeProvider>
  );
}
