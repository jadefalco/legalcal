import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const DOMAIN = "https://your-domain.com";

function scanPages(dir, baseUrlPath) {
  const routes = [];

  function walk(currentPath, urlPath) {
    if (!fs.existsSync(currentPath)) return;
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(currentPath, entry.name), `${urlPath}/${entry.name}`);
      } else if (entry.name === "page.tsx") {
        routes.push(urlPath);
      }
    }
  }

  walk(dir, baseUrlPath);
  return routes;
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function main() {
  console.log("Sitemap Generator\n");

  const routes = new Set();
  const lastmod = new Date().toISOString().split("T")[0];

  // Static routes
  routes.add("/");
  routes.add("/calculators");
  routes.add("/calculators/us");
  routes.add("/calculators/ca");

  // US calculators and state indexes
  const usDir = path.join(root, "app/calculators/us");
  if (fs.existsSync(usDir)) {
    const usRoutes = scanPages(usDir, "/calculators/us");
    usRoutes.forEach((r) => routes.add(r));
  }

  // Canada calculators and province indexes
  const caDir = path.join(root, "app/calculators/ca");
  if (fs.existsSync(caDir)) {
    const caRoutes = scanPages(caDir, "/calculators/ca");
    caRoutes.forEach((r) => routes.add(r));
  }

  // Build XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const route of Array.from(routes).sort()) {
    const loc = escapeXml(`${DOMAIN}${route}`);
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  const outputPath = path.join(root, "public/sitemap.xml");
  fs.writeFileSync(outputPath, xml);

  console.log(`✔ Sitemap generated with ${routes.size} URLs`);
  console.log(`  → ${path.relative(process.cwd(), outputPath)}`);
}

main().catch((err) => console.error(err));
