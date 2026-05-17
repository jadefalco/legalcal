import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "authority", "authority.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initializeSchema(db);
    seedDocumentTemplates(db);
  }
  return db;
}

function initializeSchema(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS jurisdictions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country TEXT NOT NULL,
      state TEXT NOT NULL,
      city TEXT,
      UNIQUE(country, state, city)
    );

    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS rules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jurisdiction_id INTEGER NOT NULL,
      topic_id INTEGER NOT NULL,
      data_json TEXT NOT NULL,
      version TEXT NOT NULL,
      effective_date TEXT NOT NULL,
      supersedes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (jurisdiction_id) REFERENCES jurisdictions(id),
      FOREIGN KEY (topic_id) REFERENCES topics(id),
      UNIQUE(jurisdiction_id, topic_id)
    );

    CREATE TABLE IF NOT EXISTS citations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rule_id INTEGER NOT NULL,
      statute TEXT NOT NULL,
      url TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      source_type TEXT NOT NULL,
      last_updated TEXT NOT NULL,
      confidence REAL NOT NULL,
      FOREIGN KEY (rule_id) REFERENCES rules(id)
    );

    CREATE INDEX IF NOT EXISTS idx_rules_jurisdiction_topic ON rules(jurisdiction_id, topic_id);
    CREATE INDEX IF NOT EXISTS idx_rules_topic ON rules(topic_id);
    CREATE INDEX IF NOT EXISTS idx_citations_rule ON citations(rule_id);
    CREATE INDEX IF NOT EXISTS idx_jurisdictions_state_city ON jurisdictions(state, city);

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rule_id INTEGER NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'placeholder',
      reviewer TEXT,
      reviewed_at TEXT,
      notes TEXT NOT NULL DEFAULT '',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (rule_id) REFERENCES rules(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_reviews_rule_id ON reviews(rule_id);
    CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);

    CREATE TABLE IF NOT EXISTS statute_snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      citation_id INTEGER NOT NULL,
      fetched_at TEXT NOT NULL,
      content_hash TEXT NOT NULL,
      content_text TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (citation_id) REFERENCES citations(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS statute_alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      citation_id INTEGER NOT NULL,
      rule_id INTEGER NOT NULL,
      detected_at TEXT NOT NULL,
      old_hash TEXT NOT NULL,
      new_hash TEXT NOT NULL,
      diff_text TEXT NOT NULL,
      acknowledged INTEGER NOT NULL DEFAULT 0,
      acknowledged_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (citation_id) REFERENCES citations(id) ON DELETE CASCADE,
      FOREIGN KEY (rule_id) REFERENCES rules(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_snapshots_citation_id ON statute_snapshots(citation_id);
    CREATE INDEX IF NOT EXISTS idx_alerts_citation_id ON statute_alerts(citation_id);
    CREATE INDEX IF NOT EXISTS idx_alerts_rule_id ON statute_alerts(rule_id);
    CREATE INDEX IF NOT EXISTS idx_alerts_acknowledged ON statute_alerts(acknowledged);

    CREATE TABLE IF NOT EXISTS research_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jurisdiction_id INTEGER NOT NULL,
      topic_id INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      assigned_to TEXT,
      notes TEXT NOT NULL DEFAULT '',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (jurisdiction_id) REFERENCES jurisdictions(id) ON DELETE CASCADE,
      FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE,
      UNIQUE(jurisdiction_id, topic_id)
    );

    CREATE INDEX IF NOT EXISTS idx_research_queue_jurisdiction_id ON research_queue(jurisdiction_id);
    CREATE INDEX IF NOT EXISTS idx_research_queue_topic_id ON research_queue(topic_id);
    CREATE INDEX IF NOT EXISTS idx_research_queue_status ON research_queue(status);

    CREATE TABLE IF NOT EXISTS api_tiers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      monthly_quota INTEGER NOT NULL,
      rate_limit_per_minute INTEGER NOT NULL,
      overage_price_per_1000 REAL NOT NULL
    );

    INSERT OR IGNORE INTO api_tiers (name, monthly_quota, rate_limit_per_minute, overage_price_per_1000)
    VALUES
      ('free', 1000, 30, 5),
      ('pro', 100000, 300, 2),
      ('enterprise', 1000000, 2000, 1);

    CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      owner_name TEXT NOT NULL,
      owner_email TEXT NOT NULL,
      tier TEXT NOT NULL DEFAULT 'free',
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      last_used_at TEXT,
      FOREIGN KEY (tier) REFERENCES api_tiers(name)
    );

    CREATE TABLE IF NOT EXISTS api_usage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      api_key_id INTEGER NOT NULL,
      route TEXT NOT NULL,
      timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
      status_code INTEGER NOT NULL,
      response_time_ms INTEGER NOT NULL,
      FOREIGN KEY (api_key_id) REFERENCES api_keys(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_api_keys_key ON api_keys(key);
    CREATE INDEX IF NOT EXISTS idx_api_keys_active ON api_keys(active);
    CREATE INDEX IF NOT EXISTS idx_api_usage_api_key_id ON api_usage(api_key_id);
    CREATE INDEX IF NOT EXISTS idx_api_usage_timestamp ON api_usage(timestamp);
    CREATE INDEX IF NOT EXISTS idx_api_usage_route ON api_usage(route);

    CREATE TABLE IF NOT EXISTS import_jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      state TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      started_at TEXT DEFAULT CURRENT_TIMESTAMP,
      finished_at TEXT,
      error_message TEXT
    );

    CREATE TABLE IF NOT EXISTS import_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id INTEGER NOT NULL,
      statute_url TEXT NOT NULL,
      topic TEXT,
      action TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (job_id) REFERENCES import_jobs(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_import_jobs_state ON import_jobs(state);
    CREATE INDEX IF NOT EXISTS idx_import_logs_job_id ON import_logs(job_id);

    CREATE TABLE IF NOT EXISTS widget_usage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      api_key_id INTEGER,
      calculator TEXT NOT NULL,
      country TEXT NOT NULL,
      state TEXT,
      province TEXT,
      city TEXT,
      timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
      event_type TEXT NOT NULL,
      metadata TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_widget_usage_calculator ON widget_usage(calculator);
    CREATE INDEX IF NOT EXISTS idx_widget_usage_timestamp ON widget_usage(timestamp);
    CREATE INDEX IF NOT EXISTS idx_widget_usage_event_type ON widget_usage(event_type);

    CREATE TABLE IF NOT EXISTS document_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT,
      template_html TEXT NOT NULL,
      required_fields TEXT NOT NULL DEFAULT '[]',
      auto_fields TEXT NOT NULL DEFAULT '[]',
      jurisdiction_scopes TEXT NOT NULL DEFAULT '[]',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS document_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      template_id INTEGER NOT NULL,
      api_key_id INTEGER,
      jurisdiction TEXT NOT NULL,
      topic TEXT NOT NULL,
      timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
      metadata TEXT,
      FOREIGN KEY (template_id) REFERENCES document_templates(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_document_templates_slug ON document_templates(slug);
    CREATE INDEX IF NOT EXISTS idx_document_logs_template_id ON document_logs(template_id);
    CREATE INDEX IF NOT EXISTS idx_document_logs_timestamp ON document_logs(timestamp);
  `);
}

export function seedDocumentTemplates(database: Database.Database) {
  const templates = [
    {
      slug: "bc-notice-to-enter",
      name: "BC Notice to Enter",
      description: "Landlord notice to enter a rental unit in British Columbia.",
      category: "notice",
      html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Notice to Enter Rental Unit — British Columbia</title><style>.document-container{max-width:800px;margin:0 auto;padding:40px;font-family:Georgia,"Times New Roman",serif;line-height:1.6;color:#1a1a1a;background:#fff}.document-header{text-align:center;border-bottom:2px solid #1a1a1a;padding-bottom:20px;margin-bottom:30px}.document-header h1{font-size:22px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px}.document-header .subtitle{font-size:15px;color:#555}.document-date{text-align:right;margin-bottom:30px;font-size:14px}.party-block{margin-bottom:20px}.party-block .label{font-weight:bold;text-transform:uppercase;font-size:12px;color:#555;letter-spacing:0.5px}.party-block .value{font-size:15px;margin-top:4px}.document-body{margin:30px 0}.document-body p{margin-bottom:16px;text-align:justify}.notice-box{background:#f8f9fa;border-left:4px solid #1a1a1a;padding:16px 20px;margin:24px 0}.notice-box strong{display:block;margin-bottom:8px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px}.signature-block{margin-top:40px}.signature-line{margin-top:30px;border-top:1px solid #1a1a1a;width:300px;padding-top:8px;font-size:14px}.disclaimer{margin-top:40px;padding-top:20px;border-top:1px solid #ddd;font-size:12px;color:#666;line-height:1.5}@media print{.document-container{padding:0}}</style></head><body><div class="document-container"><div class="document-header"><h1>Notice to Enter Rental Unit</h1><div class="subtitle">British Columbia — Residential Tenancy Act, SBC 2002, c 78, s 29</div></div><div class="document-date"><strong>Date:</strong> {{today}}</div><div class="party-block"><div class="label">To (Tenant)</div><div class="value">{{tenant_name}}</div></div><div class="party-block"><div class="label">Rental Address</div><div class="value">{{rental_address}}{{#if unit_number}}, Unit {{unit_number}}{{/if}}</div></div><div class="party-block"><div class="label">From (Landlord / Property Manager)</div><div class="value">{{landlord_name}}</div></div><div class="document-body"><p>This notice is provided under the <em>Residential Tenancy Act</em> (SBC 2002, c 78). The landlord intends to enter the rental unit for the following purpose: <strong>{{entry_purpose}}</strong>.</p><p>Date of entry: <strong>{{entry_date}}</strong></p><p>Time of entry: <strong>{{entry_time}}</strong></p></div><div class="notice-box"><strong>Notice Requirements</strong><div>This notice is given at least <strong>{{rule.data.noticeHours}} hours</strong> before the proposed entry.</div><div style="margin-top:8px">Entry must be between <strong>8:00 a.m. and 9:00 p.m.</strong> unless the tenant agrees otherwise.</div><div style="margin-top:8px">In case of emergency, advance notice is not required.</div></div><div class="signature-block"><p>Sincerely,</p><div class="signature-line">{{landlord_name}}</div><p style="font-size:14px;margin-top:8px"><strong>Contact:</strong> {{landlord_contact}}</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This document is generated for informational purposes only and does not constitute legal advice. Verify compliance with current Residential Tenancy Branch (RTB) requirements before serving any notice. Failure to comply with statutory notice requirements may affect your rights.</div></div></body></html>`,
      required: '["tenant_name","rental_address","unit_number","entry_purpose","entry_date","entry_time","landlord_name","landlord_contact"]',
      auto: '["today","rule.data.noticeHours"]',
      scopes: '["ca-bc"]',
    },
    {
      slug: "bc-rent-increase-notice",
      name: "BC Rent Increase Notice",
      description: "Notice of rent increase for a BC tenancy.",
      category: "notice",
      html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Notice of Rent Increase — British Columbia</title><style>.document-container{max-width:800px;margin:0 auto;padding:40px;font-family:Georgia,"Times New Roman",serif;line-height:1.6;color:#1a1a1a;background:#fff}.document-header{text-align:center;border-bottom:2px solid #1a1a1a;padding-bottom:20px;margin-bottom:30px}.document-header h1{font-size:22px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px}.document-header .subtitle{font-size:15px;color:#555}.document-date{text-align:right;margin-bottom:30px;font-size:14px}.party-block{margin-bottom:20px}.party-block .label{font-weight:bold;text-transform:uppercase;font-size:12px;color:#555;letter-spacing:0.5px}.party-block .value{font-size:15px;margin-top:4px}.document-body{margin:30px 0}.document-body p{margin-bottom:16px;text-align:justify}.deadline-box{background:#f8f9fa;border-left:4px solid #1a1a1a;padding:16px 20px;margin:24px 0}.deadline-box strong{display:block;margin-bottom:8px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px}.signature-block{margin-top:40px}.signature-line{margin-top:30px;border-top:1px solid #1a1a1a;width:300px;padding-top:8px;font-size:14px}.disclaimer{margin-top:40px;padding-top:20px;border-top:1px solid #ddd;font-size:12px;color:#666;line-height:1.5}@media print{.document-container{padding:0}}</style></head><body><div class="document-container"><div class="document-header"><h1>Notice of Rent Increase</h1><div class="subtitle">British Columbia — Residential Tenancy Act, SBC 2002, c 78, s 42</div></div><div class="document-date"><strong>Date of Notice:</strong> {{today}}</div><div class="party-block"><div class="label">To (Tenant)</div><div class="value">{{tenant_name}}</div></div><div class="party-block"><div class="label">Rental Address</div><div class="value">{{rental_address}}</div></div><div class="party-block"><div class="label">From (Landlord)</div><div class="value">{{landlord_name}}</div></div><div class="document-body"><p><strong>RE: Notice of Rent Increase</strong></p><p>Please be advised that the monthly rent for the above rental unit will be increased as follows:</p><ul><li>Current rent: <strong>\${{current_rent}}</strong></li><li>New rent: <strong>\${{new_rent}}</strong></li><li>Increase amount: <strong>\${{increase_amount}}</strong> ({{increase_percent}}%)</li><li>Effective date: <strong>{{effective_date}}</strong></li></ul><p>This increase complies with the current annual rent increase limit of <strong>{{rule.data.rentIncreaseLimit}}%</strong> set by the BC government.</p></div><div class="deadline-box"><strong>Notice Requirements</strong><div>Notice period: <strong>{{rule.data.noticePeriodDays}} days</strong> (3 full calendar months) minimum</div><div style="margin-top:8px">Date notice served: <strong>{{notice_date}}</strong></div><div style="margin-top:8px">Frequency limit: No more than one increase per 12-month period.</div></div><div class="signature-block"><p>Sincerely,</p><div class="signature-line">{{landlord_name}}</div><p style="font-size:14px;margin-top:8px"><strong>Contact:</strong> {{landlord_contact}}</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This document is generated for informational purposes only and does not constitute legal advice. Landlords must use the official Residential Tenancy Branch (RTB) notice form where required. Some properties are exempt from rent increase caps. Verify current rules with the RTB before serving any notice.</div></div></body></html>`,
      required: '["tenant_name","rental_address","current_rent","new_rent","increase_amount","increase_percent","effective_date","notice_date","landlord_name","landlord_contact"]',
      auto: '["today","rule.data.rentIncreaseLimit","rule.data.noticePeriodDays"]',
      scopes: '["ca-bc"]',
    },
    {
      slug: "bc-condition-inspection-report",
      name: "BC Condition Inspection Report",
      description: "Condition inspection report for a BC tenancy.",
      category: "inspection",
      html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Condition Inspection Report — British Columbia</title><style>.document-container{max-width:800px;margin:0 auto;padding:40px;font-family:Georgia,"Times New Roman",serif;line-height:1.6;color:#1a1a1a;background:#fff}.document-header{text-align:center;border-bottom:2px solid #1a1a1a;padding-bottom:20px;margin-bottom:30px}.document-header h1{font-size:22px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px}.document-header .subtitle{font-size:15px;color:#555}.document-date{text-align:right;margin-bottom:30px;font-size:14px}.party-block{margin-bottom:20px}.party-block .label{font-weight:bold;text-transform:uppercase;font-size:12px;color:#555;letter-spacing:0.5px}.party-block .value{font-size:15px;margin-top:4px}.document-body{margin:30px 0}.document-body p{margin-bottom:16px;text-align:justify}.section-title{font-size:16px;font-weight:bold;margin:24px 0 12px 0;border-bottom:1px solid #ddd;padding-bottom:6px}.signature-block{margin-top:40px}.signature-line{margin-top:30px;border-top:1px solid #1a1a1a;width:300px;padding-top:8px;font-size:14px}.disclaimer{margin-top:40px;padding-top:20px;border-top:1px solid #ddd;font-size:12px;color:#666;line-height:1.5}@media print{.document-container{padding:0}}</style></head><body><div class="document-container"><div class="document-header"><h1>Condition Inspection Report</h1><div class="subtitle">British Columbia — Residential Tenancy Act, SBC 2002, c 78, s 17</div></div><div class="document-date"><strong>Date:</strong> {{today}}</div><div class="party-block"><div class="label">Rental Address</div><div class="value">{{rental_address}}{{#if unit_number}}, Unit {{unit_number}}{{/if}}</div></div><div class="party-block"><div class="label">Tenant</div><div class="value">{{tenant_name}}</div></div><div class="party-block"><div class="label">Landlord</div><div class="value">{{landlord_name}}</div></div><div class="party-block"><div class="label">Inspection Type</div><div class="value">{{inspection_type}}</div></div><div class="document-body"><div class="section-title">General Condition</div><p>{{general_condition}}</p><div class="section-title">Issues / Damage Noted</div><p>{{issues_noted}}</p></div><div class="document-body"><p><strong>Report deadline:</strong> The inspection report must be completed within <strong>{{rule.data.reportDeadlineDays}} days</strong> of the inspection date where applicable.</p><p>Both the landlord and tenant have the right to attend the inspection. Both parties should sign this report and each should keep a copy.</p></div><div class="signature-block"><p>Tenant signature:</p><div class="signature-line">{{tenant_name}}</div><p style="font-size:14px;margin-top:8px">Date: ___________________</p></div><div class="signature-block"><p>Landlord signature:</p><div class="signature-line">{{landlord_name}}</div><p style="font-size:14px;margin-top:8px">Date: ___________________</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This document is generated for informational purposes only and does not constitute legal advice. Verify compliance with current Residential Tenancy Branch (RTB) requirements. The inspection report should accurately reflect the condition of the rental unit at the time of inspection.</div></div></body></html>`,
      required: '["rental_address","unit_number","tenant_name","landlord_name","inspection_type","general_condition","issues_noted"]',
      auto: '["today","rule.data.reportDeadlineDays"]',
      scopes: '["ca-bc"]',
    },
    {
      slug: "bc-deposit-return-letter",
      name: "BC Deposit Return Letter",
      description: "Letter accompanying return of a security deposit in BC.",
      category: "letter",
      html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Security Deposit Return — British Columbia</title><style>.document-container{max-width:800px;margin:0 auto;padding:40px;font-family:Georgia,"Times New Roman",serif;line-height:1.6;color:#1a1a1a;background:#fff}.document-header{text-align:center;border-bottom:2px solid #1a1a1a;padding-bottom:20px;margin-bottom:30px}.document-header h1{font-size:22px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px}.document-header .subtitle{font-size:15px;color:#555}.document-date{text-align:right;margin-bottom:30px;font-size:14px}.party-block{margin-bottom:20px}.party-block .label{font-weight:bold;text-transform:uppercase;font-size:12px;color:#555;letter-spacing:0.5px}.party-block .value{font-size:15px;margin-top:4px}.document-body{margin:30px 0}.document-body p{margin-bottom:16px;text-align:justify}.deadline-box{background:#f8f9fa;border-left:4px solid #1a1a1a;padding:16px 20px;margin:24px 0}.deadline-box strong{display:block;margin-bottom:8px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px}.signature-block{margin-top:40px}.signature-line{margin-top:30px;border-top:1px solid #1a1a1a;width:300px;padding-top:8px;font-size:14px}.disclaimer{margin-top:40px;padding-top:20px;border-top:1px solid #ddd;font-size:12px;color:#666;line-height:1.5}@media print{.document-container{padding:0}}</style></head><body><div class="document-container"><div class="document-header"><h1>Security Deposit Return</h1><div class="subtitle">British Columbia — Residential Tenancy Act, SBC 2002, c 78, s 38</div></div><div class="document-date"><strong>Date:</strong> {{today}}</div><div class="party-block"><div class="label">To (Tenant)</div><div class="value">{{tenant_name}}</div></div><div class="party-block"><div class="label">Rental Address</div><div class="value">{{rental_address}}</div></div><div class="document-body"><p>Dear {{tenant_name}},</p><p>Your security deposit is being returned as follows:</p><ul><li>Total deposit: <strong>\${{deposit_amount}}</strong></li><li>Deductions: <strong>\${{deductions}}</strong></li><li>Amount returned: <strong>\${{amount_returned}}</strong></li></ul><p><strong>Deductions Breakdown</strong></p><p>{{deductions_breakdown}}</p></div><div class="deadline-box"><strong>Return Requirements</strong><div>This return is made within the required <strong>{{rule.data.returnDeadlineDays}}-day</strong> period after the tenant vacates the rental unit.</div><div style="margin-top:8px">An itemized statement of deductions is required if any amount is withheld.</div></div><div class="signature-block"><p>Sincerely,</p><div class="signature-line">{{landlord_name}}</div><p style="font-size:14px;margin-top:8px"><strong>Contact:</strong> {{landlord_contact}}</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This document is generated for informational purposes only and does not constitute legal advice. Verify compliance with current Residential Tenancy Branch (RTB) requirements. Tenants may apply for dispute resolution through the RTB if they believe deductions are improper.</div></div></body></html>`,
      required: '["tenant_name","rental_address","deposit_amount","deductions","amount_returned","deductions_breakdown","landlord_name","landlord_contact"]',
      auto: '["today","rule.data.returnDeadlineDays"]',
      scopes: '["ca-bc"]',
    },
    {
      slug: "bc-repair-request-letter",
      name: "BC Repair Request Letter",
      description: "Tenant letter requesting repairs in BC.",
      category: "letter",
      html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Repair Request — British Columbia</title><style>.document-container{max-width:800px;margin:0 auto;padding:40px;font-family:Georgia,"Times New Roman",serif;line-height:1.6;color:#1a1a1a;background:#fff}.document-header{text-align:center;border-bottom:2px solid #1a1a1a;padding-bottom:20px;margin-bottom:30px}.document-header h1{font-size:22px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px}.document-header .subtitle{font-size:15px;color:#555}.document-date{text-align:right;margin-bottom:30px;font-size:14px}.party-block{margin-bottom:20px}.party-block .label{font-weight:bold;text-transform:uppercase;font-size:12px;color:#555;letter-spacing:0.5px}.party-block .value{font-size:15px;margin-top:4px}.document-body{margin:30px 0}.document-body p{margin-bottom:16px;text-align:justify}.notice-box{background:#f8f9fa;border-left:4px solid #1a1a1a;padding:16px 20px;margin:24px 0}.notice-box strong{display:block;margin-bottom:8px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px}.signature-block{margin-top:40px}.signature-line{margin-top:30px;border-top:1px solid #1a1a1a;width:300px;padding-top:8px;font-size:14px}.disclaimer{margin-top:40px;padding-top:20px;border-top:1px solid #ddd;font-size:12px;color:#666;line-height:1.5}@media print{.document-container{padding:0}}</style></head><body><div class="document-container"><div class="document-header"><h1>Repair Request</h1><div class="subtitle">British Columbia — Residential Tenancy Act, SBC 2002, c 78, s 32</div></div><div class="document-date"><strong>Date:</strong> {{today}}</div><div class="party-block"><div class="label">To (Landlord / Property Manager)</div><div class="value">{{landlord_name}}</div></div><div class="party-block"><div class="label">Rental Address</div><div class="value">{{rental_address}}</div></div><div class="party-block"><div class="label">From (Tenant)</div><div class="value">{{tenant_name}}</div></div><div class="document-body"><p>Dear {{landlord_name}},</p><p>I am writing to request repairs to the following issue(s) at the rental unit:</p><p><strong>{{repair_issue}}</strong></p><p>This issue was first noticed on <strong>{{issue_date}}</strong>. It is classified as <strong>{{urgency}}</strong>.</p><p>Under the <em>Residential Tenancy Act</em> (SBC 2002, c 78, s 32), the landlord is required to maintain the rental unit in a reasonable state of repair. Please arrange for the necessary repairs within a reasonable time.</p></div><div class="notice-box"><strong>Repair Timeline Expectations</strong><div>Urgent repairs (e.g., major leaks, heating failure, electrical hazards): typically <strong>{{rule.data.repairUrgentTimelineHours}} hours</strong></div><div style="margin-top:8px">Non-urgent repairs: typically <strong>{{rule.data.repairNonUrgentTimelineDays}} days</strong></div></div><div class="signature-block"><p>Sincerely,</p><div class="signature-line">{{tenant_name}}</div><p style="font-size:14px;margin-top:8px"><strong>Contact:</strong> {{tenant_contact}}</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This document is generated for informational purposes only and does not constitute legal advice. Keep a copy of this request for your records. If the landlord fails to make necessary repairs, tenants may contact the Residential Tenancy Branch (RTB) for dispute resolution.</div></div></body></html>`,
      required: '["landlord_name","rental_address","repair_issue","issue_date","urgency","tenant_name","tenant_contact"]',
      auto: '["today","rule.data.repairUrgentTimelineHours","rule.data.repairNonUrgentTimelineDays"]',
      scopes: '["ca-bc"]',
    },
    {
      slug: "bc-notice-to-end-tenancy",
      name: "BC Notice to End Tenancy",
      description: "Notice to end a tenancy in British Columbia.",
      category: "notice",
      html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Notice to End Tenancy — British Columbia</title><style>.document-container{max-width:800px;margin:0 auto;padding:40px;font-family:Georgia,"Times New Roman",serif;line-height:1.6;color:#1a1a1a;background:#fff}.document-header{text-align:center;border-bottom:2px solid #1a1a1a;padding-bottom:20px;margin-bottom:30px}.document-header h1{font-size:22px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px}.document-header .subtitle{font-size:15px;color:#555}.document-date{text-align:right;margin-bottom:30px;font-size:14px}.party-block{margin-bottom:20px}.party-block .label{font-weight:bold;text-transform:uppercase;font-size:12px;color:#555;letter-spacing:0.5px}.party-block .value{font-size:15px;margin-top:4px}.document-body{margin:30px 0}.document-body p{margin-bottom:16px;text-align:justify}.deadline-box{background:#f8f9fa;border-left:4px solid #1a1a1a;padding:16px 20px;margin:24px 0}.deadline-box strong{display:block;margin-bottom:8px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px}.signature-block{margin-top:40px}.signature-line{margin-top:30px;border-top:1px solid #1a1a1a;width:300px;padding-top:8px;font-size:14px}.disclaimer{margin-top:40px;padding-top:20px;border-top:1px solid #ddd;font-size:12px;color:#666;line-height:1.5}.warning-box{background:#fff8e1;border-left:4px solid #f9a825;padding:16px 20px;margin:24px 0}.warning-box strong{display:block;margin-bottom:8px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#f57f17}@media print{.document-container{padding:0}}</style></head><body><div class="document-container"><div class="document-header"><h1>Notice to End Tenancy</h1><div class="subtitle">British Columbia — Residential Tenancy Act, SBC 2002, c 78</div></div><div class="document-date"><strong>Date:</strong> {{today}}</div><div class="party-block"><div class="label">To</div><div class="value">{{recipient_name}} ({{recipient_role}})</div></div><div class="party-block"><div class="label">Rental Address</div><div class="value">{{rental_address}}</div></div><div class="party-block"><div class="label">From</div><div class="value">{{sender_name}} ({{sender_role}})</div></div><div class="document-body"><p>This notice is provided under the <em>Residential Tenancy Act</em> (SBC 2002, c 78).</p><p>The tenancy for the above rental unit will end on <strong>{{end_date}}</strong>.</p><p>Reason / basis: <strong>{{end_reason}}</strong></p></div><div class="deadline-box"><strong>Notice Period</strong><div>This notice is given at least <strong>{{rule.data.tenantNoticePeriodDays}} days</strong> before the proposed end date.</div><div style="margin-top:8px">Tenant notice for month-to-month: one full rental month minimum.</div><div style="margin-top:8px">Landlord notice varies by reason (e.g., 2 months for landlord use, 4 months for renovation).</div></div><div class="warning-box"><strong>Important</strong><div>The Residential Tenancy Branch (RTB) requires specific notice forms for many types of tenancy endings. Use the official RTB form and follow proper service requirements.</div></div><div class="signature-block"><p>Sincerely,</p><div class="signature-line">{{sender_name}}</div><p style="font-size:14px;margin-top:8px"><strong>Contact:</strong> {{sender_contact}}</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This document is generated for informational purposes only and does not constitute legal advice. Landlord-tenant laws vary by situation and change frequently. You should consult with a licensed attorney or the Residential Tenancy Branch (RTB) before serving any notice to end tenancy. Failure to comply with statutory notice requirements may result in dismissal of a dispute resolution claim or court action.</div></div></body></html>`,
      required: '["recipient_name","recipient_role","rental_address","end_date","end_reason","sender_name","sender_contact","sender_role"]',
      auto: '["today","rule.data.tenantNoticePeriodDays","rule.data.landlordNoticePeriodDays"]',
      scopes: '["ca-bc"]',
    },
  ];

  const stmt = database.prepare(`
    INSERT OR IGNORE INTO document_templates (slug, name, description, category, template_html, required_fields, auto_fields, jurisdiction_scopes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const t of templates) {
    stmt.run(t.slug, t.name, t.description, t.category, t.html, t.required, t.auto, t.scopes);
  }
}

export function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}

// ── Admin helpers ──

export async function listJurisdictions(): Promise<
  { id: number; country: string; state: string; city: string | null }[]
> {
  const database = getDb();
  const stmt = database.prepare(
    "SELECT id, country, state, city FROM jurisdictions ORDER BY country, state, city"
  );
  return stmt.all() as { id: number; country: string; state: string; city: string | null }[];
}

export async function listTopics(): Promise<{ id: number; name: string }[]> {
  const database = getDb();
  const stmt = database.prepare("SELECT id, name FROM topics ORDER BY name");
  return stmt.all() as { id: number; name: string }[];
}

export async function getOrCreateJurisdiction(
  country: string,
  state: string,
  city: string | null = null
): Promise<number> {
  const database = getDb();
  const existing = database.prepare(
    "SELECT id FROM jurisdictions WHERE country = ? AND state = ? AND city IS ?"
  ).get(country, state, city) as { id: number } | undefined;

  if (existing) {
    return existing.id;
  }

  const result = database.prepare(
    "INSERT INTO jurisdictions (country, state, city) VALUES (?, ?, ?)"
  ).run(country, state, city);
  return Number(result.lastInsertRowid);
}

export async function getOrCreateTopic(name: string): Promise<number> {
  const database = getDb();
  const existing = database.prepare(
    "SELECT id FROM topics WHERE name = ?"
  ).get(name) as { id: number } | undefined;

  if (existing) {
    return existing.id;
  }

  const result = database.prepare(
    "INSERT INTO topics (name) VALUES (?)"
  ).run(name);
  return Number(result.lastInsertRowid);
}

export async function listRulesForJurisdiction(
  jurisdictionId: number
): Promise<
  {
    id: number;
    topicName: string;
    version: string;
    effectiveDate: string;
    supersedes: string | null;
    createdAt: string;
  }[]
> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT r.id, t.name as topicName, r.version, r.effective_date as effectiveDate,
           r.supersedes, r.created_at as createdAt
    FROM rules r
    JOIN topics t ON r.topic_id = t.id
    WHERE r.jurisdiction_id = ?
    ORDER BY t.name
  `);
  return stmt.all(jurisdictionId) as {
    id: number;
    topicName: string;
    version: string;
    effectiveDate: string;
    supersedes: string | null;
    createdAt: string;
  }[];
}

export async function getRuleWithCitations(
  jurisdictionId: number,
  topicName: string
): Promise<
  | {
      rule: {
        id: number;
        jurisdictionId: number;
        topicId: number;
        dataJson: string;
        version: string;
        effectiveDate: string;
        supersedes: string | null;
      };
      citations: {
        id: number;
        statute: string;
        url: string;
        excerpt: string;
        sourceType: string;
        lastUpdated: string;
        confidence: number;
      }[];
    }
  | null
> {
  const database = getDb();
  const ruleStmt = database.prepare(`
    SELECT r.id, r.jurisdiction_id as jurisdictionId, r.topic_id as topicId, r.data_json as dataJson, r.version, r.effective_date as effectiveDate, r.supersedes
    FROM rules r
    JOIN topics t ON r.topic_id = t.id
    WHERE r.jurisdiction_id = ? AND t.name = ?
  `);
  const rule = ruleStmt.get(jurisdictionId, topicName) as {
    id: number;
    jurisdictionId: number;
    topicId: number;
    dataJson: string;
    version: string;
    effectiveDate: string;
    supersedes: string | null;
  } | undefined;

  if (!rule) return null;

  const citationStmt = database.prepare(`
    SELECT id, statute, url, excerpt, source_type as sourceType, last_updated as lastUpdated, confidence
    FROM citations
    WHERE rule_id = ?
    ORDER BY id
  `);
  const citations = citationStmt.all(rule.id) as {
    id: number;
    statute: string;
    url: string;
    excerpt: string;
    sourceType: string;
    lastUpdated: string;
    confidence: number;
  }[];

  return { rule, citations };
}

export async function updateRuleData(
  ruleId: number,
  dataJson: string,
  version: string,
  effectiveDate: string
): Promise<void> {
  const database = getDb();
  const stmt = database.prepare(`
    UPDATE rules
    SET data_json = ?, version = ?, effective_date = ?
    WHERE id = ?
  `);
  stmt.run(dataJson, version, effectiveDate, ruleId);
}

export async function upsertCitation(
  ruleId: number,
  citation: {
    id?: number;
    statute: string;
    url: string;
    excerpt: string;
    sourceType: string;
    lastUpdated: string;
    confidence: number;
  }
): Promise<void> {
  const database = getDb();
  if (citation.id) {
    const stmt = database.prepare(`
      UPDATE citations
      SET statute = ?, url = ?, excerpt = ?, source_type = ?, last_updated = ?, confidence = ?
      WHERE id = ? AND rule_id = ?
    `);
    stmt.run(
      citation.statute,
      citation.url,
      citation.excerpt,
      citation.sourceType,
      citation.lastUpdated,
      citation.confidence,
      citation.id,
      ruleId
    );
  } else {
    const stmt = database.prepare(`
      INSERT INTO citations (rule_id, statute, url, excerpt, source_type, last_updated, confidence)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      ruleId,
      citation.statute,
      citation.url,
      citation.excerpt,
      citation.sourceType,
      citation.lastUpdated,
      citation.confidence
    );
  }
}

export async function deleteCitation(citationId: number): Promise<void> {
  const database = getDb();
  const stmt = database.prepare("DELETE FROM citations WHERE id = ?");
  stmt.run(citationId);
}

export async function getCounts(): Promise<{
  jurisdictions: number;
  topics: number;
  rules: number;
  citations: number;
}> {
  const database = getDb();
  const jurisdictions = (
    database.prepare("SELECT COUNT(*) as c FROM jurisdictions").get() as { c: number }
  ).c;
  const topics = (
    database.prepare("SELECT COUNT(*) as c FROM topics").get() as { c: number }
  ).c;
  const rules = (
    database.prepare("SELECT COUNT(*) as c FROM rules").get() as { c: number }
  ).c;
  const citations = (
    database.prepare("SELECT COUNT(*) as c FROM citations").get() as { c: number }
  ).c;
  return { jurisdictions, topics, rules, citations };
}

// ── Review workflow helpers ──

export async function getReview(
  ruleId: number
): Promise<{
  id: number;
  status: string;
  reviewer: string | null;
  reviewedAt: string | null;
  notes: string;
} | null> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT id, status, reviewer, reviewed_at as reviewedAt, notes
    FROM reviews
    WHERE rule_id = ?
  `);
  const row = stmt.get(ruleId) as {
    id: number;
    status: string;
    reviewer: string | null;
    reviewedAt: string | null;
    notes: string;
  } | undefined;
  return row ?? null;
}

export async function upsertReview(
  ruleId: number,
  review: {
    status: string;
    reviewer?: string | null;
    reviewedAt?: string | null;
    notes?: string;
  }
): Promise<void> {
  const database = getDb();
  const existing = database
    .prepare("SELECT id FROM reviews WHERE rule_id = ?")
    .get(ruleId) as { id: number } | undefined;

  if (existing) {
    const stmt = database.prepare(`
      UPDATE reviews
      SET status = ?, reviewer = ?, reviewed_at = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE rule_id = ?
    `);
    stmt.run(
      review.status,
      review.reviewer ?? null,
      review.reviewedAt ?? null,
      review.notes ?? "",
      ruleId
    );
  } else {
    const stmt = database.prepare(`
      INSERT INTO reviews (rule_id, status, reviewer, reviewed_at, notes)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(
      ruleId,
      review.status,
      review.reviewer ?? null,
      review.reviewedAt ?? null,
      review.notes ?? ""
    );
  }
}

export async function listReviewSummary(): Promise<
  {
    ruleId: number;
    topicName: string;
    state: string;
    city: string | null;
    status: string;
    reviewer: string | null;
  }[]
> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT
      r.id as ruleId,
      t.name as topicName,
      j.state,
      j.city,
      COALESCE(rv.status, 'placeholder') as status,
      rv.reviewer
    FROM rules r
    JOIN topics t ON r.topic_id = t.id
    JOIN jurisdictions j ON r.jurisdiction_id = j.id
    LEFT JOIN reviews rv ON rv.rule_id = r.id
    ORDER BY
      CASE rv.status
        WHEN 'placeholder' THEN 1
        WHEN 'draft' THEN 2
        WHEN 'reviewed' THEN 3
        WHEN 'published' THEN 4
        ELSE 5
      END,
      j.state,
      j.city,
      t.name
  `);
  return stmt.all() as {
    ruleId: number;
    topicName: string;
    state: string;
    city: string | null;
    status: string;
    reviewer: string | null;
  }[];
}

// ── Statute change detection helpers ──

export async function getCitationsForDetection(): Promise<
  { citationId: number; ruleId: number; statute: string; url: string }[]
> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT c.id as citationId, c.rule_id as ruleId, c.statute, c.url
    FROM citations c
    WHERE c.url IS NOT NULL AND c.url != ''
    ORDER BY c.id
  `);
  return stmt.all() as { citationId: number; ruleId: number; statute: string; url: string }[];
}

export async function getLatestSnapshot(
  citationId: number
): Promise<{ contentHash: string; contentText: string; fetchedAt: string } | null> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT content_hash as contentHash, content_text as contentText, fetched_at as fetchedAt
    FROM statute_snapshots
    WHERE citation_id = ?
    ORDER BY fetched_at DESC
    LIMIT 1
  `);
  const row = stmt.get(citationId) as
    | { contentHash: string; contentText: string; fetchedAt: string }
    | undefined;
  return row ?? null;
}

export async function insertSnapshot(
  citationId: number,
  contentHash: string,
  contentText: string
): Promise<void> {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO statute_snapshots (citation_id, fetched_at, content_hash, content_text)
    VALUES (?, datetime('now'), ?, ?)
  `);
  stmt.run(citationId, contentHash, contentText);
}

export async function insertAlert(
  citationId: number,
  ruleId: number,
  oldHash: string,
  newHash: string,
  diffText: string
): Promise<void> {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO statute_alerts (citation_id, rule_id, detected_at, old_hash, new_hash, diff_text)
    VALUES (?, ?, datetime('now'), ?, ?, ?)
  `);
  stmt.run(citationId, ruleId, oldHash, newHash, diffText);
}

export async function listActiveAlerts(): Promise<
  {
    id: number;
    citationId: number;
    ruleId: number;
    statute: string;
    url: string;
    state: string;
    city: string | null;
    topicName: string;
    detectedAt: string;
    diffText: string;
  }[]
> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT
      sa.id,
      sa.citation_id as citationId,
      sa.rule_id as ruleId,
      c.statute,
      c.url,
      j.state,
      j.city,
      t.name as topicName,
      sa.detected_at as detectedAt,
      sa.diff_text as diffText
    FROM statute_alerts sa
    JOIN citations c ON sa.citation_id = c.id
    JOIN rules r ON sa.rule_id = r.id
    JOIN jurisdictions j ON r.jurisdiction_id = j.id
    JOIN topics t ON r.topic_id = t.id
    WHERE sa.acknowledged = 0
    ORDER BY sa.detected_at DESC
  `);
  return stmt.all() as {
    id: number;
    citationId: number;
    ruleId: number;
    statute: string;
    url: string;
    state: string;
    city: string | null;
    topicName: string;
    detectedAt: string;
    diffText: string;
  }[];
}

export async function getAlertById(
  alertId: number
): Promise<
  | {
      id: number;
      citationId: number;
      ruleId: number;
      statute: string;
      url: string;
      state: string;
      city: string | null;
      topicName: string;
      detectedAt: string;
      oldHash: string;
      newHash: string;
      diffText: string;
      acknowledged: boolean;
    }
  | null
> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT
      sa.id,
      sa.citation_id as citationId,
      sa.rule_id as ruleId,
      c.statute,
      c.url,
      j.state,
      j.city,
      t.name as topicName,
      sa.detected_at as detectedAt,
      sa.old_hash as oldHash,
      sa.new_hash as newHash,
      sa.diff_text as diffText,
      sa.acknowledged
    FROM statute_alerts sa
    JOIN citations c ON sa.citation_id = c.id
    JOIN rules r ON sa.rule_id = r.id
    JOIN jurisdictions j ON r.jurisdiction_id = j.id
    JOIN topics t ON r.topic_id = t.id
    WHERE sa.id = ?
  `);
  const row = stmt.get(alertId) as
    | {
        id: number;
        citationId: number;
        ruleId: number;
        statute: string;
        url: string;
        state: string;
        city: string | null;
        topicName: string;
        detectedAt: string;
        oldHash: string;
        newHash: string;
        diffText: string;
        acknowledged: number;
      }
    | undefined;
  if (!row) return null;
  return {
    ...row,
    acknowledged: row.acknowledged === 1,
  };
}

export async function getActiveAlertsForRule(ruleId: number): Promise<
  { id: number; citationId: number; detectedAt: string; diffText: string }[]
> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT id, citation_id as citationId, detected_at as detectedAt, diff_text as diffText
    FROM statute_alerts
    WHERE rule_id = ? AND acknowledged = 0
    ORDER BY detected_at DESC
  `);
  return stmt.all(ruleId) as { id: number; citationId: number; detectedAt: string; diffText: string }[];
}

export async function acknowledgeAlert(alertId: number): Promise<void> {
  const database = getDb();
  const stmt = database.prepare(`
    UPDATE statute_alerts
    SET acknowledged = 1, acknowledged_at = datetime('now')
    WHERE id = ?
  `);
  stmt.run(alertId);
}

// ── Research queue helpers ──

export async function addToResearchQueue(
  jurisdictionId: number,
  topicId: number,
  notes?: string
): Promise<void> {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO research_queue (jurisdiction_id, topic_id, status, notes)
    VALUES (?, ?, 'pending', ?)
    ON CONFLICT(jurisdiction_id, topic_id) DO UPDATE SET
      updated_at = CURRENT_TIMESTAMP,
      notes = COALESCE(NULLIF(?, ''), research_queue.notes)
  `);
  stmt.run(jurisdictionId, topicId, notes ?? "", notes ?? "");
}

