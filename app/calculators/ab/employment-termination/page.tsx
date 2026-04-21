import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alberta Employment Termination Notice Calculator",
  description:
    "Alberta employment termination calculator coming soon. Use our BC employment termination calculator in the meantime.",
  alternates: {
    canonical: "https://your-domain.com/calculators/ab/employment-termination",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AlbertaEmploymentTerminationPlaceholder() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-serif text-navy mb-3">
        Alberta Employment Termination Notice Calculator
      </h1>
      <p className="text-gray-600 mb-6">Coming soon.</p>
      <Link
        href="/calculators/bc/employment-termination"
        className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-navy-light transition-colors"
      >
        Try BC Employment Termination Calculator
      </Link>
    </div>
  );
}
