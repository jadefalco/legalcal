import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alberta Small Claims Eligibility Checker",
  description:
    "Alberta Small Claims eligibility checker coming soon. Use our BC Small Claims eligibility checker in the meantime.",
  alternates: {
    canonical: "https://your-domain.com/calculators/ab/small-claims",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AlbertaSmallClaimsPlaceholder() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-serif text-navy mb-3">
        Alberta Small Claims Eligibility Checker
      </h1>
      <p className="text-gray-600 mb-6">Coming soon.</p>
      <Link
        href="/calculators/bc/small-claims"
        className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-navy-light transition-colors"
      >
        Try BC Small Claims Eligibility Checker
      </Link>
    </div>
  );
}
