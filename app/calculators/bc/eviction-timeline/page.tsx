import type { Metadata } from "next";
import EvictionTimelineClient from "./CalculatorClient";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "BC Eviction Timeline Calculator",
  description:
    "Estimate a rough earliest possible eviction date based on a notice given in British Columbia. Covers non-payment, landlord use, cause, and more.",
  alternates: {
    canonical: "https://your-domain.com/calculators/bc/eviction-timeline",
  },
  openGraph: {
    title: "BC Eviction Timeline Calculator | BC Legal Calculators",
    description:
      "Estimate a rough earliest possible eviction date based on a notice given in British Columbia. Covers non-payment, landlord use, cause, and more.",
    url: "https://your-domain.com/calculators/bc/eviction-timeline",
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BC Eviction Timeline Calculator",
  applicationCategory: "LegalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CAD",
  },
  description:
    "Estimate the earliest possible eviction date based on a notice given in British Columbia residential tenancies.",
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
      name: "How long does an eviction take in BC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eviction timelines in BC vary by reason. Non-payment notices are often 10 days, cause is often 1 month, and landlord use or major renovations are often 2 months. If disputed, timelines can be significantly longer.",
      },
    },
    {
      "@type": "Question",
      name: "Can a tenant dispute an eviction notice in BC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Tenants can apply to the Residential Tenancy Branch to dispute many types of eviction notices. Disputes can extend the timeline significantly.",
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
