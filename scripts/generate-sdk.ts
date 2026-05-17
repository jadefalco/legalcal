#!/usr/bin/env tsx
/**
 * CLI script: generate-sdk
 *
 * Reads public/openapi/legalcals-v1.yaml and generates:
 *   sdk/js/index.ts
 *   sdk/python/legalcals.py
 *
 * Usage:
 *   npx tsx scripts/generate-sdk.ts
 */

import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

const OPENAPI_PATH = "public/openapi/legalcals-v1.yaml";
const JS_SDK_PATH = "sdk/js/index.ts";
const PYTHON_SDK_PATH = "sdk/python/legalcals.py";

function toMethodName(operationId: string): string {
  return operationId.replace(/\b\w/g, (c) => c.toLowerCase());
}

function toClassMethodName(operationId: string): string {
  return operationId.replace(/\b\w/g, (c, i) =>
    i === 0 ? c.toLowerCase() : c.toUpperCase()
  ).replace(/-/g, "");
}

function generateJsSdk(spec: any): string {
  const baseUrl = (spec.servers?.[0]?.url || "https://legalcals.com/api/v1").replace(
    /\/+$/, ""
  );

  let methods = "";
  for (const [route, methodsObj] of Object.entries(spec.paths || {})) {
    const pathObj = methodsObj as Record<string, any>;
    for (const [method, op] of Object.entries(pathObj)) {
      if (method === "parameters") continue;
      const opId = op.operationId || route.replace(/\//g, "_");
      const fnName = toClassMethodName(opId);
      const hasBody = ["post", "put", "patch"].includes(method);
      const isGet = method === "get";

      // Build param type
      const params: string[] = [];
      const pathParams: string[] = [];
      for (const p of op.parameters || []) {
        if (p.in === "path") {
          pathParams.push(p.name);
          params.push(`${p.name}: string`);
        }
      }
      if (hasBody) {
        params.push("body: Record<string, any>");
      }

      const paramStr = params.length > 0 ? params.join(", ") : "";

      let urlTemplate = `"${baseUrl}${route}"`;
      for (const pp of pathParams) {
        urlTemplate = urlTemplate.replace(`{${pp}}`, `\${${pp}}`);
      }

      const fetchOptions = hasBody
        ? `method: "${method.toUpperCase()}", headers: this._headers(), body: JSON.stringify(body)`
        : `method: "${method.toUpperCase()}", headers: this._headers()`;

      methods += `
  async ${fnName}(${paramStr}): Promise<any> {
    const res = await fetch(${urlTemplate}, { ${fetchOptions} });
    return res.json();
  }
`;
    }
  }

  return `/**
 * LegalCals Enterprise SDK — TypeScript
 * Auto-generated from OpenAPI spec
 */

export class LegalCalsClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = "${baseUrl}") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\\/+$/, "");
  }

  private _headers(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      "x-legalcals-key": this.apiKey,
    };
  }
${methods}}

export default LegalCalsClient;
`;
}

function generatePythonSdk(spec: any): string {
  const baseUrl = (spec.servers?.[0]?.url || "https://legalcals.com/api/v1").replace(
    /\/+$/, ""
  );

  let methods = "";
  for (const [route, methodsObj] of Object.entries(spec.paths || {})) {
    const pathObj = methodsObj as Record<string, any>;
    for (const [method, op] of Object.entries(pathObj)) {
      if (method === "parameters") continue;
      const opId = op.operationId || route.replace(/\//g, "_");
      const fnName = toMethodName(opId).replace(/-/g, "_");
      const hasBody = ["post", "put", "patch"].includes(method);
      const isGet = method === "get";

      const params: string[] = [];
      const pathParams: string[] = [];
      for (const p of op.parameters || []) {
        if (p.in === "path") {
          pathParams.push(p.name);
          params.push(`${p.name}: str`);
        }
      }
      if (hasBody) {
        params.push("body: dict = None");
      }

      const paramStr = params.length > 0 ? params.join(", ") : "";

      let urlTemplate = `f"{self.base_url}${route}"`;
      for (const pp of pathParams) {
        urlTemplate = urlTemplate.replace(`{${pp}}`, `{${pp}}`);
      }

      const requestKw = hasBody
        ? `json=body or {}`
        : "";

      methods += `
    def ${fnName}(self${paramStr ? ", " + paramStr : ""}):
        url = ${urlTemplate}
        response = self.session.${method}(url${requestKw ? ", " + requestKw : ""})
        response.raise_for_status()
        return response.json()
`;
    }
  }

  return `"""
LegalCals Enterprise SDK — Python
Auto-generated from OpenAPI spec
"""

import requests


class LegalCalsClient:
    def __init__(self, api_key: str, base_url: str = "${baseUrl}"):
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.session = requests.Session()
        self.session.headers.update({
            "Content-Type": "application/json",
            "x-legalcals-key": self.api_key,
        })
${methods}

__all__ = ["LegalCalsClient"]
`;
}

async function main() {
  if (!fs.existsSync(OPENAPI_PATH)) {
    console.error(`OpenAPI spec not found: ${OPENAPI_PATH}`);
    process.exit(1);
  }

  const spec = yaml.load(fs.readFileSync(OPENAPI_PATH, "utf-8")) as any;

  // JS SDK
  const jsDir = path.dirname(JS_SDK_PATH);
  if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir, { recursive: true });
  const jsSdk = generateJsSdk(spec);
  fs.writeFileSync(JS_SDK_PATH, jsSdk, "utf-8");
  console.log(`Written: ${JS_SDK_PATH}`);

  // Python SDK
  const pyDir = path.dirname(PYTHON_SDK_PATH);
  if (!fs.existsSync(pyDir)) fs.mkdirSync(pyDir, { recursive: true });
  const pySdk = generatePythonSdk(spec);
  fs.writeFileSync(PYTHON_SDK_PATH, pySdk, "utf-8");
  console.log(`Written: ${PYTHON_SDK_PATH}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
