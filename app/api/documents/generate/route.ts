import { NextRequest, NextResponse } from "next/server";
import {
  getDocumentTemplate,
  logDocumentGeneration,
} from "@/lib/authority/db";
import { resolveDocumentVariables } from "@/lib/documents/resolveVariables";
import { renderPdfFromHtml } from "@/lib/documents/renderPdf";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      template: templateSlug,
      jurisdiction,
      topic,
      userInput,
      format = "pdf",
    } = body;

    if (
      typeof templateSlug !== "string" ||
      typeof jurisdiction !== "string" ||
      typeof topic !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Load template
    const template = await getDocumentTemplate(templateSlug);
    if (!template) {
      return NextResponse.json(
        { success: false, error: "Template not found" },
        { status: 404 }
      );
    }

    // Validate jurisdiction scope
    if (
      template.jurisdictionScopes.length > 0 &&
      !template.jurisdictionScopes.includes(jurisdiction)
    ) {
      return NextResponse.json(
        { success: false, error: "Template not available for this jurisdiction" },
        { status: 403 }
      );
    }

    // Resolve variables
    const { html, variablesUsed } = await resolveDocumentVariables({
      templateHtml: template.templateHtml,
      jurisdiction,
      topic,
      userInput: userInput || {},
    });

    // Log generation
    await logDocumentGeneration({
      templateId: template.id,
      jurisdiction,
      topic,
      metadata: { variablesUsed, format },
    });

    if (format === "pdf") {
      const pdf = await renderPdfFromHtml(html);
      return new NextResponse(new Uint8Array(pdf), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${template.slug}.pdf"`,
        },
      });
    }

    // HTML format
    return NextResponse.json({
      success: true,
      html,
      variablesUsed,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
