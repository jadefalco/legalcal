"use client";

import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BC Legal Calculators",
  url: "https://your-domain.com",
  description:
    "Free legal calculators for British Columbia. Estimate notice periods, eviction timelines, deposit deadlines, and employment entitlements.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://your-domain.com/calculators?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What do these legal calculators do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our calculators provide quick estimates for common British Columbia legal questions, including tenancy notice periods, eviction timelines, security deposit deadlines, employment termination notice, and Small Claims eligibility.",
      },
    },
    {
      "@type": "Question",
      name: "Are these calculators legal advice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. These tools are for general information only and do not replace advice from a lawyer or qualified legal professional. Laws change, and every situation is different.",
      },
    },
    {
      "@type": "Question",
      name: "Which provinces are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We currently support British Columbia (BC). Alberta and Ontario calculators are coming soon.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[websiteSchema, faqSchema]} />
      <div className="min-h-[calc(100vh-160px)]">
        {/* Hero */}
        <section className="bg-navy py-16 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gold tracking-tight">
              BC Tenancy & Employment Law Calculators
            </h1>
            <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
              Free, easy-to-use legal calculators for British Columbia.
              Estimate notice periods, eviction timelines, deposit deadlines,
              employment termination entitlements, and more.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#calculators"
                className="inline-flex rounded-md bg-gold px-6 py-3 text-sm font-semibold text-navy shadow hover:bg-gold-light transition-colors"
              >
                Browse Calculators
              </Link>
            </div>
          </div>
        </section>

        {/* Province Selector */}
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">Province:</span>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-full bg-navy px-3 py-1 text-xs font-semibold text-gold">
                  British Columbia
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-400 cursor-not-allowed">
                  Alberta (Soon)
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-400 cursor-not-allowed">
                  Ontario (Soon)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* What these tools do */}
        <section className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-serif font-bold text-navy">
            What These Tools Do
          </h2>
          <p className="mt-2 text-base text-gray-600 max-w-3xl">
            These calculators help you quickly understand key dates, amounts, and deadlines under British Columbia law. They are designed for tenants, landlords, employees, and employers who need a starting point for common legal questions.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-navy">
                Tenancy Law
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Notice periods, eviction timelines, and security deposit deadlines for BC residential tenancies.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-navy">
                Employment Law
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Statutory termination notice estimates based on length of service under BC Employment Standards.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-navy">
                Small Claims
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Quick eligibility checks for BC Small Claims Court and the Civil Resolution Tribunal.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator List */}
        <section id="calculators" className="mx-auto max-w-5xl px-6 pb-12">
          <h2 className="text-2xl font-serif font-bold text-navy">
            Available Calculators
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Select a calculator to get started. All tools provide general information only and do not replace legal advice.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link
              href="/calculators/bc/notice-period"
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gold/30 transition-all"
            >
              <h3 className="font-serif font-bold text-navy group-hover:text-gold-dark transition-colors">
                BC Notice Period Calculator
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Estimate required notice for tenants and landlords in BC residential tenancies.
              </p>
            </Link>

            <Link
              href="/calculators/bc/eviction-timeline"
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gold/30 transition-all"
            >
              <h3 className="font-serif font-bold text-navy group-hover:text-gold-dark transition-colors">
                BC Eviction Timeline Calculator
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Estimate earliest possible eviction dates based on notice type and dispute status.
              </p>
            </Link>

            <Link
              href="/calculators/bc/security-deposit"
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gold/30 transition-all"
            >
              <h3 className="font-serif font-bold text-navy group-hover:text-gold-dark transition-colors">
                BC Security Deposit Deadline
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Calculate deposit return deadlines for BC landlords after a tenancy ends.
              </p>
            </Link>

            <Link
              href="/calculators/bc/employment-termination"
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gold/30 transition-all"
            >
              <h3 className="font-serif font-bold text-navy group-hover:text-gold-dark transition-colors">
                BC Employment Termination Notice
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Estimate minimum statutory notice or pay in lieu for BC employees.
              </p>
            </Link>

            <Link
              href="/calculators/bc/small-claims"
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gold/30 transition-all md:col-span-2"
            >
              <h3 className="font-serif font-bold text-navy group-hover:text-gold-dark transition-colors">
                BC Small Claims Eligibility Checker
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Check if your dispute fits within BC Small Claims or Civil Resolution Tribunal limits.
              </p>
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <h2 className="text-xl font-serif font-bold text-navy">
              Important Disclaimer
            </h2>
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm text-amber-900 leading-relaxed">
                <strong className="font-semibold">Not Legal Advice.</strong>{" "}
                The information provided by these calculators is for general informational purposes only and does not constitute legal advice. Laws change frequently, and every situation is unique. For advice about your specific circumstances, please consult a lawyer, legal clinic, or the appropriate government authority such as the BC Residential Tenancy Branch or Employment Standards Branch.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
