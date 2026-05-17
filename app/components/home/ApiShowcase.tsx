export default function ApiShowcase() {
  return (
    <section className="bg-slate-50 py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-serif text-4xl font-bold tracking-tight text-navy md:text-5xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            Enterprise API
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Integrate regulatory intelligence directly into your platform with
            our versioned REST API and auto-generated SDKs.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* JavaScript */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              JavaScript / TypeScript
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-navy p-5 shadow-sm">
              <pre className="text-sm font-mono text-slate-100">
                <code>{`const client = new LegalCalsClient({
  apiKey: "lc_..."
});

const result = await client.getIntelligence({
  topic: "rent-increase",
  jurisdiction: "bc",
  scenario:
    "Proposed rent increase of 5% with 30 days' notice."
});

console.log(result.data.summary);`}</code>
              </pre>
            </div>
          </div>

          {/* Python */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Python
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-navy p-5 shadow-sm">
              <pre className="text-sm font-mono text-slate-100">
                <code>{`client = LegalCalsClient(api_key="lc_...")

result = client.get_intelligence(
    topic="rent-increase",
    jurisdiction="bc",
    scenario=(
        "Proposed rent increase of 5% "
        "with 30 days' notice."
    )
)

print(result["data"]["summary"])`}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="/developers"
            className="inline-flex items-center rounded-lg bg-brandBlue px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brandBlue/20 transition-all hover:bg-brandBlue-light hover:shadow-lg hover:shadow-brandBlue/25"
          >
            View API Docs
          </a>
          <a
            href="/openapi/legalcals-v1.yaml"
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md"
          >
            Download OpenAPI Spec
          </a>
        </div>
      </div>
    </section>
  );
}
