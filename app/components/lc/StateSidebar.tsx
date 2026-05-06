

import Link from "next/link"

import type { Theme } from "@/app/types/Theme"

import { LCCard } from "./LCCard"
import { LCButton } from "./LCButton"

import {
  MapIcon,
  ScaleIcon,
  BanknotesIcon,
  CalculatorIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"

interface Props {
  stateCode: string
  theme: Theme
}

const navItems = [
  {
    href: (code: string) => `/us/states/${code}`,
    label: "State Hub",
    icon: MapIcon,
  },
  {
    href: (code: string) => `/us/states/${code}/legal`,
    label: "Legal Breakdown",
    icon: DocumentTextIcon,
  },
  {
    href: (code: string) => `/us/states/${code}/eviction`,
    label: "Eviction Rules",
    icon: ScaleIcon,
  },
  {
    href: (code: string) => `/us/states/${code}/security-deposit`,
    label: "Security Deposit",
    icon: BanknotesIcon,
  },
  {
    href: (code: string) => `/calculators/us/${code}`,
    label: "Calculators",
    icon: CalculatorIcon,
  },
]

export function StateSidebar({ stateCode, theme }: Props) {
  return (
    <LCCard theme={theme} className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
        Navigation
      </h3>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href(stateCode)}>
            <LCButton variant="ghost" className="w-full justify-start" theme={theme}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </LCButton>
          </Link>
        ))}
      </nav>
    </LCCard>
  )
}
