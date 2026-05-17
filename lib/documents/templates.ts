import { getDocumentTemplate } from "@/lib/authority/db";

export interface DocumentTemplateInfo {
  name: string;
  requiredFields: string[];
  optionalFields: string[];
  jurisdictionApplicability?: string[];
}

export async function getTemplateInfoFromSlug(
  slug: string
): Promise<DocumentTemplateInfo | null> {
  const template = await getDocumentTemplate(slug);
  if (!template) return null;

  const info: DocumentTemplateInfo = {
    name: template.name,
    requiredFields: template.requiredFields,
    optionalFields: template.autoFields,
  };

  if (template.jurisdictionScopes.length > 0) {
    info.jurisdictionApplicability = template.jurisdictionScopes;
  }

  return info;
}
