import fs from "fs";
import path from "path";
import { authorityBundle } from "@/lib/authority/bundle";
import { reasonAboutOutcome } from "@/lib/authority/reasoning";

interface ScenarioReasoningEntry {
  topic: string;
  jurisdiction: string;
  scenario: string;
  outcome: string;
}

const CANNED_SCENARIOS: Record<string, string> = {
  "rent-increase": "Landlord proposes a 5% rent increase with 15 days written notice. Tenant moved in 6 months ago.",
  "deposit-return": "Tenant moved out 45 days ago and has not received security deposit or itemized deductions.",
  "eviction-timeline": "Landlord posted a 3-day notice for nonpayment of rent. Tenant has lived there for 2 years.",
  "notice-period": "Landlord provided 20 days notice to terminate a month-to-month tenancy.",
  "lease-termination": "Tenant wants to break a 12-month fixed-term lease after 4 months.",
  "entry-notice": "Landlord entered the unit with 12 hours notice to show it to prospective buyers.",
  "late-fee": "Tenant was charged a $150 late fee for rent that was 5 days overdue.",
  "repair-deduct": "Tenant paid $400 for plumbing repairs and wants to deduct it from next month's rent.",
  "withhold-rent": "Tenant stopped paying rent because the heater has been broken for 3 weeks.",
  "rent-receipt": "Tenant requested a rent receipt for the last 3 months but landlord refuses.",
  "security-deposit": "Landlord collected a $3,000 security deposit for a $1,500/month apartment.",
  "condition-inspection": "Tenant was not present for the move-out inspection and received no report.",
  "duplicate-receipt": "Tenant lost their original rent receipt and landlord refuses to provide a duplicate.",
  "ending-tenancy": "Landlord served notice to end tenancy for landlord use of property.",
  "ledger-validation": "Tenant noticed discrepancies in the landlord's rent ledger showing extra charges.",
  "payment-methods": "Landlord insists on cash-only payments and refuses electronic transfers.",
  "receipt-validation": "Tenant's rent receipt only shows the amount paid but not the date or address.",
  "late-status": "Tenant's rent was due on the 1st and it is now the 5th of the month.",
  "payment-proof": "Tenant paid rent via bank transfer but landlord claims they never received it.",
};

function main() {
  const results: ScenarioReasoningEntry[] = [];

  for (const [topic, jurisdictions] of Object.entries(authorityBundle)) {
    const scenario = CANNED_SCENARIOS[topic];
    if (!scenario) continue;

    for (const [jurisdiction, rule] of Object.entries(jurisdictions)) {
      // Skip placeholders
      if (rule.version.version === "0.0") continue;

      try {
        const outcome = reasonAboutOutcome(topic, jurisdiction, scenario, rule);
        results.push({
          topic,
          jurisdiction,
          scenario,
          outcome: outcome.likelyOutcome,
        });
      } catch {
        // ignore errors for individual rules
      }
    }
  }

  const outDir = path.join(process.cwd(), "reports");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(
    path.join(outDir, "scenario-reasoning.json"),
    JSON.stringify(results, null, 2),
    "utf-8"
  );

  console.log(`Generated ${results.length} scenario reasoning entries.`);
}

main();
