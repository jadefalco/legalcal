import Link from "next/link";
import Image from "next/image";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {/* Animated canvas background */}
      <HeroCanvas />

      {/* Optional overlay assets */}
      <div className="absolute inset-0 opacity-[0.05]">
        <Image
          src="/assets/hero-layout2.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: "url('/assets/hero-background-pattern.png')",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-transparent to-navy/60" />

      <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-44 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="font-serif text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            Regulatory intelligence for every jurisdiction.
          </h1>
          <p className="mt-6 font-serif text-2xl font-medium text-gold md:text-3xl">
            Predictive. Comparative. Scenario‑aware.
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-300">
            LegalCals analyzes housing regulations across all 64 jurisdictions in
            the US and Canada — providing instant intelligence, risk scoring,
            heatmaps, trends, forecasts, and national reports.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/calculators"
              className="inline-flex items-center rounded-lg bg-brandBlue px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brandBlue/25 transition-all hover:bg-brandBlue-light hover:shadow-xl hover:shadow-brandBlue/30"
            >
              Explore the Platform
            </Link>
            <Link
              href="/developers"
              className="inline-flex items-center rounded-lg border border-slate-600 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              View API Docs
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 md:grid-cols-4">
          {[
            { label: "Jurisdictions", value: "64" },
            { label: "Topics", value: "19" },
            { label: "Engines", value: "10" },
            { label: "API Endpoints", value: "15" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center bg-navy/50 px-6 py-8"
            >
              <div className="text-4xl font-bold tracking-tight text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