export async function listResearchQueue(): Promise<
  {
    id: number;
    jurisdiction: { country: string; state: string; city: string | null };
    topic: string;
    status: string;
    assignedTo: string | null;
    notes: string;
  }[]
> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT
      rq.id,
      j.country,
      j.state,
      j.city,
      t.name as topic,
      rq.status,
      rq.assigned_to as assignedTo,
      rq.notes
    FROM research_queue rq
    JOIN jurisdictions j ON rq.jurisdiction_id = j.id
    JOIN topics t ON rq.topic_id = t.id
    ORDER BY
      CASE rq.status
        WHEN 'pending' THEN 1
        WHEN 'in-progress' THEN 2
        WHEN 'complete' THEN 3
        ELSE 4
      END,
      rq.updated_at DESC
  `);
  const rows = stmt.all() as {
    id: number;
    country: string;
    state: string;
    city: string | null;
    topic: string;
    status: string;
    assignedTo: string | null;
    notes: string;
  }[];
  return rows.map((row) => ({
    id: row.id,
    jurisdiction: {
      country: row.country,
      state: row.state,
      city: row.city,
    },
    topic: row.topic,
    status: row.status,
    assignedTo: row.assignedTo,
    notes: row.notes,
  }));
}

export async function updateResearchQueue(
  id: number,
  updates: {
    status?: string;
    assignedTo?: string | null;
    notes?: string;
  }
): Promise<void> {
  const database = getDb();
  const existing = database
    .prepare("SELECT id FROM research_queue WHERE id = ?")
    .get(id) as { id: number } | undefined;

  if (!existing) {
    throw new Error("Research queue item not found");
  }

  const sets: string[] = [];
  const values: (string | null)[] = [];

  if (updates.status !== undefined) {
    sets.push("status = ?");
    values.push(updates.status);
  }
  if (updates.assignedTo !== undefined) {
    sets.push("assigned_to = ?");
    values.push(updates.assignedTo ?? null);
  }
  if (updates.notes !== undefined) {
    sets.push("notes = ?");
    values.push(updates.notes);
  }

  if (sets.length > 0) {
    sets.push("updated_at = CURRENT_TIMESTAMP");
    const stmt = database.prepare(`
      UPDATE research_queue
      SET ${sets.join(", ")}
      WHERE id = ?
    `);
    stmt.run(...values, id);
  }
}

// ── API key and usage helpers ──

export async function createApiKey(
  ownerName: string,
  ownerEmail: string,
  tier: string
): Promise<string> {
  const { generateApiKey } = await import("./api/generateKey");
  const database = getDb();
  const key = generateApiKey();
  const stmt = database.prepare(`
    INSERT INTO api_keys (key, owner_name, owner_email, tier)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(key, ownerName, ownerEmail, tier);
  return key;
}

