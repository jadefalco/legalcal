import Link from "next/link";
import { notFound } from "next/navigation";
import { getDocumentTemplate } from "@/lib/authority/db";
import { DocumentGenerator } from "./DocumentGenerator";

interface DocumentPageProps {
  params: { slug: string };
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const template = await getDocumentTemplate(params.slug);
  if (!template) notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <div>
          <Link
            href={params.slug.startsWith("bc-") ? "/calculators/ca/bc" : "/us/calculators"}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            ← Back to Calculators
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mt-4">{template.name}</h1>
          <p className="text-slate-600 mt-2">{template.description}</p>
        </div>

        <DocumentGenerator template={template} />
      </div>
    </main>
  );
}
