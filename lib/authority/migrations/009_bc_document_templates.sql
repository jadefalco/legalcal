-- BC Document Templates
-- Production-grade document templates for British Columbia

INSERT INTO document_templates (slug, name, description, category, template_html, required_fields, auto_fields, jurisdiction_scopes)
VALUES (
  'bc-notice-to-enter',
  'BC Notice to Enter',
  'Landlord notice to enter a rental unit in British Columbia.',
  'notice',
  '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Notice to Enter Rental Unit — British Columbia</title>
  <style>
    .document-container { max-width: 800px; margin: 0 auto; padding: 40px; font-family: Georgia, "Times New Roman", serif; line-height: 1.6; color: #1a1a1a; background: #fff; }
    .document-header { text-align: center; border-bottom: 2px solid #1a1a1a; padding-bottom: 20px; margin-bottom: 30px; }
    .document-header h1 { font-size: 22px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px; }
    .document-header .subtitle { font-size: 15px; color: #555; }
    .document-date { text-align: right; margin-bottom: 30px; font-size: 14px; }
    .party-block { margin-bottom: 20px; }
    .party-block .label { font-weight: bold; text-transform: uppercase; font-size: 12px; color: #555; letter-spacing: 0.5px; }
    .party-block .value { font-size: 15px; margin-top: 4px; }
    .document-body { margin: 30px 0; }
    .document-body p { margin-bottom: 16px; text-align: justify; }
    .notice-box { background: #f8f9fa; border-left: 4px solid #1a1a1a; padding: 16px 20px; margin: 24px 0; }
    .notice-box strong { display: block; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .signature-block { margin-top: 40px; }
    .signature-line { margin-top: 30px; border-top: 1px solid #1a1a1a; width: 300px; padding-top: 8px; font-size: 14px; }
    .disclaimer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; line-height: 1.5; }
    @media print { .document-container { padding: 0; } }
  </style>
</head>
<body>
  <div class="document-container">
    <div class="document-header">
      <h1>Notice to Enter Rental Unit</h1>
      <div class="subtitle">British Columbia — Residential Tenancy Act, SBC 2002, c 78, s 29</div>
    </div>

    <div class="document-date"><strong>Date:</strong> {{today}}</div>

    <div class="party-block">
      <div class="label">To (Tenant)</div>
      <div class="value">{{tenant_name}}</div>
    </div>

    <div class="party-block">
      <div class="label">Rental Address</div>
      <div class="value">{{rental_address}}{{#if unit_number}}, Unit {{unit_number}}{{/if}}</div>
    </div>

    <div class="party-block">
      <div class="label">From (Landlord / Property Manager)</div>
      <div class="value">{{landlord_name}}</div>
    </div>

    <div class="document-body">
      <p>This notice is provided under the <em>Residential Tenancy Act</em> (SBC 2002, c 78). The landlord intends to enter the rental unit for the following purpose: <strong>{{entry_purpose}}</strong>.</p>
      <p>Date of entry: <strong>{{entry_date}}</strong></p>
      <p>Time of entry: <strong>{{entry_time}}</strong></p>
    </div>

    <div class="notice-box">
      <strong>Notice Requirements</strong>
      <div>This notice is given at least <strong>{{rule.data.noticeHours}} hours</strong> before the proposed entry.</div>
      <div style="margin-top:8px;">Entry must be between <strong>8:00 a.m. and 9:00 p.m.</strong> unless the tenant agrees otherwise.</div>
      <div style="margin-top:8px;">In case of emergency, advance notice is not required.</div>
    </div>

    <div class="signature-block">
      <p>Sincerely,</p>
      <div class="signature-line">{{landlord_name}}</div>
      <p style="font-size:14px;margin-top:8px;"><strong>Contact:</strong> {{landlord_contact}}</p>
    </div>

    <div class="disclaimer">
      <strong>Disclaimer:</strong> This document is generated for informational purposes only and does not constitute legal advice. Verify compliance with current Residential Tenancy Branch (RTB) requirements before serving any notice. Failure to comply with statutory notice requirements may affect your rights.
    </div>
  </div>
</body>
</html>',
  '["tenant_name","rental_address","unit_number","entry_purpose","entry_date","entry_time","landlord_name","landlord_contact"]',
  '["today","rule.data.noticeHours"]',
  '["ca-bc"]'
)
ON CONFLICT(slug) DO UPDATE SET
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  template_html = excluded.template_html,
  required_fields = excluded.required_fields,
  auto_fields = excluded.auto_fields,
  jurisdiction_scopes = excluded.jurisdiction_scopes,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO document_templates (slug, name, description, category, template_html, required_fields, auto_fields, jurisdiction_scopes)
VALUES (
  'bc-rent-increase-notice',
  'BC Rent Increase Notice',
  'Notice of rent increase for a BC tenancy.',
  'notice',
  '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Notice of Rent Increase — British Columbia</title>
  <style>
    .document-container { max-width: 800px; margin: 0 auto; padding: 40px; font-family: Georgia, "Times New Roman", serif; line-height: 1.6; color: #1a1a1a; background: #fff; }
    .document-header { text-align: center; border-bottom: 2px solid #1a1a1a; padding-bottom: 20px; margin-bottom: 30px; }
    .document-header h1 { font-size: 22px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px; }
    .document-header .subtitle { font-size: 15px; color: #555; }
    .document-date { text-align: right; margin-bottom: 30px; font-size: 14px; }
    .party-block { margin-bottom: 20px; }
    .party-block .label { font-weight: bold; text-transform: uppercase; font-size: 12px; color: #555; letter-spacing: 0.5px; }
    .party-block .value { font-size: 15px; margin-top: 4px; }
    .document-body { margin: 30px 0; }
    .document-body p { margin-bottom: 16px; text-align: justify; }
    .deadline-box { background: #f8f9fa; border-left: 4px solid #1a1a1a; padding: 16px 20px; margin: 24px 0; }
    .deadline-box strong { display: block; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .signature-block { margin-top: 40px; }
    .signature-line { margin-top: 30px; border-top: 1px solid #1a1a1a; width: 300px; padding-top: 8px; font-size: 14px; }
    .disclaimer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; line-height: 1.5; }
    @media print { .document-container { padding: 0; } }
  </style>
</head>
<body>
  <div class="document-container">
    <div class="document-header">
      <h1>Notice of Rent Increase</h1>
      <div class="subtitle">British Columbia — Residential Tenancy Act, SBC 2002, c 78, s 42</div>
    </div>

    <div class="document-date"><strong>Date of Notice:</strong> {{today}}</div>

    <div class="party-block">
      <div class="label">To (Tenant)</div>
      <div class="value">{{tenant_name}}</div>
    </div>

    <div class="party-block">
      <div class="label">Rental Address</div>
      <div class="value">{{rental_address}}</div>
    </div>

    <div class="party-block">
      <div class="label">From (Landlord)</div>
      <div class="value">{{landlord_name}}</div>
    </div>

    <div class="document-body">
      <p><strong>RE: Notice of Rent Increase</strong></p>
      <p>Please be advised that the monthly rent for the above rental unit will be increased as follows:</p>
      <ul>
        <li>Current rent: <strong>${{current_rent}}</strong></li>
        <li>New rent: <strong>${{new_rent}}</strong></li>
        <li>Increase amount: <strong>${{increase_amount}}</strong> ({{increase_percent}}%)</li>
        <li>Effective date: <strong>{{effective_date}}</strong></li>
      </ul>
      <p>This increase complies with the current annual rent increase limit of <strong>{{rule.data.rentIncreaseLimit}}%</strong> set by the BC government.</p>
    </div>

    <div class="deadline-box">
      <strong>Notice Requirements</strong>
      <div>Notice period: <strong>{{rule.data.noticePeriodDays}} days</strong> (3 full calendar months) minimum</div>
      <div style="margin-top:8px;">Date notice served: <strong>{{notice_date}}</strong></div>
      <div style="margin-top:8px;">Frequency limit: No more than one increase per 12-month period.</div>
    </div>

    <div class="signature-block">
      <p>Sincerely,</p>
      <div class="signature-line">{{landlord_name}}</div>
      <p style="font-size:14px;margin-top:8px;"><strong>Contact:</strong> {{landlord_contact}}</p>
    </div>

    <div class="disclaimer">
      <strong>Disclaimer:</strong> This document is generated for informational purposes only and does not constitute legal advice. Landlords must use the official Residential Tenancy Branch (RTB) notice form where required. Some properties are exempt from rent increase caps. Verify current rules with the RTB before serving any notice.
    </div>
  </div>
</body>
</html>',
  '["tenant_name","rental_address","current_rent","new_rent","increase_amount","increase_percent","effective_date","notice_date","landlord_name","landlord_contact"]',
  '["today","rule.data.rentIncreaseLimit","rule.data.noticePeriodDays"]',
  '["ca-bc"]'
)
ON CONFLICT(slug) DO UPDATE SET
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  template_html = excluded.template_html,
  required_fields = excluded.required_fields,
  auto_fields = excluded.auto_fields,
  jurisdiction_scopes = excluded.jurisdiction_scopes,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO document_templates (slug, name, description, category, template_html, required_fields, auto_fields, jurisdiction_scopes)
VALUES (
  'bc-condition-inspection-report',
  'BC Condition Inspection Report',
  'Condition inspection report for a BC tenancy.',
  'inspection',
  '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Condition Inspection Report — British Columbia</title>
  <style>
    .document-container { max-width: 800px; margin: 0 auto; padding: 40px; font-family: Georgia, "Times New Roman", serif; line-height: 1.6; color: #1a1a1a; background: #fff; }
    .document-header { text-align: center; border-bottom: 2px solid #1a1a1a; padding-bottom: 20px; margin-bottom: 30px; }
    .document-header h1 { font-size: 22px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px; }
    .document-header .subtitle { font-size: 15px; color: #555; }
    .document-date { text-align: right; margin-bottom: 30px; font-size: 14px; }
    .party-block { margin-bottom: 20px; }
    .party-block .label { font-weight: bold; text-transform: uppercase; font-size: 12px; color: #555; letter-spacing: 0.5px; }
    .party-block .value { font-size: 15px; margin-top: 4px; }
    .document-body { margin: 30px 0; }
    .document-body p { margin-bottom: 16px; text-align: justify; }
    .section-title { font-size: 16px; font-weight: bold; margin: 24px 0 12px 0; border-bottom: 1px solid #ddd; padding-bottom: 6px; }
    .signature-block { margin-top: 40px; }
    .signature-line { margin-top: 30px; border-top: 1px solid #1a1a1a; width: 300px; padding-top: 8px; font-size: 14px; }
    .disclaimer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; line-height: 1.5; }
    @media print { .document-container { padding: 0; } }
  </style>
</head>
<body>
  <div class="document-container">
    <div class="document-header">
      <h1>Condition Inspection Report</h1>
      <div class="subtitle">British Columbia — Residential Tenancy Act, SBC 2002, c 78, s 17</div>
    </div>

    <div class="document-date"><strong>Date:</strong> {{today}}</div>

    <div class="party-block">
      <div class="label">Rental Address</div>
      <div class="value">{{rental_address}}{{#if unit_number}}, Unit {{unit_number}}{{/if}}</div>
    </div>

    <div class="party-block">
      <div class="label">Tenant</div>
      <div class="value">{{tenant_name}}</div>
    </div>

    <div class="party-block">
      <div class="label">Landlord</div>
      <div class="value">{{landlord_name}}</div>
    </div>

    <div class="party-block">
      <div class="label">Inspection Type</div>
      <div class="value">{{inspection_type}}</div>
    </div>

    <div class="document-body">
      <div class="section-title">General Condition</div>
      <p>{{general_condition}}</p>

      <div class="section-title">Issues / Damage Noted</div>
      <p>{{issues_noted}}</p>
    </div>

    <div class="document-body">
      <p><strong>Report deadline:</strong> The inspection report must be completed within <strong>{{rule.data.reportDeadlineDays}} days</strong> of the inspection date where applicable.</p>
      <p>Both the landlord and tenant have the right to attend the inspection. Both parties should sign this report and each should keep a copy.</p>
    </div>

    <div class="signature-block">
      <p>Tenant signature:</p>
      <div class="signature-line">{{tenant_name}}</div>
      <p style="font-size:14px;margin-top:8px;">Date: ___________________</p>
    </div>

    <div class="signature-block">
      <p>Landlord signature:</p>
      <div class="signature-line">{{landlord_name}}</div>
      <p style="font-size:14px;margin-top:8px;">Date: ___________________</p>
    </div>

    <div class="disclaimer">
      <strong>Disclaimer:</strong> This document is generated for informational purposes only and does not constitute legal advice. Verify compliance with current Residential Tenancy Branch (RTB) requirements. The inspection report should accurately reflect the condition of the rental unit at the time of inspection.
    </div>
  </div>
</body>
</html>',
  '["rental_address","unit_number","tenant_name","landlord_name","inspection_type","general_condition","issues_noted"]',
  '["today","rule.data.reportDeadlineDays"]',
  '["ca-bc"]'
)
ON CONFLICT(slug) DO UPDATE SET
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  template_html = excluded.template_html,
  required_fields = excluded.required_fields,
  auto_fields = excluded.auto_fields,
  jurisdiction_scopes = excluded.jurisdiction_scopes,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO document_templates (slug, name, description, category, template_html, required_fields, auto_fields, jurisdiction_scopes)
VALUES (
  'bc-deposit-return-letter',
  'BC Deposit Return Letter',
  'Letter accompanying return of a security deposit in BC.',
  'letter',
  '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Security Deposit Return — British Columbia</title>
  <style>
    .document-container { max-width: 800px; margin: 0 auto; padding: 40px; font-family: Georgia, "Times New Roman", serif; line-height: 1.6; color: #1a1a1a; background: #fff; }
    .document-header { text-align: center; border-bottom: 2px solid #1a1a1a; padding-bottom: 20px; margin-bottom: 30px; }
    .document-header h1 { font-size: 22px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px; }
    .document-header .subtitle { font-size: 15px; color: #555; }
    .document-date { text-align: right; margin-bottom: 30px; font-size: 14px; }
    .party-block { margin-bottom: 20px; }
    .party-block .label { font-weight: bold; text-transform: uppercase; font-size: 12px; color: #555; letter-spacing: 0.5px; }
    .party-block .value { font-size: 15px; margin-top: 4px; }
    .document-body { margin: 30px 0; }
    .document-body p { margin-bottom: 16px; text-align: justify; }
    .deadline-box { background: #f8f9fa; border-left: 4px solid #1a1a1a; padding: 16px 20px; margin: 24px 0; }
    .deadline-box strong { display: block; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .signature-block { margin-top: 40px; }
    .signature-line { margin-top: 30px; border-top: 1px solid #1a1a1a; width: 300px; padding-top: 8px; font-size: 14px; }
    .disclaimer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; line-height: 1.5; }
    @media print { .document-container { padding: 0; } }
  </style>
</head>
<body>
  <div class="document-container">
    <div class="document-header">
      <h1>Security Deposit Return</h1>
      <div class="subtitle">British Columbia — Residential Tenancy Act, SBC 2002, c 78, s 38</div>
    </div>

    <div class="document-date"><strong>Date:</strong> {{today}}</div>

    <div class="party-block">
      <div class="label">To (Tenant)</div>
      <div class="value">{{tenant_name}}</div>
    </div>

    <div class="party-block">
      <div class="label">Rental Address</div>
      <div class="value">{{rental_address}}</div>
    </div>

    <div class="document-body">
      <p>Dear {{tenant_name}},</p>
      <p>Your security deposit is being returned as follows:</p>
      <ul>
        <li>Total deposit: <strong>${{deposit_amount}}</strong></li>
        <li>Deductions: <strong>${{deductions}}</strong></li>
        <li>Amount returned: <strong>${{amount_returned}}</strong></li>
      </ul>

      <p><strong>Deductions Breakdown</strong></p>
      <p>{{deductions_breakdown}}</p>
    </div>

    <div class="deadline-box">
      <strong>Return Requirements</strong>
      <div>This return is made within the required <strong>{{rule.data.returnDeadlineDays}}-day</strong> period after the tenant vacates the rental unit.</div>
      <div style="margin-top:8px;">An itemized statement of deductions is required if any amount is withheld.</div>
    </div>

    <div class="signature-block">
      <p>Sincerely,</p>
      <div class="signature-line">{{landlord_name}}</div>
      <p style="font-size:14px;margin-top:8px;"><strong>Contact:</strong> {{landlord_contact}}</p>
    </div>

    <div class="disclaimer">
      <strong>Disclaimer:</strong> This document is generated for informational purposes only and does not constitute legal advice. Verify compliance with current Residential Tenancy Branch (RTB) requirements. Tenants may apply for dispute resolution through the RTB if they believe deductions are improper.
    </div>
  </div>
</body>
</html>',
  '["tenant_name","rental_address","deposit_amount","deductions","amount_returned","deductions_breakdown","landlord_name","landlord_contact"]',
  '["today","rule.data.returnDeadlineDays"]',
  '["ca-bc"]'
)
ON CONFLICT(slug) DO UPDATE SET
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  template_html = excluded.template_html,
  required_fields = excluded.required_fields,
  auto_fields = excluded.auto_fields,
  jurisdiction_scopes = excluded.jurisdiction_scopes,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO document_templates (slug, name, description, category, template_html, required_fields, auto_fields, jurisdiction_scopes)
VALUES (
  'bc-repair-request-letter',
  'BC Repair Request Letter',
  'Tenant letter requesting repairs in BC.',
  'letter',
  '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Repair Request — British Columbia</title>
  <style>
    .document-container { max-width: 800px; margin: 0 auto; padding: 40px; font-family: Georgia, "Times New Roman", serif; line-height: 1.6; color: #1a1a1a; background: #fff; }
    .document-header { text-align: center; border-bottom: 2px solid #1a1a1a; padding-bottom: 20px; margin-bottom: 30px; }
    .document-header h1 { font-size: 22px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px; }
    .document-header .subtitle { font-size: 15px; color: #555; }
    .document-date { text-align: right; margin-bottom: 30px; font-size: 14px; }
    .party-block { margin-bottom: 20px; }
    .party-block .label { font-weight: bold; text-transform: uppercase; font-size: 12px; color: #555; letter-spacing: 0.5px; }
    .party-block .value { font-size: 15px; margin-top: 4px; }
    .document-body { margin: 30px 0; }
    .document-body p { margin-bottom: 16px; text-align: justify; }
    .notice-box { background: #f8f9fa; border-left: 4px solid #1a1a1a; padding: 16px 20px; margin: 24px 0; }
    .notice-box strong { display: block; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .signature-block { margin-top: 40px; }
    .signature-line { margin-top: 30px; border-top: 1px solid #1a1a1a; width: 300px; padding-top: 8px; font-size: 14px; }
    .disclaimer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; line-height: 1.5; }
    @media print { .document-container { padding: 0; } }
  </style>
</head>
<body>
  <div class="document-container">
    <div class="document-header">
      <h1>Repair Request</h1>
      <div class="subtitle">British Columbia — Residential Tenancy Act, SBC 2002, c 78, s 32</div>
    </div>

    <div class="document-date"><strong>Date:</strong> {{today}}</div>

    <div class="party-block">
      <div class="label">To (Landlord / Property Manager)</div>
      <div class="value">{{landlord_name}}</div>
    </div>

    <div class="party-block">
      <div class="label">Rental Address</div>
      <div class="value">{{rental_address}}</div>
    </div>

    <div class="party-block">
      <div class="label">From (Tenant)</div>
      <div class="value">{{tenant_name}}</div>
    </div>

    <div class="document-body">
      <p>Dear {{landlord_name}},</p>
      <p>I am writing to request repairs to the following issue(s) at the rental unit:</p>
      <p><strong>{{repair_issue}}</strong></p>
      <p>This issue was first noticed on <strong>{{issue_date}}</strong>. It is classified as <strong>{{urgency}}</strong>.</p>
      <p>Under the <em>Residential Tenancy Act</em> (SBC 2002, c 78, s 32), the landlord is required to maintain the rental unit in a reasonable state of repair. Please arrange for the necessary repairs within a reasonable time.</p>
    </div>

    <div class="notice-box">
      <strong>Repair Timeline Expectations</strong>
      <div>Urgent repairs (e.g., major leaks, heating failure, electrical hazards): typically <strong>{{rule.data.repairUrgentTimelineHours}} hours</strong></div>
      <div style="margin-top:8px;">Non-urgent repairs: typically <strong>{{rule.data.repairNonUrgentTimelineDays}} days</strong></div>
    </div>

    <div class="signature-block">
      <p>Sincerely,</p>
      <div class="signature-line">{{tenant_name}}</div>
      <p style="font-size:14px;margin-top:8px;"><strong>Contact:</strong> {{tenant_contact}}</p>
    </div>

    <div class="disclaimer">
      <strong>Disclaimer:</strong> This document is generated for informational purposes only and does not constitute legal advice. Keep a copy of this request for your records. If the landlord fails to make necessary repairs, tenants may contact the Residential Tenancy Branch (RTB) for dispute resolution.
    </div>
  </div>
</body>
</html>',
  '["landlord_name","rental_address","repair_issue","issue_date","urgency","tenant_name","tenant_contact"]',
  '["today","rule.data.repairUrgentTimelineHours","rule.data.repairNonUrgentTimelineDays"]',
  '["ca-bc"]'
)
ON CONFLICT(slug) DO UPDATE SET
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  template_html = excluded.template_html,
  required_fields = excluded.required_fields,
  auto_fields = excluded.auto_fields,
  jurisdiction_scopes = excluded.jurisdiction_scopes,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO document_templates (slug, name, description, category, template_html, required_fields, auto_fields, jurisdiction_scopes)
VALUES (
  'bc-notice-to-end-tenancy',
  'BC Notice to End Tenancy',
  'Notice to end a tenancy in British Columbia.',
  'notice',
  '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Notice to End Tenancy — British Columbia</title>
  <style>
    .document-container { max-width: 800px; margin: 0 auto; padding: 40px; font-family: Georgia, "Times New Roman", serif; line-height: 1.6; color: #1a1a1a; background: #fff; }
    .document-header { text-align: center; border-bottom: 2px solid #1a1a1a; padding-bottom: 20px; margin-bottom: 30px; }
    .document-header h1 { font-size: 22px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px; }
    .document-header .subtitle { font-size: 15px; color: #555; }
    .document-date { text-align: right; margin-bottom: 30px; font-size: 14px; }
    .party-block { margin-bottom: 20px; }
    .party-block .label { font-weight: bold; text-transform: uppercase; font-size: 12px; color: #555; letter-spacing: 0.5px; }
    .party-block .value { font-size: 15px; margin-top: 4px; }
    .document-body { margin: 30px 0; }
    .document-body p { margin-bottom: 16px; text-align: justify; }
    .deadline-box { background: #f8f9fa; border-left: 4px solid #1a1a1a; padding: 16px 20px; margin: 24px 0; }
    .deadline-box strong { display: block; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .signature-block { margin-top: 40px; }
    .signature-line { margin-top: 30px; border-top: 1px solid #1a1a1a; width: 300px; padding-top: 8px; font-size: 14px; }
    .disclaimer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; line-height: 1.5; }
    .warning-box { background: #fff8e1; border-left: 4px solid #f9a825; padding: 16px 20px; margin: 24px 0; }
    .warning-box strong { display: block; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #f57f17; }
    @media print { .document-container { padding: 0; } }
  </style>
</head>
<body>
  <div class="document-container">
    <div class="document-header">
      <h1>Notice to End Tenancy</h1>
      <div class="subtitle">British Columbia — Residential Tenancy Act, SBC 2002, c 78</div>
    </div>

    <div class="document-date"><strong>Date:</strong> {{today}}</div>

    <div class="party-block">
      <div class="label">To</div>
      <div class="value">{{recipient_name}} ({{recipient_role}})</div>
    </div>

    <div class="party-block">
      <div class="label">Rental Address</div>
      <div class="value">{{rental_address}}</div>
    </div>

    <div class="party-block">
      <div class="label">From</div>
      <div class="value">{{sender_name}} ({{sender_role}})</div>
    </div>

    <div class="document-body">
      <p>This notice is provided under the <em>Residential Tenancy Act</em> (SBC 2002, c 78).</p>
      <p>The tenancy for the above rental unit will end on <strong>{{end_date}}</strong>.</p>
      <p>Reason / basis: <strong>{{end_reason}}</strong></p>
    </div>

    <div class="deadline-box">
      <strong>Notice Period</strong>
      <div>This notice is given at least <strong>{{rule.data.tenantNoticePeriodDays}} days</strong> before the proposed end date.</div>
      <div style="margin-top:8px;">Tenant notice for month-to-month: one full rental month minimum.</div>
      <div style="margin-top:8px;">Landlord notice varies by reason (e.g., 2 months for landlord use, 4 months for renovation).</div>
    </div>

    <div class="warning-box">
      <strong>Important</strong>
      <div>The Residential Tenancy Branch (RTB) requires specific notice forms for many types of tenancy endings. Use the official RTB form and follow proper service requirements.</div>
    </div>

    <div class="signature-block">
      <p>Sincerely,</p>
      <div class="signature-line">{{sender_name}}</div>
      <p style="font-size:14px;margin-top:8px;"><strong>Contact:</strong> {{sender_contact}}</p>
    </div>

    <div class="disclaimer">
      <strong>Disclaimer:</strong> This document is generated for informational purposes only and does not constitute legal advice. Landlord-tenant laws vary by situation and change frequently. You should consult with a licensed attorney or the Residential Tenancy Branch (RTB) before serving any notice to end tenancy. Failure to comply with statutory notice requirements may result in dismissal of a dispute resolution claim or court action.
    </div>
  </div>
</body>
</html>',
  '["recipient_name","recipient_role","rental_address","end_date","end_reason","sender_name","sender_contact","sender_role"]',
  '["today","rule.data.tenantNoticePeriodDays","rule.data.landlordNoticePeriodDays"]',
  '["ca-bc"]'
)
ON CONFLICT(slug) DO UPDATE SET
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  template_html = excluded.template_html,
  required_fields = excluded.required_fields,
  auto_fields = excluded.auto_fields,
  jurisdiction_scopes = excluded.jurisdiction_scopes,
  updated_at = CURRENT_TIMESTAMP;
