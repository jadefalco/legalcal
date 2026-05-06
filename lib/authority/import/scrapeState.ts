import { fetchStatuteText } from "../detection/fetchStatute";

interface ScrapedStatute {
  url: string;
  title: string;
  text: string;
}

/**
 * Default scraper for state statute websites.
 * Attempts to fetch from a known URL pattern and extract statute text.
 * In production, each state should have its own scraper override.
 */
async function defaultScraper(state: string): Promise<ScrapedStatute[]> {
  const results: ScrapedStatute[] = [];

  // Known patterns for demo/testing.
  // In production, this would be replaced with state-specific scrapers.
  const urls = getDemoUrls(state);

  for (const url of urls) {
    try {
      const text = await fetchStatuteText(url);
      if (text.length > 50) {
        results.push({
          url,
          title: extractTitleFromUrl(url),
          text,
        });
      }
    } catch {
      // Skip URLs that fail to fetch
    }
  }

  return results;
}

function extractTitleFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const segment = pathname.split("/").pop() || "Unknown Statute";
    return decodeURIComponent(segment).replace(/-/g, " ").replace(/\.html?$/i, "");
  } catch {
    return "Unknown Statute";
  }
}

function getDemoUrls(state: string): string[] {
  // Return a small set of demo URLs for testing the pipeline.
  // Real implementation would crawl state statute indices.
  const baseUrls: Record<string, string[]> = {
    ca: [
      "https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=3.&title=5.&part=4.&chapter=2.&article=",
    ],
    ny: [
      "https://www.nysenate.gov/legislation/laws/RPP",
    ],
  };

  return baseUrls[state.toLowerCase()] || [];
}

// Registry of state-specific scrapers.
const scraperRegistry: Record<string, (state: string) => Promise<ScrapedStatute[]>> = {};

export function registerStateScraper(
  state: string,
  scraper: (state: string) => Promise<ScrapedStatute[]>
): void {
  scraperRegistry[state.toLowerCase()] = scraper;
}

export async function scrapeStateStatutes(state: string): Promise<ScrapedStatute[]> {
  const scraper = scraperRegistry[state.toLowerCase()];
  if (scraper) {
    return scraper(state);
  }
  return defaultScraper(state);
}
