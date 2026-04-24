import type { Metadata } from "next";
import EvictionTimelineClient from "./CalculatorClient";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "US Eviction Timeline Calculator",
  description:
    "Estimate a rough earliest possible eviction date based on a notice given in select US states. Covers non-payment, landlord use, cause, and more.",
  alternates: {
    canonical: "https://your-domain.com/calculators/us/eviction-timeline",
  },
  openGraph: {
    title: "US Eviction Timeline Calculator | Legal Calculators",
    description:
      "Estimate a rough earliest possible eviction date based on a notice given in select US states. Covers non-payment, landlord use, cause, and more.",
    url: "https://your-domain.com/calculators/us/eviction-timeline",
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "US Eviction Timeline Calculator",
  applicationCategory: "LegalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Estimate the earliest possible eviction date based on a notice given in US residential tenancies.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    ratingCount: "10",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does an eviction take in the US?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eviction timelines in the US vary by state and reason. Non-payment notices may be 3–10 days, while no-cause terminations may require 30–60 days. If disputed, timelines can be significantly longer.",
      },
    },
    {
      "@type": "Question",
      name: "Can a tenant dispute an eviction notice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Tenants can generally respond in court to dispute an eviction. Disputes can extend the timeline significantly depending on the state and court schedule.",
      },
    },
  ],
};

export default function EvictionTimelinePage() {
  return (
    <>
      <JsonLd data={[calculatorSchema, faqSchema]} />
      <EvictionTimelineClient />
    </>
  );
}
