import type { Metadata } from "next";
import RentIncreaseCalculator from "./RentIncreaseCalculator";

export const metadata: Metadata = {
  title: "US Rent Increase Notice Calculator",
  description:
    "Calculate the legal rent increase notice period and deadline for any US state. Select the state and notice date to get the exact deadline and applicable rules.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <RentIncreaseCalculator initialState={searchParams.state} />
    </main>
  );
}
