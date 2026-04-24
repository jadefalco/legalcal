import Link from "next/link";

export default function CanadaCalculatorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-semibold text-navy mb-4">
        Canada – Select Your Province
      </h1>
      <p className="text-gray-700 text-base mb-8 max-w-2xl">
        Choose your province to access accurate, up‑to‑date legal calculators for
        employment law, landlord‑tenant law, small claims, and more.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <Link
          href="/calculators/bc"
          className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-navy mb-1">British Columbia</h2>
          <p className="text-gray-600 text-sm">Notice periods, eviction timelines, deposits, employment termination.</p>
        </Link>

        <Link
          href="/calculators/ab"
          className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-navy mb-1">Alberta</h2>
          <p className="text-gray-600 text-sm">Landlord‑tenant, employment, and civil calculation tools.</p>
        </Link>

        <Link
          href="/calculators/on"
          className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-navy mb-1">Ontario</h2>
          <p className="text-gray-600 text-sm">Notice periods, eviction timelines, ESA termination, small claims.</p>
        </Link>

        <div className="border rounded-lg p-6 bg-gray-50 shadow-sm opacity-60">
          <h2 className="text-xl font-semibold text-gray-500 mb-1">More Provinces Coming</h2>
          <p className="text-gray-500 text-sm">Manitoba, Saskatchewan, Quebec, and more.</p>
        </div>

      </div>
    </div>
  );
}