export async function listApiKeys(): Promise<
  {
    id: number;
    key: string;
    ownerName: string;
    ownerEmail: string;
    tier: string;
    active: boolean;
    lastUsedAt: string | null;
  }[]
> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT id, key, owner_name as ownerName, owner_email as ownerEmail,
           tier, active, last_used_at as lastUsedAt
    FROM api_keys
    ORDER BY created_at DESC
  `);
  const rows = stmt.all() as {
    id: number;
    key: string;
    ownerName: string;
    ownerEmail: string;
    tier: string;
    active: number;
    lastUsedAt: string | null;
  }[];
  return rows.map((row) => ({
    ...row,
    active: row.active === 1,
  }));
}

export async function getApiKey(
  key: string
): Promise<{ id: number; tier: string; active: boolean } | null> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT id, tier, active
    FROM api_keys
    WHERE key = ?
  `);
  const row = stmt.get(key) as
    | { id: number; tier: string; active: number }
    | undefined;
  if (!row) return null;
  return { id: row.id, tier: row.tier, active: row.active === 1 };
}

export async function updateApiKeyStatus(
  id: number,
  active: boolean
): Promise<void> {
  const database = getDb();
  const stmt = database.prepare(`
    UPDATE api_keys
    SET active = ?
    WHERE id = ?
  `);
  stmt.run(active ? 1 : 0, id);
}

