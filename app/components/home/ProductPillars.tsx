import {
  BoltIcon,
  ChartBarIcon,
  CloudIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const pillars = [
  {
    title: "Real‑Time Intelligence",
    description:
      "Transform unstructured regulations into structured, actionable intelligence — scenario reasoning, compliance paths, rule comparisons, checklists, and risk scoring.",
    features: [
      { icon: BoltIcon, text: "Scenario reasoning" },
      { icon: DocumentCheckIcon, text: "Compliance paths" },
      { icon: ScaleIcon, text: "Rule comparisons" },
      { icon: DocumentTextIcon, text: "Checklists" },
      { icon: ShieldCheckIcon, text: "Risk scoring" },
    ],
  },
  {
    title: "National Analytics",
    description:
      "Visualize and compare regulatory landscapes across all 64 jurisdictions — heatmaps, similarity clusters, trend lines, forecasting, and volatility rankings.",
    features: [
      { icon: ChartBarIcon, text: "Heatmaps" },
      { icon: UsersIcon, text: "Similarity clusters" },
      { icon: DocumentTextIcon, text: "Trend lines" },
      { icon: BoltIcon, text: "Forecasting" },
      { icon: ScaleIcon, text: "Volatility rankings" },
    ],
  },
  {
    title: "Enterprise Platform",
    description:
      "Integrate regulatory intelligence directly into your products — API access, auto-generated SDKs, national reports, topic expansion, and a full developer portal.",
    features: [
      { icon: CloudIcon, text: "API access" },
      { icon: DocumentTextIcon, text: "SDKs" },
      { icon: ChartBarIcon, text: "National reports" },
      { icon: BoltIcon, text: "Topic expansion" },
      { icon: UsersIcon, text: "Developer portal" },
    ],
  },
];

export default function ProductPillars() {
  return (
    <section className="bg-white py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-serif text-4xl font-bold tracking-tight text-navy md:text-5xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            One platform. Every dimension of regulatory intelligence.
          </h2>
        </div>
        <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <h3 className="font-serif text-xl font-bold text-navy">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {pillar.description}
              </p>
              <ul className="mt-8 space-y-3">
                {pillar.features.map((f) => (
                  <li
                    key={f.text}
                    className="flex items-center gap-3 text-sm text-slate-700"
                  >
                    <f.icon className="h-5 w-5 shrink-0 text-brandBlue" />
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
