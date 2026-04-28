import type { Metadata } from "next";
import RentIncreaseGenerator from "./RentIncreaseGenerator";

export const metadata: Metadata = {
  title: "Canada Rent Increase Generator",
  description: "Generate a rent increase notice letter for any Canadian province.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { province?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <RentIncreaseGenerator initialProvince={searchParams.province} />
    </main>
  );
}
