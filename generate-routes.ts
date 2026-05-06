import fs from "fs";
import path from "path";

// 50 US states
const STATES = [
  "al","ak","az","ar","ca","co","ct","de","fl","ga",
  "hi","id","il","in","ia","ks","ky","la","me","md",
  "ma","mi","mn","ms","mo","mt","nc","nd","ne","nh",
  "nj","nm","nv","ny","oh","ok","or","pa","ri","sc",
  "sd","tn","tx","ut","vt","va","wa","wv","wi","wy"
];

// Your calculator slugs
const CALCULATORS = [
  "eviction-timeline",
  "deposit-return",
  "rent-increase",
  "lease-termination",
  "eviction-notice",
  "deposit-demand",
  "itemized-deductions",
  "entry-notice"
];

// Notice generators
const NOTICES = [
  "nonpayment",
  "lease-violation",
  "end-of-lease",
  "deposit-demand",
  "itemized-deductions",
  "entry",
  "rent-increase",
  "lease-termination"
];

// Subpages
const EVICTION_SUB = ["", "/rules", "/timeline", "/faq"];
const DEPOSIT_SUB = ["", "/rules", "/timeline", "/faq"];
const RENT_SUB = ["", "/rules", "/faq"];
const TERMINATION_SUB = ["", "/rules", "/faq"];

function generateRoutes() {
  const routes = new Set<string>();

  // Global routes
  routes.add("/");
  routes.add("/us");
  routes.add("/calculators");
  routes.add("/pricing");

  // Global calculators
  CALCULATORS.forEach(calc => {
    routes.add(`/calculators/${calc}`);
  });

  // State routes
  STATES.forEach(state => {
    routes.add(`/us/states/${state}`);
    routes.add(`/us/states/${state}/start`);
    routes.add(`/us/states/${state}/summary`);
    routes.add(`/us/states/${state}/tenant-rights`);
    routes.add(`/us/states/${state}/landlord-obligations`);

    // State calculators
    CALCULATORS.forEach(calc => {
      routes.add(`/calculators/us/${state}/${calc}`);
    });

    // Notices
    NOTICES.forEach(notice => {
      routes.add(`/us/states/${state}/notices/${notice}`);
    });

    // Eviction
    EVICTION_SUB.forEach(sub => {
      routes.add(`/us/states/${state}/eviction${sub}`);
    });

    // Deposit
    DEPOSIT_SUB.forEach(sub => {
      routes.add(`/us/states/${state}/security-deposit${sub}`);
    });

    // Rent increase
    RENT_SUB.forEach(sub => {
      routes.add(`/us/states/${state}/rent-increase${sub}`);
    });

    // Lease termination
    TERMINATION_SUB.forEach(sub => {
      routes.add(`/us/states/${state}/lease-termination${sub}`);
    });
  });

  // Write to routes.txt
  const sorted = Array.from(routes).sort();
  fs.writeFileSync("routes.txt", sorted.join("\n"), "utf8");

  console.log(`Generated ${sorted.length} routes.`);
}

generateRoutes();