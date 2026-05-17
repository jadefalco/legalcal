import { DocumentChartBarIcon, CalendarIcon } from "@heroicons/react/24/outline";

const reports = [
  {
    title: "National Regulatory Summary — Q3 2024",
    type: "Quarterly",
    date: "Oct 15, 2024",
    highlights: [
      "23 jurisdictions enacted rent-control amendments",
      "Tenant protection index rose 4.2% nationally",
      "Eviction timeline convergence in 8 states",
    ],
  },
  {
    title: "Annual Housing Law Report — 2024",
    type: "Annual",
    date: "Jan 10, 2025",
    highlights: [
      "Year-over-year rule change velocity: +18%",
      "Cross-border similarity index: Canada vs US",
      "Top 10 trending topics across all jurisdictions",
    ],
  },
  {
    title: "Emergency Ordinance Tracker — Hurricane Response",
    type: "Special",
    date: "Sep 3, 2024",
    highlights: [
      "Temporary eviction moratoria in 4 states",
      "Rent freeze declarations: FL, LA, SC, NC",
      "Emergency repair obligations updated",
    ],
  },
];

export default function ReportsPreview() {
  return (
    <section className="bg-white py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-serif text-4xl font-bold tracking-tight text-navy md:text-5xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            National Reports
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Quarterly and annual summaries of every regulatory change across
            all 64 jurisdictions — delivered as structured data and narrative.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          {reports.map((report) => (
            <div
              key={report.title}
              className="group rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <DocumentChartBarIcon className="h-4 w-4" />
                {report.type}
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold text-navy group-hover:text-brandBlue transition-colors">
                {report.title}
              </h3>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                <CalendarIcon className="h-3.5 w-3.5" />
                {report.date}
              </div>
              <ul className="mt-6 space-y-2">
                {report.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href="/reports"
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md"
          >
            Browse all reports
          </a>
        </div>
      </div>
    </section>
  );
}
