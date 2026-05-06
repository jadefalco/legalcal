

import Link from "next/link"

import type { Theme } from "@/app/types/Theme"
import { LCButton } from "./LCButton"

interface Props {
  stateCode: string
  theme: Theme
}

export function StateFooterNav({ stateCode, theme }: Props) {
  return (
    <nav className="flex flex-wrap gap-4 pt-8 border-t">
      <Link href={`/us/states/${stateCode}`}>
        <LCButton variant="ghost" theme={theme}>
          State Hub
        </LCButton>
      </Link>

      <Link href={`/us/states/${stateCode}/legal`}>
        <LCButton variant="ghost" theme={theme}>
          Legal Breakdown
        </LCButton>
      </Link>

      <Link href={`/calculators/us/${stateCode}`}>
        <LCButton variant="ghost" theme={theme}>
          Calculators
        </LCButton>
      </Link>

      <Link href="/us/states">
        <LCButton variant="ghost" theme={theme}>
          All States
        </LCButton>
      </Link>

      <Link href="/us">
        <LCButton variant="ghost" theme={theme}>
          US Index
        </LCButton>
      </Link>
    </nav>
  )
}
