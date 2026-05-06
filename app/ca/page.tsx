import PageClient from "./PageClient"
import { evictionRules } from "@/app/data/ca/evictionRules"
import { defaultTheme } from "@/app/theme"

export default function Page() {
  const provinces = Object.entries(evictionRules).map(([key, value]) => ({
    code: key,
    name: value.name,
  }))

  return <PageClient provinces={provinces} theme={defaultTheme} />
}
