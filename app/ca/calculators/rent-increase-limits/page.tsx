import type { Metadata } from "next";
import RentIncreaseLimitsCalculator from "./RentIncreaseLimitsCalculator";

export const metadata: Metadata = {
  title: "Canada Rent Increase Limits Calculator",
  description: "Calculate rent increase limits for any Canadian province or territory.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { province?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <RentIncreaseLimitsCalculator initialProvince={searchParams.province} />
    </main>
  );
}
