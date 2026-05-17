import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function EnterpriseCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-32 md:py-44">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/30 via-transparent to-navy-dark/50" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2
          className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl"
          style={{ letterSpacing: "-0.01em" }}
        >
          Ready to integrate regulatory intelligence?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          From single-jurisdiction compliance checks to national portfolio
          analytics, LegalCals scales with your needs.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold text-navy shadow-lg shadow-black/10 transition-all hover:bg-slate-100 hover:shadow-xl"
          >
            Request a demo
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="/developers"
            className="inline-flex items-center rounded-lg border border-slate-600 bg-transparent px-8 py-4 text-sm font-semibold text-slate-200 transition-all hover:border-slate-400 hover:text-white"
          >
            Explore the API
          </a>
        </div>
        <p className="mt-8 text-xs text-slate-500">
          Enterprise plans include SLA guarantees, dedicated support, and
          custom topic expansion.
        </p>
      </div>
    </section>
  );
}
