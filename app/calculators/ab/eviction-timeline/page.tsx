import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import EvictionTimelineClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Alberta Eviction Timeline Calculator",
  description:
    "Calculate the eviction timeline in Alberta, including notice periods, RTDRS filing timelines, hearing wait times, possession orders, and enforcement steps.",
  alternates: {
    canonical: "https://your-domain.com/calculators/ab/eviction-timeline",
  },
  openGraph: {
    title: "Alberta Eviction Timeline Calculator",
    description:
      "Estimate how long an eviction takes in Alberta under the Residential Tenancies Act and RTDRS process.",
    url: "https://your-domain.com/calculators/ab/eviction-timeline",
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
      name: "Eviction Timeline",
      item: "https://your-domain.com/calculators/ab/eviction-timeline",
    },
  ],
};

export default function AlbertaEvictionTimelinePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-navy mb-4">
          Alberta Eviction Timeline Calculator
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Estimate how long an eviction takes in Alberta, including notice
          periods, RTDRS filing timelines, hearing wait times, possession
          orders, and enforcement steps.
        </p>

        <div className="h-1 w-20 bg-[#0077C8] rounded-full mb-8" />

        <EvictionTimelineClient />
      </div>
    </>
  );
}