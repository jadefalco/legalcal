"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import type { Theme } from "@/app/types/Theme";
import { getTheme } from "@/app/theme";
import { caProvinces } from "@/app/config/caProvinces";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCNotice } from "@/app/components/lc/LCNotice";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ArrowRightCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

type ProvinceKey = keyof typeof caProvinces;

export default function RentIncreaseGenerator({
  initialProvince,
}: {
  initialProvince?: string;
}) {
  const [provinceCode, setProvinceCode] = useState<ProvinceKey>(
    (initialProvince?.toLowerCase() as ProvinceKey) || "on"
  );
  const theme: Theme = getTheme("ca", provinceCode);

  useEffect(() => {
    if (initialProvince && caProvinces[initialProvince.toLowerCase() as ProvinceKey]) {
      setProvinceCode(initialProvince.toLowerCase() as ProvinceKey);
    }
  }, [initialProvince]);

  return (
    <div className="space-y-8">
      <LCSection
        title="Canada Rent Increase Generator"
        description="Select a province to generate a jurisdiction-specific rent increase document."
        icon={DocumentTextIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-6">
        <LCField label="Province / Territory" theme={theme}>
          <select
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
            value={provinceCode}
            onChange={(e) => setProvinceCode(e.target.value as ProvinceKey)}
          >
            {Object.entries(caProvinces).map(([key, province]) => (
              <option key={key} value={key}>
                {province.name}
              </option>
            ))}
          </select>
        </LCField>

        <LCNotice
          label="Status"
          value="Document generator coming soon."
          icon={ExclamationTriangleIcon}
          theme={theme}
        />

        <Link href={`/ca/provinces/${provinceCode}/rent-increase`}>
          <LCButton variant="primary" theme={theme}>
            <ArrowRightCircleIcon className="w-4 h-4" />
            View Rent Increase Rules
          </LCButton>
        </Link>
      </LCCard>
    </div>
  );
}