export async function regenerateApiKey(id: number): Promise<string> {
  const { generateApiKey } = await import("./api/generateKey");
  const database = getDb();
  const newKey = generateApiKey();
  const stmt = database.prepare(`
    UPDATE api_keys
    SET key = ?, last_used_at = NULL
    WHERE id = ?
  `);
  stmt.run(newKey, id);
  return newKey;
}

export async function logApiUsage(
  apiKeyId: number,
  route: string,
  statusCode: number,
  responseTimeMs: number
): Promise<void> {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO api_usage (api_key_id, route, status_code, response_time_ms)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(apiKeyId, route, statusCode, responseTimeMs);

  // Update last_used_at
  const updateStmt = database.prepare(`
    UPDATE api_keys
    SET last_used_at = datetime('now')
    WHERE id = ?
  `);
  updateStmt.run(apiKeyId);
}

export async function getTierLimits(
  tier: string
): Promise<{
  monthlyQuota: number;
  rateLimitPerMinute: number;
  overagePricePer1000: number;
}> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT monthly_quota as monthlyQuota, rate_limit_per_minute as rateLimitPerMinute, overage_price_per_1000 as overagePricePer1000
    FROM api_tiers
    WHERE name = ?
  `);
  const row = stmt.get(tier) as
    | {
        monthlyQuota: number;
        rateLimitPerMinute: number;
        overagePricePer1000: number;
      }
    | undefined;
  if (!row) {
    throw new Error(`Tier not found: ${tier}`);
  }
  return row;
}

export async function getMonthlyUsage(apiKeyId: number): Promise<number> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT COUNT(*) as c
    FROM api_usage
    WHERE api_key_id = ?
      AND timestamp >= datetime('now', 'start of month')
  `);
  const row = stmt.get(apiKeyId) as { c: number } | undefined;
  return row?.c ?? 0;
}

