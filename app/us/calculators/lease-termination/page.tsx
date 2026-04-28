import type { Metadata } from "next";
import LeaseTerminationCalculator from "./LeaseTerminationCalculator";

export const metadata: Metadata = {
  title: "US Lease Termination Notice Calculator",
  description:
    "Calculate the legal lease termination notice period and deadline for any US state. Select the state, tenancy type, and notice date to get the exact deadline and applicable rules.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <LeaseTerminationCalculator initialState={searchParams.state} />
    </main>
  );
}
