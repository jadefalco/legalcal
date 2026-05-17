import Link from "next/link";

import {
  CalculatorIcon,
  MapIcon,
  DocumentTextIcon,
  WrenchIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function GlobalNav() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2"
        >
          <CalculatorIcon className="w-6 h-6 text-blue-600" />
          LegalCals
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link
            href="/"
            className="hover:text-blue-600 transition flex items-center gap-1"
          >
            Home
          </Link>
          <Link
            href="/calculators"
            className="hover:text-blue-600 transition flex items-center gap-1"
          >
            <CalculatorIcon className="w-4 h-4" />
            Calculators
          </Link>
          <Link
            href="/us"
            className="hover:text-blue-600 transition flex items-center gap-1"
          >
            <MapIcon className="w-4 h-4" />
            US States
          </Link>
          <Link
            href="/calculators/ca/bc"
            className="hover:text-blue-600 transition flex items-center gap-1"
          >
            <MapIcon className="w-4 h-4" />
            Canada
          </Link>
          <Link
            href="/us/states"
            className="hover:text-blue-600 transition flex items-center gap-1"
          >
            <DocumentTextIcon className="w-4 h-4" />
            Notices
          </Link>
          <Link
            href="/calculators"
            className="hover:text-blue-600 transition flex items-center gap-1"
          >
            <WrenchIcon className="w-4 h-4" />
            Tools
          </Link>
        </nav>

        {/* Search placeholder */}
        <div className="hidden sm:flex items-center bg-slate-100 rounded-md px-3 py-2">
          <MagnifyingGlassIcon className="w-4 h-4 text-slate-500" />
          <span className="ml-2 text-sm text-slate-400">Search...</span>
        </div>

        {/* Mobile menu button */}
        <Link
          href="/us"
          className="md:hidden text-sm font-medium text-slate-700 hover:text-blue-600 transition"
        >
          <MapIcon className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}
