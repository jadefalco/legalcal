import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "United States Legal Calculators",
  description:
    "Browse free legal calculators for all 50 US states. Eviction timelines, notice periods, security deposits, employment law, and more.",
  alternates: {
    canonical: "https://your-domain.com/calculators/us",
  },
  openGraph: {
    title: "United States Legal Calculators | Legal Calculators",
    description:
      "Browse free legal calculators for all 50 US states. Eviction timelines, notice periods, security deposits, employment law, and more.",
    url: "https://your-domain.com/calculators/us",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://your-domain.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculators",
      item: "https://your-domain.com/calculators",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "United States",
      item: "https://your-domain.com/calculators/us",
    },
  ],
};

const states = [
    { name: "Alabama", slug: "al", accent: "#9E1B32", seal: "/seals/us/al.png" },
  { name: "Alaska", slug: "ak", accent: "#0F204B", seal: "/seals/us/ak.png" },
  { name: "Arizona", slug: "az", accent: "#BF0A30", seal: "/seals/us/az.png" },
  { name: "Arkansas", slug: "ar", accent: "#9D2235", seal: "/seals/us/ar.png" },
  { name: "California", slug: "ca", accent: "#FCB813", seal: "/seals/us/ca.png" },
  { name: "Colorado", slug: "co", accent: "#003366", seal: "/seals/us/co.png" },
  { name: "Connecticut", slug: "ct", accent: "#0033A0", seal: "/seals/us/ct.png" },
  { name: "Delaware", slug: "de", accent: "#0074AD", seal: "/seals/us/de.png" },
  { name: "Florida", slug: "fl", accent: "#F36F21", seal: "/seals/us/fl.png" },
  { name: "Georgia", slug: "ga", accent: "#B5002D", seal: "/seals/us/ga.png" },
  { name: "Hawaii", slug: "hi", accent: "#C8102E", seal: "/seals/us/hi.png" },
  { name: "Idaho", slug: "id", accent: "#003E7E", seal: "/seals/us/id.png" },
  { name: "Illinois", slug: "il", accent: "#002855", seal: "/seals/us/il.png" },
  { name: "Indiana", slug: "in", accent: "#002D72", seal: "/seals/us/in.png" },
  { name: "Iowa", slug: "ia", accent: "#C8102E", seal: "/seals/us/ia.png" },
  { name: "Kansas", slug: "ks", accent: "#0033A0", seal: "/seals/us/ks.png" },
  { name: "Kentucky", slug: "ky", accent: "#0033A0", seal: "/seals/us/ky.png" },
  { name: "Louisiana", slug: "la", accent: "#0A3161", seal: "/seals/us/la.png" },
  { name: "Maine", slug: "me", accent: "#003C71", seal: "/seals/us/me.png" },
  { name: "Maryland", slug: "md", accent: "#000000", seal: "/seals/us/md.png" },
  { name: "Massachusetts", slug: "ma", accent: "#002D72", seal: "/seals/us/ma.png" },
  { name: "Michigan", slug: "mi", accent: "#00274C", seal: "/seals/us/mi.png" },
  { name: "Minnesota", slug: "mn", accent: "#003DA5", seal: "/seals/us/mn.png" },
  { name: "Mississippi", slug: "ms", accent: "#C8102E", seal: "/seals/us/ms.png" },
  { name: "Missouri", slug: "mo", accent: "#002F6C", seal: "/seals/us/mo.png" },
  { name: "Montana", slug: "mt", accent: "#002F6C", seal: "/seals/us/mt.png" },
  { name: "Nebraska", slug: "ne", accent: "#E41C38", seal: "/seals/us/ne.png" },
  { name: "Nevada", slug: "nv", accent: "#003366", seal: "/seals/us/nv.png" },
  { name: "New Hampshire", slug: "nh", accent: "#0033A0", seal: "/seals/us/nh.png" },
  { name: "New Jersey", slug: "nj", accent: "#002D72", seal: "/seals/us/nj.png" },
  { name: "New Mexico", slug: "nm", accent: "#FFD700", seal: "/seals/us/nm.png" },
  { name: "New York", slug: "ny", accent: "#0033A0", seal: "/seals/us/ny.png" },
  { name: "North Carolina", slug: "nc", accent: "#0033A0", seal: "/seals/us/nc.png" },
  { name: "North Dakota", slug: "nd", accent: "#0033A0", seal: "/seals/us/nd.png" },
  { name: "Ohio", slug: "oh", accent: "#C8102E", seal: "/seals/us/oh.png" },
  { name: "Oklahoma", slug: "ok", accent: "#0072CE", seal: "/seals/us/ok.png" },
  { name: "Oregon", slug: "or", accent: "#154734", seal: "/seals/us/or.png" },
  { name: "Pennsylvania", slug: "pa", accent: "#0033A0", seal: "/seals/us/pa.png" },
  { name: "Rhode Island", slug: "ri", accent: "#0033A0", seal: "/seals/us/ri.png" },
  { name: "South Carolina", slug: "sc", accent: "#003366", seal: "/seals/us/sc.png" },
  { name: "South Dakota", slug: "sd", accent: "#00A3E0", seal: "/seals/us/sd.png" },
  { name: "Tennessee", slug: "tn", accent: "#CC0000", seal: "/seals/us/tn.png" },
  { name: "Texas", slug: "tx", accent: "#BF0A30", seal: "/seals/us/tx.png" },
  { name: "Utah", slug: "ut", accent: "#002868", seal: "/seals/us/ut.png" },
  { name: "Vermont", slug: "vt", accent: "#005A2B", seal: "/seals/us/vt.png" },
  { name: "Virginia", slug: "va", accent: "#002D72", seal: "/seals/us/va.png" },
  { name: "Washington", slug: "wa", accent: "#006C54", seal: "/seals/us/wa.png" },
  { name: "West Virginia", slug: "wv", accent: "#0033A0", seal: "/seals/us/wv.png" },
  { name: "Wisconsin", slug: "wi", accent: "#0033A0", seal: "/seals/us/wi.png" },
  { name: "Wyoming", slug: "wy", accent: "#FFC72C", seal: "/seals/us/wy.png" }
];

export default function USIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-navy mb-3">
            United States Legal Calculators
          </h1>
          <p className="text-gray-600 font-sans text-base md:text-lg max-w-2xl">
            Select your state to access accurate legal calculators for
            employment law, landlord-tenant law, wage &amp; hour rules, and civil
            claims.
          </p>
          <div className="mt-3 w-16 h-1 bg-gold rounded-full" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {states.map((state) => (
            <Link
              key={state.slug}
              href={`/calculators/us/${state.slug}`}
              className="group block bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md hover:border-gray-200"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={state.seal}
                  alt={`${state.name} state seal`}
                  width={48}
                  height={48}
                  className="opacity-80"
                />
                <div>
                  <h2 className="text-lg font-serif text-navy group-hover:text-gray-700 transition-colors">
                    {state.name}
                  </h2>
                  <div
                    className="mt-1 w-12 h-1 rounded-full"
                    style={{ backgroundColor: state.accent }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
