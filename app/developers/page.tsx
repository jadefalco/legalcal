import Link from "next/link";
import { defaultTheme } from "@/app/theme";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import {
  CodeBracketIcon,
  KeyIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Developers — LegalCals API",
  description:
    "Access LegalCals authority data via REST API. Build eviction calculators, notice generators, and legal tools powered by official state statutes.",
};

const tiers = [
  {
    name: "Free",
    quota: "1,000 requests / month",
    rate: "30 requests / minute",
    overage: "$5 per 1,000",
    features: ["All authority endpoints", "CORS support", "Community support"],
  },
  {
    name: "Pro",
    quota: "100,000 requests / month",
    rate: "300 requests / minute",
    overage: "$2 per 1,000",
    features: ["All Free features", "Higher rate limits", "Email support"],
  },
  {
    name: "Enterprise",
    quota: "1,000,000 requests / month",
    rate: "2,000 requests / minute",
    overage: "$1 per 1,000",
    features: ["All Pro features", "Dedicated support", "Custom SLA"],
  },
];

export default function DevelopersPage() {
  const theme = defaultTheme;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <StateSectionHeader
            title="LegalCals API for Developers"
            description="Build eviction calculators, notice generators, and legal tools powered by official state statutes."
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
            <h3 className="font-semibold text-slate-900">Real-Time Data</h3>
            <p className="text-sm text-slate-600">
              Query jurisdiction-specific rules, deadlines, and limits across all 50 US states and Canadian provinces.
            </p>
          </LCCard>
          <LCCard theme={theme} className="space-y-3">
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-900">Statute-Backed</h3>
            <p className="text-sm text-slate-600">
              Every response includes citation metadata, review status, and version history so you can trust the source.
            </p>
          </LCCard>
          <LCCard theme={theme} className="space-y-3">
            <KeyIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-900">Simple Auth</h3>
            <p className="text-sm text-slate-600">
              One header, no OAuth flows. Send x-api-key with every request and get JSON back in milliseconds.
            </p>
          </LCCard>
        </div>
      </section>

      {/* AUTHENTICATION */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <LCCard theme={theme} className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Authentication</h2>
          <p className="text-sm text-slate-600">
            Include your API key in the <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">x-api-key</code> header with every request.
          </p>
          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm font-mono">
              <code>GET /api/authority/us/ca/security-deposit</code>
              <br />
              <code>Host: legalcals.com</code>
              <br />
              <code>x-api-key: lc_your_key_here</code>
            </pre>
          </div>
        </LCCard>
      </section>

      {/* ENDPOINTS */}
      <section id="endpoints" className="max-w-4xl mx-auto px-4 py-12">
        <LCCard theme={theme} className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Endpoints</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold shrink-0">
                GET
              </span>
              <div>
                <code className="text-sm font-mono text-slate-800">
                  /api/authority/us/&#123;state&#125;/&#123;topic&#125;
                </code>
                <p className="text-xs text-slate-500 mt-1">
                  Returns state-level rule data, citations, and review metadata.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold shrink-0">
                GET
              </span>
              <div>
                <code className="text-sm font-mono text-slate-800">
                  /api/authority/us/&#123;state&#125;/&#123;city&#125;/&#123;topic&#125;
                </code>
                <p className="text-xs text-slate-500 mt-1">
                  Returns city-level override rule data when available.
                </p>
              </div>
            </div>
          </div>
        </LCCard>
      </section>

      {/* EXAMPLE */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <LCCard theme={theme} className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Example Request</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">JavaScript (fetch)</p>
              <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code>{`const res = await fetch(
  "https://legalcals.com/api/authority/us/ca/security-deposit",
  {
    headers: {
      "x-api-key": "lc_your_key_here",
    },
  }
);
const data = await res.json();
console.log(data.rule);`}</code>
                </pre>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">cURL</p>
              <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code>{`curl -H "x-api-key: lc_your_key_here" \\
  https://legalcals.com/api/authority/us/ca/security-deposit`}</code>
                </pre>
              </div>
            </div>
          </div>
        </LCCard>
      </section>

      {/* PRICING */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Pricing</h2>
          <p className="text-slate-600 mt-2">Start free. Upgrade as you scale.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <LCCard key={t.name} theme={theme} className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-900">{t.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{t.quota}</p>
                <p className="text-sm text-slate-500">{t.rate}</p>
                <p className="text-sm text-slate-500">Overage: {t.overage}</p>
              </div>
              <ul className="space-y-2">
                {t.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <CurrencyDollarIcon className="w-4 h-4 text-blue-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </LCCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Ready to build?</h2>
          <p className="text-slate-600">
            Get your free API key in seconds and start querying authority data.
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
