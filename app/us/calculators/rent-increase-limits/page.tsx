import type { Metadata } from "next";
import RentIncreaseLimitsCalculator from "./RentIncreaseLimitsCalculator";

export const metadata: Metadata = {
  title: "US Rent Increase Limits Calculator",
  description: "Calculate rent increase limits for any US state.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <RentIncreaseLimitsCalculator initialState={searchParams.state} />
    </main>
  );
}