export async function getRecentUsage(apiKeyId: number, minutes: number): Promise<number> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT COUNT(*) as c
    FROM api_usage
    WHERE api_key_id = ?
      AND timestamp >= datetime('now', '-${minutes} minutes')
  `);
  const row = stmt.get(apiKeyId) as { c: number } | undefined;
  return row?.c ?? 0;
}

export async function listApiUsage(
  filters: {
    apiKeyId?: number;
    route?: string;
    startDate?: string;
    endDate?: string;
  }
): Promise<
  {
    id: number;
    apiKeyId: number;
    route: string;
    timestamp: string;
    statusCode: number;
    responseTimeMs: number;
  }[]
> {
  const database = getDb();
  const conditions: string[] = [];
  const values: (string | number)[] = [];

  if (filters.apiKeyId !== undefined) {
    conditions.push("api_key_id = ?");
    values.push(filters.apiKeyId);
  }
  if (filters.route) {
    conditions.push("route = ?");
    values.push(filters.route);
  }
  if (filters.startDate) {
    conditions.push("timestamp >= ?");
    values.push(filters.startDate);
  }
  if (filters.endDate) {
    conditions.push("timestamp <= ?");
    values.push(filters.endDate);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const stmt = database.prepare(`
    SELECT id, api_key_id as apiKeyId, route, timestamp, status_code as statusCode, response_time_ms as responseTimeMs
    FROM api_usage
    ${whereClause}
    ORDER BY timestamp DESC
    LIMIT 5000
  `);
  return stmt.all(...values) as {
    id: number;
    apiKeyId: number;
    route: string;
    timestamp: string;
    statusCode: number;
    responseTimeMs: number;
  }[];
}

export async function getUsageSummary(): Promise<
  {
    date: string;
    requests: number;
  }[]
> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT date(timestamp) as date, COUNT(*) as requests
    FROM api_usage
    WHERE timestamp >= date('now', '-30 days')
    GROUP BY date(timestamp)
    ORDER BY date ASC
  `);
  return stmt.all() as { date: string; requests: number }[];
}

