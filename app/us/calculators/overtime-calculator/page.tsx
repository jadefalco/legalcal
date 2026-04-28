import type { Metadata } from "next";
import OvertimeCalculatorCalculator from "./OvertimeCalculatorCalculator";

export const metadata: Metadata = {
  title: "US Overtime Calculator Calculator",
  description: "Calculate overtime calculator for any US state.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <OvertimeCalculatorCalculator initialState={searchParams.state} />
    </main>
  );
}
