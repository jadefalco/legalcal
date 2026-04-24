import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import OntarioEvictionTimelineClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Ontario Eviction Timeline Calculator",
  description:
    "Estimate eviction timelines under Ontario’s Residential Tenancies Act (RTA), including notice periods, LTB application steps, and sheriff enforcement.",
  alternates: {
    canonical: "https://your-domain.com/calculators/on/eviction-timeline",
  },
  openGraph: {
    title: "Ontario Eviction Timeline Calculator",
    description:
      "Calculate eviction timelines in Ontario, including N4, N5, N7, N12, N13 notices and LTB processing times.",
    url: "https://your-domain.com/calculators/on/eviction-timeline",
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
      name: "Eviction Timeline",
      item: "https://your-domain.com/calculators/on/eviction-timeline",
    },
  ],
};

export default function OntarioEvictionTimelinePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-navy mb-4">
          Ontario Eviction Timeline Calculator
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Estimate eviction timelines under Ontario’s Residential Tenancies Act
          (RTA), including notice periods, LTB application processing, hearing
          delays, orders, and sheriff enforcement.
        </p>

        <div className="h-1 w-20 bg-[#00205B] rounded-full mb-8" />

        <OntarioEvictionTimelineClient />
      </div>
    </>
  );
}