export async function getRouteDistribution(): Promise<
  {
    route: string;
    requests: number;
  }[]
> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT route, COUNT(*) as requests
    FROM api_usage
    GROUP BY route
    ORDER BY requests DESC
  `);
  return stmt.all() as { route: string; requests: number }[];
}

export async function getStatusDistribution(): Promise<
  {
    statusCode: number;
    requests: number;
  }[]
> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT status_code as statusCode, COUNT(*) as requests
    FROM api_usage
    GROUP BY status_code
    ORDER BY requests DESC
  `);
  return stmt.all() as { statusCode: number; requests: number }[];
}

// ── Import job helpers ──

export async function createImportJob(state: string): Promise<number> {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO import_jobs (state, status)
    VALUES (?, 'pending')
  `);
  const result = stmt.run(state);
  return Number(result.lastInsertRowid);
}

export async function updateImportJob(
  jobId: number,
  updates: { status?: string; errorMessage?: string }
): Promise<void> {
  const database = getDb();
  const sets: string[] = [];
  const values: (string | null)[] = [];

  if (updates.status !== undefined) {
    sets.push("status = ?");
    values.push(updates.status);
  }
  if (updates.errorMessage !== undefined) {
    sets.push("error_message = ?");
    values.push(updates.errorMessage);
  }

  if (sets.length > 0) {
    const stmt = database.prepare(`
      UPDATE import_jobs
      SET ${sets.join(", ")}
      WHERE id = ?
    `);
    stmt.run(...values, jobId);
  }
}

export async function finishImportJob(jobId: number): Promise<void> {
  const database = getDb();
  const stmt = database.prepare(`
    UPDATE import_jobs
    SET status = 'complete', finished_at = datetime('now')
    WHERE id = ?
  `);
  stmt.run(jobId);
}

export async function logImportAction(
  jobId: number,
  statuteUrl: string,
  topic: string | null,
  action: string,
  message: string
): Promise<void> {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO import_logs (job_id, statute_url, topic, action, message)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(jobId, statuteUrl, topic, action, message);
}

export async function listImportJobs(): Promise<
  {
    id: number;
    state: string;
    status: string;
    startedAt: string;
    finishedAt: string | null;
    errorMessage: string | null;
  }[]
> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT id, state, status, started_at as startedAt, finished_at as finishedAt, error_message as errorMessage
    FROM import_jobs
    ORDER BY started_at DESC
  `);
  return stmt.all() as {
    id: number;
    state: string;
    status: string;
    startedAt: string;
    finishedAt: string | null;
    errorMessage: string | null;
  }[];
}

