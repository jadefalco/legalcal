/**
 * LegalCals Enterprise SDK — TypeScript
 * Auto-generated from OpenAPI spec
 */

export class LegalCalsClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = "https://legalcals.com/api/v1") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  private _headers(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      "x-legalcals-key": this.apiKey,
    };
  }

  async getIntelligence(body: Record<string, any>): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/intelligence", { method: "POST", headers: this._headers(), body: JSON.stringify(body) });
    return res.json();
  }

  async getReasoning(body: Record<string, any>): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/reasoning", { method: "POST", headers: this._headers(), body: JSON.stringify(body) });
    return res.json();
  }

  async getChecklist(body: Record<string, any>): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/checklist", { method: "POST", headers: this._headers(), body: JSON.stringify(body) });
    return res.json();
  }

  async getRisk(body: Record<string, any>): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/risk", { method: "POST", headers: this._headers(), body: JSON.stringify(body) });
    return res.json();
  }

  async getHeatmap(body: Record<string, any>): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/heatmap", { method: "POST", headers: this._headers(), body: JSON.stringify(body) });
    return res.json();
  }

  async getSimilarityMatrix(body: Record<string, any>): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/similarity/matrix", { method: "POST", headers: this._headers(), body: JSON.stringify(body) });
    return res.json();
  }

  async getSimilarityClusters(body: Record<string, any>): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/similarity/clusters", { method: "POST", headers: this._headers(), body: JSON.stringify(body) });
    return res.json();
  }

  async getJurisdictionTrends(body: Record<string, any>): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/trends/jurisdiction", { method: "POST", headers: this._headers(), body: JSON.stringify(body) });
    return res.json();
  }

  async getNationalTrends(body: Record<string, any>): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/trends/national", { method: "POST", headers: this._headers(), body: JSON.stringify(body) });
    return res.json();
  }

  async getJurisdictionForecast(body: Record<string, any>): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/forecast/jurisdiction", { method: "POST", headers: this._headers(), body: JSON.stringify(body) });
    return res.json();
  }

  async getNationalForecast(body: Record<string, any>): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/forecast/national", { method: "POST", headers: this._headers(), body: JSON.stringify(body) });
    return res.json();
  }

  async getQuarterlyReport(body: Record<string, any>): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/reports/quarterly", { method: "POST", headers: this._headers(), body: JSON.stringify(body) });
    return res.json();
  }

  async getAnnualReport(body: Record<string, any>): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/reports/annual", { method: "POST", headers: this._headers(), body: JSON.stringify(body) });
    return res.json();
  }

  async listTopics(): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/topics", { method: "GET", headers: this._headers() });
    return res.json();
  }

  async getTopicCoverage(topic: string): Promise<any> {
    const res = await fetch("https://legalcals.com/api/v1/topics/${topic}/coverage", { method: "GET", headers: this._headers() });
    return res.json();
  }
}

export default LegalCalsClient;
