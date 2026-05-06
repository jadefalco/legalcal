import { redirect } from "next/navigation";
import Link from "next/link";

import { usStates } from "@/app/config/usStates";
import { defaultTheme } from "@/app/theme";

import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  PlayIcon,
  HomeIcon,
  BanknotesIcon,
  ClockIcon,
  DocumentTextIcon,
  ScaleIcon,
  QuestionMarkCircleIcon,
  CalculatorIcon,
  ShieldCheckIcon,
  MapIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

const selectClass =
  "w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  // Redirect to state start page if state query param is present
  if (searchParams.state) {
    const stateCode = searchParams.state.toLowerCase();
    redirect(`/us/states/${stateCode}/start`);
  }

  const theme = defaultTheme;
  const stateList = Object.entries(usStates).sort((a, b) =>
    a[1].name.localeCompare(b[1].name)
  );

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            Legal Deadlines, Notices, and Tools{" "}
            <span className="text-blue-600">— State by State</span>
          </h1>

          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Calculate eviction timelines, deposit deadlines, notice periods,
            and more. Every tool is built from actual state statutes —
            accurate, up-to-date, and free.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/us/states">
              <LCButton variant="primary" theme={theme} className="px-8 py-3 text-lg">
                <PlayIcon className="w-5 h-5" />
                Start Here
              </LCButton>
            </Link>
            <Link href="/calculators">
              <LCButton variant="ghost" theme={theme} className="px-8 py-3 text-lg">
                <CalculatorIcon className="w-5 h-5" />
                Browse Calculators
              </LCButton>
            </Link>
          </div>

          {/* State Selector */}
          <div className="max-w-md mx-auto pt-4">
            <LCCard theme={theme} className="space-y-4">
              <p className="text-sm text-slate-600">
                Jump straight to your state&apos;s legal toolkit:
              </p>
              <form method="GET" className="flex gap-2">
                <div className="flex-1">
                  <LCField label="" theme={theme}>
                    <select name="state" required className={selectClass}>
                      <option value="">Select your state</option>
                      {stateList.map(([code, info]) => (
                        <option key={code} value={code}>
                          {info.name}
                        </option>
                      ))}
                    </select>
                  </LCField>
                </div>
                <LCButton variant="primary" theme={theme} type="submit" className="self-end">
                  <ArrowRightIcon className="w-4 h-4" />
                  Go
                </LCButton>
              </form>
            </LCCard>
          </div>
        </div>
      </section>

      {/* FEATURED TOOLS */}
      <section className="max-w-6xl mx-auto px-4 py-16 space-y-10">
        <StateSectionHeader
          title="Featured Tools"
          description="The most-used calculators and guides for landlords and tenants."
          icon={CalculatorIcon}
          theme={theme}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            icon={ClockIcon}
            title="Eviction Timeline Calculator"
            description="See how long each step of the eviction process takes in your state."
            href="/eviction-timeline"
            theme={theme}
          />
          <ToolCard
            icon={BanknotesIcon}
            title="Deposit Return Calculator"
            description="Track when your security deposit should be returned and what can be deducted."
            href="/calculators/security-deposit-return"
            theme={theme}
          />
          <ToolCard
            icon={DocumentTextIcon}
            title="Notice Generators"
            description="Create state-specific eviction, lease violation, and termination notices."
            href="/us/states"
            theme={theme}
          />
          <ToolCard
            icon={ShieldCheckIcon}
            title="Tenant Rights"
            description="Know your rights to privacy, habitability, deposits, and fair notice."
            href="/us/states"
            theme={theme}
          />
          <ToolCard
            icon={HomeIcon}
            title="Landlord Obligations"
            description="Understand your legal duties for repairs, notices, deposits, and evictions."
            href="/us/states"
            theme={theme}
          />
          <ToolCard
            icon={ScaleIcon}
            title="State Legal Summary"
            description="A complete overview of eviction, deposit, and tenant law in your state."
            href="/us/states"
            theme={theme}
          />
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* STATE SELECTOR GRID */}
      <section className="max-w-6xl mx-auto px-4 py-16 space-y-10">
        <StateSectionHeader
          title="Choose Your State"
          description="Select a state to access calculators, notice generators, and legal guides."
          icon={MapIcon}
          theme={theme}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {stateList.map(([code, info]) => (
            <Link key={code} href={`/us/states/${code}/start`} className="block">
              <LCCard
                theme={theme}
                className="text-center py-3 hover:shadow-md transition-shadow"
              >
                <span className="text-sm font-medium text-slate-700">
                  {info.name}
                </span>
              </LCCard>
            </Link>
          ))}
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* WHY LEGALCALS EXISTS */}
      <section className="max-w-6xl mx-auto px-4 py-16 space-y-10">
        <StateSectionHeader
          title="Why LegalCals Exists"
          description="We built this platform because legal deadlines shouldn't be a guessing game."
          icon={QuestionMarkCircleIcon}
          theme={theme}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <LCCard theme={theme} className="space-y-3 p-6 text-center">
            <MapIcon className="w-8 h-8 mx-auto text-blue-600" />
            <h3 className="font-semibold text-slate-800">State-Specific</h3>
            <p className="text-sm text-slate-600">
              Every state has different rules. We map every deadline, notice
              period, and procedure to the correct jurisdiction.
            </p>
          </LCCard>

          <LCCard theme={theme} className="space-y-3 p-6 text-center">
            <BookOpenIcon className="w-8 h-8 mx-auto text-blue-600" />
            <h3 className="font-semibold text-slate-800">Statute-Based</h3>
            <p className="text-sm text-slate-600">
              Our data comes directly from state statutes and official legal
              codes — not forums, blogs, or guesswork.
            </p>
          </LCCard>

          <LCCard theme={theme} className="space-y-3 p-6 text-center">
            <CheckCircleIcon className="w-8 h-8 mx-auto text-blue-600" />
            <h3 className="font-semibold text-slate-800">Always Up to Date</h3>
            <p className="text-sm text-slate-600">
              Laws change. We monitor statute updates and revise our tools so
              you always get the current rule.
            </p>
          </LCCard>

          <LCCard theme={theme} className="space-y-3 p-6 text-center">
            <ShieldCheckIcon className="w-8 h-8 mx-auto text-blue-600" />
            <h3 className="font-semibold text-slate-800">No Legal Jargon</h3>
            <p className="text-sm text-slate-600">
              We translate complex legal language into plain English so anyone
              can understand their rights.
            </p>
          </LCCard>
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* SEO CONTENT BLOCK */}
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        <StateSectionHeader
          title="Understanding Landlord-Tenant Law"
          description="A primer on the most important legal concepts for renters and property owners."
          icon={BookOpenIcon}
          theme={theme}
        />

        <LCCard theme={theme} className="space-y-6 p-6 md:p-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">
              Eviction Timelines Vary by State
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Eviction is not a single event — it is a legal process with
              multiple stages, and every state sets its own deadlines. In most
              jurisdictions, a landlord must first serve a written notice for
              nonpayment or lease violation. The notice period can range from 3
              days in some states to 30 days in others. After the notice
              expires, the landlord must file a lawsuit in court, wait for a
              hearing, and obtain a judgment before a sheriff can legally
              remove a tenant. Understanding your state&apos;s specific eviction
              timeline is critical for both tenants who want to protect their
              rights and landlords who must comply with procedural requirements.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">
              Security Deposit Laws Protect Both Parties
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Security deposit regulations are among the most heavily disputed
              areas of landlord-tenant law. Most states cap the maximum deposit
              amount — commonly one or two months&apos; rent — and require landlords
              to return the deposit within a specific timeframe, often 14 to 60
              days after move-out. Many states also require landlords to provide
              an itemized statement of deductions, and some mandate interest
              payments on held deposits. Normal wear and tear cannot be
              deducted, but damage beyond ordinary use can be. Knowing your
              state&apos;s deposit rules can help tenants recover their money and
              help landlords avoid penalties for noncompliance.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">
              Notice Requirements Are Strictly Regulated
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Nearly every landlord-tenant action requires written notice with a
              specific lead time. Rent increases, lease terminations, entry for
              repairs, and eviction initiation all carry notice requirements
              that vary by state and sometimes by city. For example, some
              jurisdictions require 30 days&apos; notice for a month-to-month
              termination, while others require only 7 days. Rent control cities
              may impose additional notice and caps. Failure to provide proper
              notice can invalidate an eviction, delay a deposit return, or
              expose a landlord to liability. Tenants who understand notice
              rules are better equipped to challenge improper actions.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">
              Tenant Rights Include Habitability and Privacy
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Every state implicitly or explicitly guarantees tenants the right
              to a habitable home. This means landlords must maintain working
              heat, water, electricity, plumbing, and structural integrity.
              Tenants also have a right to privacy, which generally means
              landlords must provide reasonable notice — typically 24 to 48
              hours — before entering the rental unit, except in emergencies.
              Some states allow tenants to withhold rent or make repairs and
              deduct the cost when habitability standards are violated. Domestic
              violence victims may have additional protections, including the
              right to terminate a lease early with proper documentation.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">
              Landlord Obligations Go Beyond Collecting Rent
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Landlords must comply with a wide range of statutory obligations,
              from maintaining safe premises to following strict eviction
              procedures. Self-help eviction — such as changing locks, shutting
              off utilities, or removing tenant property without a court order —
              is illegal in every state. Landlords must also comply with fair
              housing laws, provide required disclosures (such as lead paint or
              flood zone notices), and handle security deposits according to
              state-specific rules. Violations can result in lawsuits, fines,
              and damaged rental records. Understanding these obligations before
              a dispute arises is the best way to protect a rental business.
            </p>
          </div>
        </LCCard>
      </section>

      {/* FINAL CTA */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Ready to Find Your State&apos;s Rules?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Start with your state&apos;s legal toolkit — calculators, notices,
            timelines, and statutes all in one place.
          </p>
          <Link href="/us/states">
            <LCButton variant="primary" theme={theme} className="px-8 py-3 text-lg">
              <ArrowRightIcon className="w-5 h-5" />
              Explore All States
            </LCButton>
          </Link>
        </div>
      </section>
    </div>
  );
}

function ToolCard({
  icon: Icon,
  title,
  description,
  href,
  theme,
}: {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  href: string;
  theme: import("@/app/types/Theme").Theme;
}) {
  return (
    <Link href={href} className="block">
      <LCCard
        theme={theme}
        className="space-y-3 p-6 h-full hover:shadow-md transition-shadow"
      >
        <Icon className="w-8 h-8 text-blue-600" />
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
        <div
          className="flex items-center text-sm font-medium"
          style={{ color: theme.colors.primary }}
        >
          Open <ArrowRightIcon className="w-4 h-4 ml-1" />
        </div>
      </LCCard>
    </Link>
  );
}