export async function listImportLogs(jobId: number): Promise<
  {
    statuteUrl: string;
    topic: string | null;
    action: string;
    message: string;
    createdAt: string;
  }[]
> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT statute_url as statuteUrl, topic, action, message, created_at as createdAt
    FROM import_logs
    WHERE job_id = ?
    ORDER BY created_at DESC
  `);
  return stmt.all(jobId) as {
    statuteUrl: string;
    topic: string | null;
    action: string;
    message: string;
    createdAt: string;
  }[];
}

// ── Widget analytics helpers ──

export async function logWidgetEvent(event: {
  apiKeyId?: number;
  calculator: string;
  country: "us" | "ca";
  state?: string;
  province?: string;
  city?: string;
  eventType: "view" | "calculate";
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO widget_usage (api_key_id, calculator, country, state, province, city, event_type, metadata)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    event.apiKeyId ?? null,
    event.calculator,
    event.country,
    event.state ?? null,
    event.province ?? null,
    event.city ?? null,
    event.eventType,
    event.metadata ? JSON.stringify(event.metadata) : null
  );
}

export async function getWidgetStats(): Promise<{
  totalViews: number;
  totalCalculations: number;
  topCalculators: { calculator: string; count: number }[];
  topStates: { state: string; count: number }[];
}> {
  const database = getDb();
  const totalViews = (
    database.prepare("SELECT COUNT(*) as c FROM widget_usage WHERE event_type = 'view'").get() as { c: number }
  ).c;
  const totalCalculations = (
    database.prepare("SELECT COUNT(*) as c FROM widget_usage WHERE event_type = 'calculate'").get() as { c: number }
  ).c;
  const topCalculators = database.prepare(`
    SELECT calculator, COUNT(*) as count
    FROM widget_usage
    GROUP BY calculator
    ORDER BY count DESC
    LIMIT 10
  `).all() as { calculator: string; count: number }[];
  const topStates = database.prepare(`
    SELECT state, COUNT(*) as count
    FROM widget_usage
    GROUP BY state
    ORDER BY count DESC
    LIMIT 10
  `).all() as { state: string; count: number }[];
  return { totalViews, totalCalculations, topCalculators, topStates };
}

// ── Document template helpers ──

export interface DocumentTemplate {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  category: string | null;
  templateHtml: string;
  requiredFields: string[];
  autoFields: string[];
  jurisdictionScopes: string[];
  createdAt: string;
  updatedAt: string;
}

export async function listDocumentTemplates(): Promise<DocumentTemplate[]> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT id, slug, name, description, category, template_html as templateHtml,
           required_fields as requiredFields, auto_fields as autoFields,
           jurisdiction_scopes as jurisdictionScopes, created_at as createdAt, updated_at as updatedAt
    FROM document_templates
    ORDER BY name
  `);
  const rows = stmt.all() as {
    id: number;
    slug: string;
    name: string;
    description: string | null;
    category: string | null;
    templateHtml: string;
    requiredFields: string;
    autoFields: string;
    jurisdictionScopes: string;
    createdAt: string;
    updatedAt: string;
  }[];
  return rows.map((r) => ({
    ...r,
    requiredFields: JSON.parse(r.requiredFields),
    autoFields: JSON.parse(r.autoFields),
    jurisdictionScopes: JSON.parse(r.jurisdictionScopes),
  }));
}

