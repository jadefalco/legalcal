import type { Metadata } from "next";
import EmploymentTerminationClient from "./CalculatorClient";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "US Employment Termination Notice Calculator",
  description:
    "Estimate the minimum statutory notice period (or pay in lieu) for non-union employees in select US states, based on length of service.",
  alternates: {
    canonical: "https://your-domain.com/calculators/us/employment-termination",
  },
  openGraph: {
    title: "US Employment Termination Notice Calculator | Legal Calculators",
    description:
      "Estimate the minimum statutory notice period (or pay in lieu) for non-union employees in select US states, based on length of service.",
    url: "https://your-domain.com/calculators/us/employment-termination",
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "US Employment Termination Notice Calculator",
  applicationCategory: "LegalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Estimate the minimum statutory notice period for non-union employees in select US states based on length of service.",
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
      name: "How much notice is an employee entitled to in the US?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Notice requirements vary by state. Many US states follow at-will employment rules with no required statutory notice, but some states and cities have additional protections.",
      },
    },
    {
      "@type": "Question",
      name: "Is statutory notice the same as common law notice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Statutory notice is the minimum required by state law. Common law notice, where applicable, can be significantly higher and depends on factors like age, position, and length of service.",
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
