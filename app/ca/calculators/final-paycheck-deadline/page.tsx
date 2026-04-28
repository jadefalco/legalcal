import type { Metadata } from "next";
import FinalPaycheckDeadlineCalculator from "./FinalPaycheckDeadlineCalculator";

export const metadata: Metadata = {
  title: "Canada Final Paycheck Deadline Calculator",
  description: "Calculate final paycheck deadline for any Canadian province or territory.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { province?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <FinalPaycheckDeadlineCalculator initialProvince={searchParams.province} />
    </main>
  );
}