export async function getDocumentTemplate(
  slug: string
): Promise<DocumentTemplate | null> {
  const database = getDb();
  const stmt = database.prepare(`
    SELECT id, slug, name, description, category, template_html as templateHtml,
           required_fields as requiredFields, auto_fields as autoFields,
           jurisdiction_scopes as jurisdictionScopes, created_at as createdAt, updated_at as updatedAt
    FROM document_templates
    WHERE slug = ?
  `);
  const row = stmt.get(slug) as {
    id: number;
    slug: string;
    name: string;
    description: string | null;
    category: string | null;
    templateHtml: string;
    requiredFields: string;
    autoFields: string;
    jurisdictionScopes: string;
    createdAt: string;
    updatedAt: string;
  } | undefined;
  if (!row) return null;
  return {
    ...row,
    requiredFields: JSON.parse(row.requiredFields),
    autoFields: JSON.parse(row.autoFields),
    jurisdictionScopes: JSON.parse(row.jurisdictionScopes),
  };
}

export async function createDocumentTemplate(data: {
  slug: string;
  name: string;
  description?: string;
  category?: string;
  templateHtml: string;
  requiredFields?: string[];
  autoFields?: string[];
  jurisdictionScopes?: string[];
}): Promise<number> {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO document_templates (slug, name, description, category, template_html, required_fields, auto_fields, jurisdiction_scopes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    data.slug,
    data.name,
    data.description ?? null,
    data.category ?? null,
    data.templateHtml,
    JSON.stringify(data.requiredFields ?? []),
    JSON.stringify(data.autoFields ?? []),
    JSON.stringify(data.jurisdictionScopes ?? [])
  );
  return Number(result.lastInsertRowid);
}

export async function updateDocumentTemplate(
  id: number,
  data: Partial<{
    name: string;
    description: string;
    category: string;
    templateHtml: string;
    requiredFields: string[];
    autoFields: string[];
    jurisdictionScopes: string[];
  }>
): Promise<void> {
  const database = getDb();
  const sets: string[] = [];
  const values: any[] = [];

  if (data.name !== undefined) { sets.push("name = ?"); values.push(data.name); }
  if (data.description !== undefined) { sets.push("description = ?"); values.push(data.description); }
  if (data.category !== undefined) { sets.push("category = ?"); values.push(data.category); }
  if (data.templateHtml !== undefined) { sets.push("template_html = ?"); values.push(data.templateHtml); }
  if (data.requiredFields !== undefined) { sets.push("required_fields = ?"); values.push(JSON.stringify(data.requiredFields)); }
  if (data.autoFields !== undefined) { sets.push("auto_fields = ?"); values.push(JSON.stringify(data.autoFields)); }
  if (data.jurisdictionScopes !== undefined) { sets.push("jurisdiction_scopes = ?"); values.push(JSON.stringify(data.jurisdictionScopes)); }

  if (sets.length === 0) return;
  sets.push("updated_at = CURRENT_TIMESTAMP");
  values.push(id);

  const stmt = database.prepare(`
    UPDATE document_templates SET ${sets.join(", ")} WHERE id = ?
  `);
  stmt.run(...values);
}

export async function deleteDocumentTemplate(id: number): Promise<void> {
  const database = getDb();
  const stmt = database.prepare("DELETE FROM document_templates WHERE id = ?");
  stmt.run(id);
}

export async function logDocumentGeneration(event: {
  templateId: number;
  apiKeyId?: number;
  jurisdiction: string;
  topic: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO document_logs (template_id, api_key_id, jurisdiction, topic, metadata)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(
    event.templateId,
    event.apiKeyId ?? null,
    event.jurisdiction,
    event.topic,
    event.metadata ? JSON.stringify(event.metadata) : null
  );
}

export async function getDocumentStats(): Promise<{
  totalGenerated: number;
  topTemplates: { name: string; count: number }[];
}> {
  const database = getDb();
  const totalGenerated = (
    database.prepare("SELECT COUNT(*) as c FROM document_logs").get() as { c: number }
  ).c;
  const topTemplates = database.prepare(`
    SELECT dt.name, COUNT(*) as count
    FROM document_logs dl
    JOIN document_templates dt ON dl.template_id = dt.id
    GROUP BY dt.id
    ORDER BY count DESC
    LIMIT 10
  `).all() as { name: string; count: number }[];
  return { totalGenerated, topTemplates };
}
