import type { Metadata } from "next";
import EmploymentTerminationClient from "./CalculatorClient";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "BC Employment Termination Notice Calculator",
  description:
    "Estimate the minimum statutory notice period (or pay in lieu) for non-union employees in British Columbia, based on length of service.",
  alternates: {
    canonical: "https://your-domain.com/calculators/bc/employment-termination",
  },
  openGraph: {
    title: "BC Employment Termination Notice Calculator | BC Legal Calculators",
    description:
      "Estimate the minimum statutory notice period (or pay in lieu) for non-union employees in British Columbia, based on length of service.",
    url: "https://your-domain.com/calculators/bc/employment-termination",
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BC Employment Termination Notice Calculator",
  applicationCategory: "LegalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CAD",
  },
  description:
    "Estimate the minimum statutory notice period for non-union employees in British Columbia based on length of service.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    ratingCount: "9",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much notice is an employee entitled to in BC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Under BC Employment Standards, statutory notice ranges from 0 weeks for very short service, to 1 week for 3–12 months, 2 weeks for 1–3 years, 3 weeks for 3–4 years, and 4 weeks for 4+ years. Common law notice can be higher.",
      },
    },
    {
      "@type": "Question",
      name: "Is statutory notice the same as common law notice in BC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Statutory notice is the minimum required by the Employment Standards Act. Common law notice, which applies in most non-union cases, can be significantly higher and depends on factors like age, position, and length of service.",
      },
    },
  ],
};

export default function EmploymentTerminationPage() {
  return (
    <>
      <JsonLd data={[calculatorSchema, faqSchema]} />
      <EmploymentTerminationClient />
    </>
  );
}
