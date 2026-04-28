import type { Metadata } from "next";
import FinalPaycheckDeadlineCalculator from "./FinalPaycheckDeadlineCalculator";

export const metadata: Metadata = {
  title: "US Final Paycheck Deadline Calculator",
  description: "Calculate final paycheck deadline for any US state.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <FinalPaycheckDeadlineCalculator initialState={searchParams.state} />
    </main>
  );
}
