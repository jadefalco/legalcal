import Link from "next/link";
import JurisdictionLayout from "@/components/JurisdictionLayout";

const calculators = [
  {
    title: "Security Deposit Calculator",
    description: "Calculate maximum allowable deposits and return deadlines under BC law.",
    href: "/bc/security-deposit",
  },
  {
    title: "Rent Increase Calculator",
    description: "Determine allowable rent increase limits and required notice periods.",
    href: "/bc/rent-increase",
  },
  {
    title: "Notice Periods",
    description: "Find the correct notice periods for landlords and tenants in BC.",
    href: "/bc/notice-periods",
  },
  {
    title: "Ending Tenancy",
    description: "Understand the rules for ending a tenancy and required timelines.",
    href: "/bc/ending-tenancy",
  },
  {
    title: "Repairs & Maintenance",
    description: "Learn about repair obligations and tenant rights in BC.",
    href: "/bc/repairs-maintenance",
  },
  {
    title: "Utilities & Services",
    description: "Check rules around utility payments and service responsibilities.",
    href: "/bc/utilities-services",
  },
];

export default function BCPage() {
  return (
    <JurisdictionLayout code="CA-BC">
      <h1 className="text-3xl font-bold text-slate-900">
        British Columbia Legal Calculators
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        Tools and calculators for tenants, landlords, and legal professionals in British Columbia.
      </p>

      <section className="mt-10">
        <ul className="grid gap-6 sm:grid-cols-2">
          {calculators.map((calc) => (
            <li key={calc.href}>
              <Link
                href={calc.href}
                className="block rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h2 className="text-xl font-semibold text-slate-900">
                  {calc.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {calc.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </JurisdictionLayout>
  );
}
