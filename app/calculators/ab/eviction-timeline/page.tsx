import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alberta Eviction Timeline Calculator",
  description:
    "Alberta eviction timeline calculator coming soon. Use our BC eviction timeline calculator in the meantime.",
  alternates: {
    canonical: "https://your-domain.com/calculators/ab/eviction-timeline",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AlbertaEvictionTimelinePlaceholder() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-serif text-navy mb-3">
        Alberta Eviction Timeline Calculator
      </h1>
      <p className="text-gray-600 mb-6">Coming soon.</p>
      <Link
        href="/calculators/bc/eviction-timeline"
        className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-navy-light transition-colors"
      >
        Try BC Eviction Timeline Calculator
      </Link>
    </div>
  );
}
