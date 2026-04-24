import type { Metadata } from "next";
import NoticePeriodClient from "./CalculatorClient";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "US Notice Period Calculator",
  description:
    "Estimate the minimum notice period required for tenants and landlords in select US states. Covers month-to-month and fixed-term tenancies.",
  alternates: {
    canonical: "https://your-domain.com/calculators/us/notice-period",
  },
  openGraph: {
    title: "US Notice Period Calculator | Legal Calculators",
    description:
      "Estimate the minimum notice period required for tenants and landlords in select US states. Covers month-to-month and fixed-term tenancies.",
    url: "https://your-domain.com/calculators/us/notice-period",
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "US Notice Period Calculator",
  applicationCategory: "LegalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Estimate the minimum notice period required for tenants and landlords in US residential tenancies.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    ratingCount: "12",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much notice does a tenant need to give in the US?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Notice requirements vary by state. Many states require 30 days for month-to-month tenancies, but rules differ for fixed-term and cause-based notices.",
      },
    },
    {
      "@type": "Question",
      name: "How much notice does a landlord need to give in the US?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Landlord notice periods in the US vary by state and reason. Common examples include 3 days for non-payment and 30 or 60 days for no-cause terminations.",
      },
    },
  ],
};

export default function NoticePeriodPage() {
  return (
    <>
      <JsonLd data={[calculatorSchema, faqSchema]} />
      <NoticePeriodClient />
    </>
  );
}
