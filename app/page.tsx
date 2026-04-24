import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* HERO */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-semibold text-navy mb-4">
          Legal Calculators for Canada & the United States
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Accurate, jurisdiction‑specific tools for employment law,
          landlord‑tenant law, small claims, and more. Updated for 2026.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="#regions"
            className="rounded-md bg-navy px-5 py-2 text-white text-sm font-medium shadow hover:bg-[#00205B]"
          >
            Choose Your Region
          </Link>

          <Link
            href="/calculators"
            className="rounded-md border border-navy px-5 py-2 text-navy text-sm font-medium hover:bg-gray-50"
          >
            Browse All Calculators
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Free to use • Not legal advice • Covers all provinces and states
        </p>
      </section>

      {/* REGION SELECTOR */}
      <section id="regions" className="mb-20">
        <h2 className="text-2xl font-semibold text-navy mb-6 text-center">
          Choose Your Region
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CANADA */}
          <Link
            href="/calculators/canada"
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white"
          >
            <h3 className="text-xl font-semibold text-navy mb-2">🇨🇦 Canada</h3>
            <p className="text-gray-700 text-sm mb-3">
              Provincial calculators for employment, landlord‑tenant, and small claims.
            </p>
            <ul className="text-sm text-gray-600 list-disc ml-5">
              <li>British Columbia</li>
              <li>Alberta</li>
              <li>Ontario</li>
              <li>More coming</li>
            </ul>
          </Link>

          {/* UNITED STATES */}
          <Link
            href="/calculators/us"
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white"
          >
            <h3 className="text-xl font-semibold text-navy mb-2">🇺🇸 United States</h3>
            <p className="text-gray-700 text-sm mb-3">
              State‑specific calculators for employment law, landlord‑tenant, and civil claims.
            </p>
            <ul className="text-sm text-gray-600 list-disc ml-5">
              <li>California</li>
              <li>Texas</li>
              <li>New York</li>
              <li>Florida</li>
              <li>More coming</li>
            </ul>
          </Link>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-navy mb-6 text-center">
          Calculator Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {[
            "Employment Law",
            "Landlord‑Tenant",
            "Small Claims",
            "Wage & Hour",
            "Notice Periods",
            "Severance",
            "Eviction",
            "Deposits",
          ].map((category) => (
            <div
              key={category}
              className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
            >
              <p className="text-navy font-medium">{category}</p>
            </div>
          ))}

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-navy mb-6 text-center">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <div>
            <div className="text-navy text-xl font-semibold mb-2">1. Choose your region</div>
            <p className="text-gray-600 text-sm">
              Select Canada or the United States to begin.
            </p>
          </div>

          <div>
            <div className="text-navy text-xl font-semibold mb-2">2. Select your jurisdiction</div>
            <p className="text-gray-600 text-sm">
              Pick your province or state for accurate legal calculations.
            </p>
          </div>

          <div>
            <div className="text-navy text-xl font-semibold mb-2">3. Use the calculators</div>
            <p className="text-gray-600 text-sm">
              Get instant results based on current laws and regulations.
            </p>
          </div>

        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="mb-20 text-center">
        <h2 className="text-2xl font-semibold text-navy mb-4">
          Built for Accuracy & Trust
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-sm">
          LegalCals provides jurisdiction‑specific legal calculators for both
          Canada and the United States. Updated for 2026, free to use, and
          designed for clarity and reliability.
        </p>
      </section>

    </div>
  );
}