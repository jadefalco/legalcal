import Link from "next/link";

export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800">About</h3>
            <p className="text-sm text-slate-600">
              LegalCals provides statute-based legal calculators, notice
              generators, and state-specific guides for landlords, tenants, and
              legal professionals.
            </p>
            <Link
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700 transition"
            >
              Homepage
            </Link>
          </div>

          {/* States */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800">States</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/us/states"
                  className="text-sm text-slate-600 hover:text-blue-600 transition"
                >
                  All US States
                </Link>
              </li>
              <li>
                <Link
                  href="/us"
                  className="text-sm text-slate-600 hover:text-blue-600 transition"
                >
                  US Legal Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/ca"
                  className="text-sm text-slate-600 hover:text-blue-600 transition"
                >
                  Canada
                </Link>
              </li>
            </ul>
          </div>

          {/* Calculators */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800">Calculators</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/calculators"
                  className="text-sm text-slate-600 hover:text-blue-600 transition"
                >
                  All Calculators
                </Link>
              </li>
              <li>
                <Link
                  href="/eviction-timeline"
                  className="text-sm text-slate-600 hover:text-blue-600 transition"
                >
                  Eviction Timeline
                </Link>
              </li>
              <li>
                <Link
                  href="/notice-period"
                  className="text-sm text-slate-600 hover:text-blue-600 transition"
                >
                  Notice Period
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-600 hover:text-blue-600 transition"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-600 hover:text-blue-600 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <span className="text-sm text-slate-400">Contact (soon)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t mt-10 pt-6 text-center">
          <p className="text-sm text-slate-500">
            LegalCals is not legal advice. Always consult a qualified attorney.
          </p>
          <p className="text-sm text-slate-400 mt-1">
            &copy; {currentYear} LegalCals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
