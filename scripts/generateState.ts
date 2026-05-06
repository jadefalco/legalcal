import fs from "fs"
import path from "path"

function loadTemplate(name: string) {
  const filePath = path.join(process.cwd(), "templates", name)
  return fs.readFileSync(filePath, "utf8")
}

function writeFileSafe(filePath: string, content: string, force: boolean) {
  if (fs.existsSync(filePath) && !force) {
    console.log(`⚠️  Skipped (exists): ${filePath}`)
    return
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, "utf8")
  console.log(`✅ Generated: ${filePath}`)
}

function applyTemplate(template: string, data: any) {
  return template
    .replace(/{{STATE_NAME}}/g, data.state)
    .replace(/{{STATE_CODE}}/g, data.code.toLowerCase())
    .replace(/{{STATE_CODE_UPPER}}/g, data.code.toUpperCase())
    .replace(/{{COUNTRY}}/g, data.country.toLowerCase())
    .replace(/{{COUNTRY_UPPER}}/g, data.country.toUpperCase())
    .replace(/{{NOTICE_MTM}}/g, data.noticePeriods.monthToMonth.toString())
    .replace(/{{NOTICE_WTW}}/g, data.noticePeriods.weekToWeek.toString())
    .replace(/{{NOTICE_YTY}}/g, data.noticePeriods.yearToYear.toString())
    .replace(/{{SPECIAL_CASES}}/g, data.rules.specialCases.map((x: string) => `"${x}"`).join(",\n      "))
    .replace(/{{LANDLORD_REQS}}/g, data.rules.landlordRequirements.map((x: string) => `"${x}"`).join(",\n      "))
    .replace(/{{TENANT_REQS}}/g, data.rules.tenantRequirements.map((x: string) => `"${x}"`).join(",\n      "))
    .replace(
      /{{CITATIONS}}/g,
      data.citations
        .map((c: any) => `{ text: "${c.text}", url: "${c.url}" }`)
        .join(",\n    ")
    )
    .replace(/{{LAST_UPDATED}}/g, data.metadata.lastUpdated)
    .replace(/{{SOURCE}}/g, data.metadata.source)
    .replace(/{{EDITOR_NOTES}}/g, data.metadata.editorNotes)
    .replace(/{{COMPONENT_NAME}}/g, `${data.code.toUpperCase()}Calculator`)
}

async function generate(country: string, stateCode: string, force = false) {
  const datasetPath = path.join(process.cwd(), "datasets", country, `${stateCode}.json`)

  if (!fs.existsSync(datasetPath)) {
    console.error(`❌ Dataset not found: ${datasetPath}`)
    process.exit(1)
  }

  const raw = fs.readFileSync(datasetPath, "utf8")
  const data = JSON.parse(raw)

  const pageTemplate = loadTemplate("page.tmpl")
  const dataTemplate = loadTemplate("data.tmpl")
  const schemaTemplate = loadTemplate("schema.tmpl")
  const componentTemplate = loadTemplate("component.tmpl")

  const pageOutput = applyTemplate(pageTemplate, data)
  const dataOutput = applyTemplate(dataTemplate, data)
  const schemaOutput = applyTemplate(schemaTemplate, data)
  const componentOutput = applyTemplate(componentTemplate, data)

  const pagePath = path.join("app", country, stateCode, "page.tsx")
  const dataPath = path.join("data", country, `${stateCode}.ts`)
  const schemaPath = path.join("schemas", country, `${stateCode}Schema.ts`)
  const componentPath = path.join("components", "calculators", country, `${data.code.toUpperCase()}Calculator.tsx`)

  writeFileSafe(pagePath, pageOutput, force)
  writeFileSafe(dataPath, dataOutput, force)
  writeFileSafe(schemaPath, schemaOutput, force)
  writeFileSafe(componentPath, componentOutput, force)

  console.log(`\n🎉 Finished generating ${data.state} (${data.code.toUpperCase()})`)
}

const args = process.argv.slice(2)
const [country, stateCode, flag] = args

if (!country || !stateCode) {
  console.log("Usage: npm run generate <country> <stateCode> [--force]")
  process.exit(1)
}

const force = flag === "--force"

generate(country, stateCode, force)
