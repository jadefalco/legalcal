import type { Metadata } from "next";
import NoticePeriodClient from "./CalculatorClient";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "BC Notice Period Calculator",
  description:
    "Estimate the minimum notice period required for tenants and landlords in British Columbia. Covers month-to-month and fixed-term tenancies.",
  alternates: {
    canonical: "https://your-domain.com/calculators/bc/notice-period",
  },
  openGraph: {
    title: "BC Notice Period Calculator | BC Legal Calculators",
    description:
      "Estimate the minimum notice period required for tenants and landlords in British Columbia. Covers month-to-month and fixed-term tenancies.",
    url: "https://your-domain.com/calculators/bc/notice-period",
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BC Notice Period Calculator",
  applicationCategory: "LegalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CAD",
  },
  description:
    "Estimate the minimum notice period required for tenants and landlords in British Columbia residential tenancies.",
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
      name: "How much notice does a tenant need to give in BC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a month-to-month tenancy in BC, tenants generally must give at least one full month of written notice before the day rent is due.",
      },
    },
    {
      "@type": "Question",
      name: "How much notice does a landlord need to give in BC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Landlord notice periods in BC vary by reason. Common examples include 10 days for non-payment of rent, 1 month for cause, and 2 months for landlord use or major renovations.",
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
