import type { Metadata } from "next";
import SecurityDepositClient from "./CalculatorClient";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "US Security Deposit Deadline Calculator",
  description:
    "Estimate the deadline for returning a residential tenancy security deposit in select US states.",
  alternates: {
    canonical: "https://your-domain.com/calculators/us/security-deposit",
  },
  openGraph: {
    title: "US Security Deposit Deadline Calculator | Legal Calculators",
    description:
      "Estimate the deadline for returning a residential tenancy security deposit in select US states.",
    url: "https://your-domain.com/calculators/us/security-deposit",
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "US Security Deposit Deadline Calculator",
  applicationCategory: "LegalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Estimate the deadline for returning a residential tenancy security deposit in select US states.",
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
      name: "How long does a landlord have to return a deposit in the US?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Deadlines vary by state. Common timeframes range from 14 to 45 days after the tenancy ends.",
      },
    },
    {
      "@type": "Question",
      name: "What if a landlord doesn't return the deposit on time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If a landlord does not return the deposit within the required timeframe, the tenant may be entitled to remedies under state law, including penalties in some states.",
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
