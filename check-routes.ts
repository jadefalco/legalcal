import { chromium } from "playwright";
import fs from "fs";

const STATES = [
  "al","ak","az","ar","ca","co","ct","de","fl","ga",
  "hi","id","il","in","ia","ks","ky","la","me","md",
  "ma","mi","mn","ms","mo","mt","nc","nd","ne","nh",
  "nj","nm","nv","ny","oh","ok","or","pa","ri","sc",
  "sd","tn","tx","ut","vt","va","wa","wv","wi","wy"
];

function normalize(url: string) {
  let out = url;

  // Normalize state codes
  STATES.forEach(s => {
    out = out.replace(`/us/states/${s}`, `/us/states/{state}`);
    out = out.replace(`/calculators/us/${s}`, `/calculators/us/{state}`);
  });

  // Normalize calculator slugs
  out = out.replace(/\/(eviction-timeline|deposit-return|rent-increase|lease-termination|eviction-notice|deposit-demand|itemized-deductions|entry-notice)/g,
    "/{calculator}"
  );

  // Normalize notices
  out = out.replace(/\/(nonpayment|lease-violation|end-of-lease|deposit-demand|itemized-deductions|entry|rent-increase|lease-termination)/g,
    "/{notice}"
  );

  return out;
}

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const urls = fs.readFileSync("routes.txt", "utf8")
    .split("\n")
    .map(u => u.trim())
    .filter(Boolean);

  const summary = {
    ok: 0,
    error404: 0,
    crash: 0,
    patterns404: {} as Record<string, number>
  };

  for (const url of urls) {
    const full = `http://localhost:3000${url}`;
    console.log("Checking:", full);

    try {
      const response = await page.goto(full, { waitUntil: "domcontentloaded", timeout: 15000 });
      const status = response?.status() ?? 0;

      if (status === 200) {
        summary.ok++;
      } else if (status === 404) {
        summary.error404++;

        const pattern = normalize(url);
        summary.patterns404[pattern] = (summary.patterns404[pattern] || 0) + 1;

      } else {
        summary.crash++;
      }

    } catch (err) {
      summary.crash++;
    }
  }

  await browser.close();

  console.log("\n=== SUMMARY ===");
  console.log("OK:", summary.ok);
  console.log("404:", summary.error404);
  console.log("CRASH:", summary.crash);

  console.log("\nMissing route patterns:");
  for (const [pattern, count] of Object.entries(summary.patterns404)) {
    console.log(`- ${pattern} (${count})`);
  }
}

run();