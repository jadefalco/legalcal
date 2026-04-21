"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const navItems = [
  {
    href: "/calculators/bc/notice-period",
    label: "BC Notice Period Calculator",
  },
  {
    href: "/calculators/bc/eviction-timeline",
    label: "BC Eviction Timeline Calculator",
  },
  {
    href: "/calculators/bc/security-deposit",
    label: "BC Security Deposit Deadline",
  },
  {
    href: "/calculators/bc/employment-termination",
    label: "BC Employment Termination Notice",
  },
  {
    href: "/calculators/bc/small-claims",
    label: "BC Small Claims Eligibility Checker",
  },
];

export default function CalculatorLayout({
  title,
  description,
  children,
}: CalculatorLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-slate-50">
              BC
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Legal Calculators
              </div>
              <div className="text-sm font-semibold text-slate-900">
                Notice & Rights Tools
              </div>
            </div>
          </Link>
          <div className="text-xs text-slate-500">
            Not legal advice. For information only.
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 lg:flex-row">
        <aside className="w-full border-b border-slate-200 pb-4 lg:w-64 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm ${
                    active
                      ? "bg-slate-900 text-slate-50"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            These tools are for general information only and may not reflect the
            most current law. For advice about your situation, speak with a
            lawyer or legal clinic.
          </div>
        </aside>

        <section className="w-full lg:flex-1">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{description}</p>
            <div className="mt-6">{children}</div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} BC Legal Calculators</span>
          <span>Not affiliated with the Government of British Columbia.</span>
        </div>
      </footer>
    </div>
  );
}