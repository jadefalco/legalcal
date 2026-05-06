import { chromium } from "playwright";

const PDF_HTML_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page { size: A4; margin: 1in; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 12pt;
    line-height: 1.6;
    color: #1e293b;
    max-width: 100%;
  }
  h1 { font-size: 18pt; margin-bottom: 12pt; }
  h2 { font-size: 14pt; margin-bottom: 8pt; }
  p { margin-bottom: 8pt; }
  ul, ol { margin-bottom: 8pt; padding-left: 20pt; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 12pt; }
  th, td { border: 1px solid #cbd5e1; padding: 6pt; text-align: left; }
  th { background: #f1f5f9; font-weight: 600; }
</style>
</head>
<body>
{{CONTENT}}
</body>
</html>
`;

export async function renderPdfFromHtml(html: string): Promise<Buffer> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const fullHtml = PDF_HTML_TEMPLATE.replace("{{CONTENT}}", html);
  await page.setContent(fullHtml, { waitUntil: "networkidle" });

  const pdf = await page.pdf({
    format: "A4",
    margin: { top: "1in", right: "1in", bottom: "1in", left: "1in" },
    printBackground: true,
  });

  await browser.close();
  return Buffer.from(pdf);
}
