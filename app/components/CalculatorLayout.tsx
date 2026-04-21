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
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 lg:flex-row">
      <aside className="w-full border-b border-gray-200 pb-4 lg:w-64 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
        <nav aria-label="Calculator navigation" className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-sm ${
                  active
                    ? "bg-navy text-white"
                    : "text-slate-700 hover:bg-gray-100"
                }`}
                aria-current={active ? "page" : undefined}
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
        <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <header>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          </header>
          <div className="mt-6">{children}</div>
        </article>
      </section>
    </div>
  );
}
