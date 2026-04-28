import type { Metadata } from "next";
import OvertimeCalculatorCalculator from "./OvertimeCalculatorCalculator";

export const metadata: Metadata = {
  title: "Canada Overtime Calculator Calculator",
  description: "Calculate overtime calculator for any Canadian province or territory.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { province?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <OvertimeCalculatorCalculator initialProvince={searchParams.province} />
    </main>
  );
}
