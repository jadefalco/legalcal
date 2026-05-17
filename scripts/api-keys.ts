#!/usr/bin/env tsx
/**
 * CLI script: api-keys
 *
 * Manage enterprise API keys for the v1 API.
 *
 * Commands:
 *   --create --client <clientId>
 *   --revoke --client <clientId>
 *   --list
 */

import {
  generateApiKey,
  hashKey,
  loadApiKeys,
  saveApiKeys,
  type ApiKeyRecord,
} from "../lib/api/auth";

function parseArgs(): {
  create: boolean;
  revoke: boolean;
  list: boolean;
  client: string;
} {
  const args = process.argv.slice(2);
  let create = false;
  let revoke = false;
  let list = false;
  let client = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--create") {
      create = true;
    } else if (args[i] === "--revoke") {
      revoke = true;
    } else if (args[i] === "--list") {
      list = true;
    } else if (args[i] === "--client" && args[i + 1]) {
      client = args[i + 1];
      i++;
    }
  }

  if (!create && !revoke && !list) {
    console.error(
      "Usage: npx tsx scripts/api-keys.ts --create --client <clientId>"
    );
    console.error(
      "       npx tsx scripts/api-keys.ts --revoke --client <clientId>"
    );
    console.error("       npx tsx scripts/api-keys.ts --list");
    process.exit(1);
  }

  if ((create || revoke) && !client) {
    console.error("Error: --client is required for --create and --revoke.");
    process.exit(1);
  }

  return { create, revoke, list, client };
}

function doCreate(clientId: string) {
  const keys = loadApiKeys();
  const existing = keys.find((k) => k.clientId === clientId);
  if (existing) {
    console.error(
      `Client "${clientId}" already exists (active=${existing.active}). Revoke first to recreate.`
    );
    process.exit(1);
  }

  const plaintext = generateApiKey();
  const record: ApiKeyRecord = {
    clientId,
    apiKeyHash: hashKey(plaintext),
    limits: { perMinute: 60, perDay: 5000 },
    createdAt: new Date().toISOString(),
    active: true,
  };

  keys.push(record);
  saveApiKeys(keys);

  console.log(`\n✅ API key created for ${clientId}`);
  console.log(`\n🔑 Plaintext key (save this — it will not be shown again):`);
  console.log(plaintext);
  console.log(`\n📊 Limits: ${record.limits.perMinute}/min, ${record.limits.perDay}/day`);
}

function doRevoke(clientId: string) {
  const keys = loadApiKeys();
  const idx = keys.findIndex((k) => k.clientId === clientId);
  if (idx === -1) {
    console.error(`Client "${clientId}" not found.`);
    process.exit(1);
  }

  keys[idx].active = false;
  saveApiKeys(keys);
  console.log(`\n🚫 API key revoked for ${clientId}`);
}

function doList() {
  const keys = loadApiKeys();
  const active = keys.filter((k) => k.active);
  const inactive = keys.filter((k) => !k.active);

  console.log(`\n📋 API Keys`);
  console.log(`   Active: ${active.length} | Inactive: ${inactive.length} | Total: ${keys.length}\n`);

  if (keys.length === 0) {
    console.log("No keys found.");
    return;
  }

  for (const k of keys) {
    const status = k.active ? "🟢 active" : "🔴 revoked";
    console.log(
      `   ${status} | ${k.clientId} | limits=${k.limits.perMinute}/min, ${k.limits.perDay}/day | created=${k.createdAt}`
    );
  }
}

async function main() {
  const { create, revoke, list, client } = parseArgs();

  if (create) doCreate(client);
  if (revoke) doRevoke(client);
  if (list) doList();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
