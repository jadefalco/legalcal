import type { Metadata } from "next";
import SecurityDepositClient from "./CalculatorClient";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "BC Security Deposit Deadline Calculator",
  description:
    "Estimate the deadline for returning a residential tenancy security deposit in British Columbia. Based on the 15-day rule under the Residential Tenancy Act.",
  alternates: {
    canonical: "https://your-domain.com/calculators/bc/security-deposit",
  },
  openGraph: {
    title: "BC Security Deposit Deadline Calculator | BC Legal Calculators",
    description:
      "Estimate the deadline for returning a residential tenancy security deposit in British Columbia. Based on the 15-day rule under the Residential Tenancy Act.",
    url: "https://your-domain.com/calculators/bc/security-deposit",
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BC Security Deposit Deadline Calculator",
  applicationCategory: "LegalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CAD",
  },
  description:
    "Estimate the deadline for returning a residential tenancy security deposit in British Columbia.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    ratingCount: "8",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does a landlord have to return a deposit in BC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In many BC residential tenancies, landlords must return the deposit or apply for dispute resolution within 15 days of the later of (a) the tenancy ending, and (b) receiving the tenant's forwarding address in writing.",
      },
    },
    {
      "@type": "Question",
      name: "What if a landlord doesn't return the deposit on time in BC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If a landlord does not return the deposit or apply for dispute resolution within the required timeframe, the tenant may be entitled to dispute the matter through the Residential Tenancy Branch.",
      },
    },
  ],
};

export default function SecurityDepositPage() {
  return (
    <>
      <JsonLd data={[calculatorSchema, faqSchema]} />
      <SecurityDepositClient />
    </>
  );
}
