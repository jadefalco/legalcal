import Link from "next/link";
import { defaultTheme } from "@/app/theme";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import {
  CodeBracketIcon,
  KeyIcon,
  DocumentTextIcon,
  BoltIcon,
  ArrowDownTrayIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Developers — LegalCals Enterprise API",
  description:
    "Access LegalCals regulatory intelligence via the v1 REST API. Build risk scoring, forecasting, and compliance tools powered by official statutes across Canada and the US.",
};

const v1Endpoints = [
  {
    category: "Intelligence",
    items: [
      { method: "POST", path: "/api/v1/intelligence", desc: "Jurisdiction summary with citations and freshness warnings" },
    ],
  },
  {
    category: "Reasoning",
    items: [
      { method: "POST", path: "/api/v1/reasoning", desc: "Scenario analysis, compliance path, and outcome reasoning" },
    ],
  },
  {
    category: "Checklist",
    items: [
      { method: "POST", path: "/api/v1/checklist", desc: "Generate compliance checklists for a scenario" },
    ],
  },
  {
    category: "Risk",
    items: [
      { method: "POST", path: "/api/v1/risk", desc: "Structural, procedural, documentation, and overall risk scores" },
    ],
  },
  {
    category: "Heatmap",
    items: [
      { method: "POST", path: "/api/v1/heatmap", desc: "National compliance heatmap across all jurisdictions" },
    ],
  },
  {
    category: "Similarity",
    items: [
      { method: "POST", path: "/api/v1/similarity/matrix", desc: "Pairwise jurisdiction similarity vectors" },
      { method: "POST", path: "/api/v1/similarity/clusters", desc: "K-means clustering of jurisdictions" },
    ],
  },
  {
    category: "Trends",
    items: [
      { method: "POST", path: "/api/v1/trends/jurisdiction", desc: "Historical trend analysis for one jurisdiction" },
      { method: "POST", path: "/api/v1/trends/national", desc: "National trend report with volatility rankings" },
    ],
  },
  {
    category: "Forecast",
    items: [
      { method: "POST", path: "/api/v1/forecast/jurisdiction", desc: "Predicted risk levels for a jurisdiction" },
      { method: "POST", path: "/api/v1/forecast/national", desc: "National forecast with confidence and trend direction" },
    ],
  },
  {
    category: "Reports",
    items: [
      { method: "POST", path: "/api/v1/reports/quarterly", desc: "Quarterly regulatory intelligence report" },
      { method: "POST", path: "/api/v1/reports/annual", desc: "Annual year-over-year regulatory report" },
    ],
  },
  {
    category: "Topics",
    items: [
      { method: "GET", path: "/api/v1/topics", desc: "List all topics with coverage metadata" },
      { method: "GET", path: "/api/v1/topics/{topic}/coverage", desc: "Placeholder vs real rule coverage" },
    ],
  },
];

const methodColor: Record<string, string> = {
  GET: "bg-emerald-50 text-emerald-700",
  POST: "bg-blue-50 text-blue-700",
  PUT: "bg-amber-50 text-amber-700",
  DELETE: "bg-red-50 text-red-700",
};

