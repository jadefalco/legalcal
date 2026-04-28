import type { Metadata } from "next";
import NoticePeriodCalculator from "./NoticePeriodCalculator";

export const metadata: Metadata = {
  title: "Canada Notice Period Calculator",
  description: "Calculate notice period for any Canadian province or territory.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { province?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <NoticePeriodCalculator initialProvince={searchParams.province} />
    </main>
  );
}
