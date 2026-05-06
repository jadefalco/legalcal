"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import {
  CreditCardIcon,
  CheckCircleIcon,
  XCircleIcon,
  BanknotesIcon,
  DocumentCheckIcon,
  ReceiptRefundIcon,
  DevicePhoneMobileIcon,
  CurrencyDollarIcon,
  NoSymbolIcon,
  ListBulletIcon,
  BookOpenIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import type { PaymentMethodsResult } from "./schema";

interface PaymentMethodsFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: () => void;
  result: PaymentMethodsResult | null;
}

export function PaymentMethodsForm({
  theme,
  stateName,
  onCalculate,
  result,
}: PaymentMethodsFormProps) {
  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Check which rent payment methods landlords in {stateName} must accept,
          whether they can refuse cash, require online-only payments, or charge
          processing fees.
        </p>

        <LCButton variant="primary" theme={theme} onClick={onCalculate}>
          <CreditCardIcon className="w-4 h-4" />
          Show Payment Method Rules
        </LCButton>
      </LCCard>

      {result && (
        <PaymentMethodsResultCard
          result={result}
          stateName={stateName}
          theme={theme}
        />
      )}
    </div>
  );
}

function PaymentMethodsResultCard({
  result,
  stateName,
  theme,
}: {
  result: PaymentMethodsResult;
  stateName: string;
  theme: Theme;
}) {
  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <CreditCardIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Payment Method Rules
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <RequirementItem
          label="Must Accept Cash"
          value={result.mustAcceptCash}
          icon={result.mustAcceptCash ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
        <RequirementItem
          label="Must Accept Checks"
          value={result.mustAcceptCheck}
          icon={result.mustAcceptCheck ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
        <RequirementItem
          label="Must Accept Money Orders"
          value={result.mustAcceptMoneyOrder}
          icon={result.mustAcceptMoneyOrder ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
        <RequirementItem
          label="Online-Only Allowed"
          value={result.canRequireOnlineOnly}
          icon={result.canRequireOnlineOnly ? CheckCircleIcon : XCircleIcon}
          theme={theme}
          invertColor
        />
        <RequirementItem
          label="Processing Fees Allowed"
          value={result.canChargeProcessingFee}
          icon={result.canChargeProcessingFee ? CheckCircleIcon : XCircleIcon}
          theme={theme}
          invertColor
        />
      </div>

      {result.prohibitedMethods.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <NoSymbolIcon className="w-4 h-4 text-red-500" />
            Prohibited Payment Methods
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.prohibitedMethods.map((method, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-700"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      )}

      {result.requiredAlternatives.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <DocumentCheckIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            Required Alternative Methods
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.requiredAlternatives.map((alt, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700"
              >
                {alt}
              </span>
            ))}
          </div>
        </div>
      )}

      {result.statutes.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <BookOpenIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            Applicable Statutes
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {result.statutes.map((statute, i) => (
              <li key={i}>{statute}</li>
            ))}
          </ul>
        </div>
      )}

      {result.notes.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <InformationCircleIcon className="w-4 h-4 text-blue-500" />
            Notes
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {result.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </LCCard>
  );
}

function RequirementItem({
  label,
  value,
  icon: Icon,
  theme,
  invertColor = false,
}: {
  label: string;
  value: boolean;
  icon: React.ComponentType<any>;
  theme: Theme;
  invertColor?: boolean;
}) {
  const isPositive = invertColor ? !value : value;
  return (
    <div className="p-3 bg-slate-50 rounded-lg space-y-1">
      <div className="flex items-center gap-2">
        <Icon
          className="w-4 h-4"
          style={{ color: isPositive ? "#16a34a" : theme.colors.primary }}
        />
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p
        className={`text-base font-semibold ${
          isPositive ? "text-green-700" : "text-slate-800"
        }`}
      >
        {value ? "Yes" : "No"}
      </p>
    </div>
  );
}
