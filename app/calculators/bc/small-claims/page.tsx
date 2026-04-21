import type { Metadata } from "next";
import SmallClaimsClient from "./CalculatorClient";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "BC Small Claims Eligibility Checker",
  description:
    "Check whether your claim amount is likely within the range for Small Claims Court or the Civil Resolution Tribunal in British Columbia.",
  alternates: {
    canonical: "https://your-domain.com/calculators/bc/small-claims",
  },
  openGraph: {
    title: "BC Small Claims Eligibility Checker | BC Legal Calculators",
    description:
      "Check whether your claim amount is likely within the range for Small Claims Court or the Civil Resolution Tribunal in British Columbia.",
    url: "https://your-domain.com/calculators/bc/small-claims",
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BC Small Claims Eligibility Checker",
  applicationCategory: "LegalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CAD",
  },
  description:
    "Check whether your claim amount is likely within the range for Small Claims Court or similar processes in British Columbia.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    ratingCount: "7",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Small Claims limit in BC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Provincial Court Small Claims in BC generally handles claims up to $35,000. Claims of $5,000 or less may also be handled through the Civil Resolution Tribunal, depending on the type of dispute.",
      },
    },
    {
      "@type": "Question",
      name: "Can I file a claim above $35,000 in Small Claims?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally no. Claims above $35,000 typically fall outside Small Claims jurisdiction and may need to be filed in BC Supreme Court. You should consult a lawyer or legal resource for guidance.",
      },
    },
  ],
};

export default function SmallClaimsPage() {
  return (
    <>
      <JsonLd data={[calculatorSchema, faqSchema]} />
      <SmallClaimsClient />
    </>
  );
}
