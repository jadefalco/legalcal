import type { Metadata } from "next";
import SmallClaimsClient from "./CalculatorClient";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "US Small Claims Eligibility Checker",
  description:
    "Check whether your claim amount is likely within the range for Small Claims Court in select US states.",
  alternates: {
    canonical: "https://your-domain.com/calculators/us/small-claims",
  },
  openGraph: {
    title: "US Small Claims Eligibility Checker | Legal Calculators",
    description:
      "Check whether your claim amount is likely within the range for Small Claims Court in select US states.",
    url: "https://your-domain.com/calculators/us/small-claims",
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "US Small Claims Eligibility Checker",
  applicationCategory: "LegalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Check whether your claim amount is likely within the range for Small Claims Court or similar processes in select US states.",
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
      name: "What is the Small Claims limit in the US?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Small Claims limits vary by state. Common limits range from $3,000 to $15,000, depending on the jurisdiction.",
      },
    },
    {
      "@type": "Question",
      name: "Can I file a claim above the Small Claims limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally no. Claims above the state Small Claims limit typically need to be filed in a higher court. You should consult a lawyer or legal resource for guidance.",
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
