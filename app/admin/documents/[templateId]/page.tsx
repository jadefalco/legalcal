import Link from "next/link";
import { notFound } from "next/navigation";
import { getDocumentTemplate } from "@/lib/authority/db";
import { AdminShell } from "../../components/AdminShell";
import { TemplateEditor } from "../components/TemplateEditor";

interface TemplateDetailPageProps {
  params: { templateId: string };
}

export default async function TemplateDetailPage({
  params,
}: TemplateDetailPageProps) {
  const templateId = parseInt(params.templateId, 10);
  if (isNaN(templateId)) notFound();

  const template = await getDocumentTemplate(params.templateId);
  if (!template) notFound();

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/admin/documents" className="hover:text-slate-900">Documents</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">{template.name}</span>
        </>
      }
    >
      <TemplateEditor template={template} />
    </AdminShell>
  );
}
