import Image from "next/image";
import Link from "next/link";

const nav = {
  Product: [
    { label: "Calculators", href: "/calculators" },
    { label: "Heatmaps", href: "/heatmap" },
    { label: "Similarity", href: "/similarity" },
    { label: "Trends", href: "/trends" },
    { label: "Reports", href: "/reports" },
  ],
  Jurisdictions: [
    { label: "United States", href: "/us" },
    { label: "Canada", href: "/ca" },
    { label: "British Columbia", href: "/bc" },
  ],
  Developers: [
    { label: "API Documentation", href: "/developers" },
    { label: "OpenAPI Spec", href: "/openapi/legalcals-v1.yaml" },
    { label: "SDKs", href: "/developers#sdks" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-blue.png"
                alt="LegalCals"
                width={160}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Regulatory intelligence for every jurisdiction in the US and
              Canada. Predictive, comparative, scenario-aware.
            </p>
          </div>
          {Object.entries(nav).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-navy"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} LegalCals. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Built for compliance professionals, legal teams, and
            enterprise platforms.
          </p>
        </div>
      </div>
    </footer>
  );
}
