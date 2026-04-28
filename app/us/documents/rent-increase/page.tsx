import type { Metadata } from "next";
import RentIncreaseGenerator from "./RentIncreaseGenerator";

export const metadata: Metadata = {
  title: "US Rent Increase Generator",
  description: "Generate a rent increase notice letter for any US state.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <RentIncreaseGenerator initialState={searchParams.state} />
    </main>
  );
}