export default function DevelopersPage() {
  const theme = defaultTheme;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <StateSectionHeader
            title="LegalCals Enterprise API v1"
            description="Regulatory intelligence at scale. Risk scoring, forecasting, similarity analysis, and national reporting across all Canadian provinces and US states."
            icon={CodeBracketIcon}
            theme={theme}
          />
          <div className="flex justify-center gap-4">
            <Link href="/developers/signup">
              <LCButton variant="primary" theme={theme} className="px-6 py-3">
                Get an API Key
              </LCButton>
            </Link>
            <a href="#endpoints">
              <LCButton variant="ghost" theme={theme} className="px-6 py-3">
                View Endpoints
              </LCButton>
            </a>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <LCCard theme={theme} className="space-y-3">
            <BoltIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-900">10 Intelligence Engines</h3>
            <p className="text-sm text-slate-600">
              From single-jurisdiction risk scoring to national quarterly reports — compose the exact intelligence you need.
            </p>
          </LCCard>
          <LCCard theme={theme} className="space-y-3">
            <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-900">Versioned & Stable</h3>
            <p className="text-sm text-slate-600">
              All enterprise endpoints live under /api/v1/ with backward-compatibility guarantees and semantic versioning.
            </p>
          </LCCard>
          <LCCard theme={theme} className="space-y-3">
            <KeyIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-900">Simple Auth</h3>
            <p className="text-sm text-slate-600">
              One header, no OAuth. Send x-legalcals-key with every request and get JSON back with rate-limit metadata.
            </p>
          </LCCard>
        </div>
      </section>

      {/* AUTHENTICATION */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <LCCard theme={theme} className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Authentication</h2>
          <p className="text-sm text-slate-600">
            Include your API key in the <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">x-legalcals-key</code> header with every request.
          </p>
          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>{`POST /api/v1/risk
Host: legalcals.com
Content-Type: application/json
x-legalcals-key: lc_your_key_here

{
  "topic": "rent-increase",
  "jurisdiction": "bc",
  "scenario": "Proposed rent increase of 5% with 30 days notice."
}`}</code>
            </pre>
          </div>
          <p className="text-sm text-slate-600">
            Every response includes rate-limit headers so you can throttle client-side:
          </p>
          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>{`X-RateLimit-Limit: 60
X-RateLimit-Remaining: 42
X-RateLimit-Reset: 1714500000`}</code>
            </pre>
          </div>
        </LCCard>
      </section>

      {/* ENDPOINTS */}
      <section id="endpoints" className="max-w-4xl mx-auto px-4 py-12">
        <LCCard theme={theme} className="space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">Endpoints</h2>
          <div className="space-y-6">
            {v1Endpoints.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  {group.category}
                </h3>
                <div className="space-y-2">
                  {group.items.map((ep) => (
                    <div key={ep.path} className="flex items-start gap-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold shrink-0 ${methodColor[ep.method] || "bg-slate-100 text-slate-700"}`}
                      >
                        {ep.method}
                      </span>
                      <div>
                        <code className="text-sm font-mono text-slate-800">{ep.path}</code>
                        <p className="text-xs text-slate-500 mt-0.5">{ep.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </LCCard>
      </section>

      {/* CODE EXAMPLES */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <LCCard theme={theme} className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Code Examples</h2>

          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">JavaScript</p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`const res = await fetch("https://legalcals.com/api/v1/risk", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-legalcals-key": "lc_your_key_here",
  },
  body: JSON.stringify({
    topic: "rent-increase",
    jurisdiction: "bc",
    scenario: "Proposed rent increase of 5% with 30 days notice.",
  }),
});
const data = await res.json();
console.log(data.data.overallRisk);`}</code>
              </pre>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Python</p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`import requests

res = requests.post(
    "https://legalcals.com/api/v1/risk",
    headers={
        "Content-Type": "application/json",
        "x-legalcals-key": "lc_your_key_here",
    },
    json={
        "topic": "rent-increase",
        "jurisdiction": "bc",
        "scenario": "Proposed rent increase of 5% with 30 days notice.",
    },
)
data = res.json()
print(data["data"]["overallRisk"])`}</code>
              </pre>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">cURL</p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`curl -X POST https://legalcals.com/api/v1/risk \\
  -H "Content-Type: application/json" \\
  -H "x-legalcals-key: lc_your_key_here" \\
  -d '{"topic":"rent-increase","jurisdiction":"bc","scenario":"Proposed rent increase of 5% with 30 days notice."}'`}</code>
              </pre>
            </div>
          </div>
        </LCCard>
      </section>

      {/* SDK DOWNLOADS */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <LCCard theme={theme} className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">SDK Downloads</h2>
          <p className="text-sm text-slate-600">
            Auto-generated SDKs from the OpenAPI specification. Install or copy directly into your project.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-slate-900">JavaScript / TypeScript</span>
              </div>
              <p className="text-xs text-slate-600">
                <code className="bg-slate-100 px-1 py-0.5 rounded">sdk/js/index.ts</code>
              </p>
              <a
                href="/openapi/legalcals-v1.yaml"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Download OpenAPI Spec
              </a>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-slate-900">Python</span>
              </div>
              <p className="text-xs text-slate-600">
                <code className="bg-slate-100 px-1 py-0.5 rounded">sdk/python/legalcals.py</code>
              </p>
              <a
                href="/openapi/legalcals-v1.yaml"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Download OpenAPI Spec
              </a>
            </div>
          </div>
        </LCCard>
      </section>

      {/* OPENAPI SPEC */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <LCCard theme={theme} className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">OpenAPI Specification</h2>
          <p className="text-sm text-slate-600">
            The complete v1 API is documented in OpenAPI 3.0.3 format. Use it to generate clients in any language,
            import into Postman, or serve with Swagger UI.
          </p>
          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>{`openapi: 3.0.3
info:
  title: LegalCals Enterprise API
  version: "1.0.0"
servers:
  - url: https://legalcals.com/api/v1
security:
  - ApiKeyAuth: []
paths:
  /intelligence:
    post:
      operationId: getIntelligence
      ...`}</code>
            </pre>
          </div>
          <a
            href="/openapi/legalcals-v1.yaml"
            className="inline-flex items-center gap-2 rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            View Full Spec
          </a>
        </LCCard>
      </section>

      {/* CTA */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Ready to build?</h2>
          <p className="text-slate-600">
            Get your free API key in seconds and start querying regulatory intelligence at scale.
          </p>
          <Link href="/developers/signup">
            <LCButton variant="primary" theme={theme} className="px-8 py-3">
              Get an API Key
            </LCButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
