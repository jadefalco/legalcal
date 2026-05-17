export interface LegalCitation {
  statute: string;
  url: string;
  excerpt: string;
  sourceType: "statute" | "regulation" | "case" | "ag-guidance" | "municipal-code" | "other";
  lastUpdated: string;
  confidence: number;
}

export interface LegalVersion {
  version: string;
  effectiveDate: string | null;
  supersedes: string | null;
  notes: string[];
}

export interface LegalRuleBlock {
  data: Record<string, unknown>;
  citations: LegalCitation[];
  version: LegalVersion;
  expiresOn?: string | null;
  lastUpdated?: string | null;
}

export interface LegalAuthorityFile {
  jurisdiction: {
    country: string;
    state: string;
    city?: string;
  };
  topic: string;
  rule: LegalRuleBlock;
}
