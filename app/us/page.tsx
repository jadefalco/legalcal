import PageClient from "./PageClient"
import { usStates } from "@/app/config/usStates"
import { securityDepositRules } from "@/app/data/us/securityDepositRules"
import { defaultTheme } from "@/app/theme"

export default function Page() {
  const states = Object.entries(usStates).map(([code, state]) => ({
    code: state.slug,
    name: state.name,
  }))

  return (
    <PageClient
      states={states}
      theme={defaultTheme}
      securityDepositStateCodes={Object.keys(securityDepositRules)}
    />
  )
}
