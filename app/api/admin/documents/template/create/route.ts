import { NextRequest, NextResponse } from "next/server";
import { createDocumentTemplate } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug,
      name,
      description,
      category,
      templateHtml,
      requiredFields,
      autoFields,
      jurisdictionScopes,
    } = body;

    if (!slug || !name || !templateHtml) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: slug, name, templateHtml" },
        { status: 400 }
      );
    }

    const id = await createDocumentTemplate({
      slug,
      name,
      description,
      category,
      templateHtml,
      requiredFields: requiredFields ?? [],
      autoFields: autoFields ?? [],
      jurisdictionScopes: jurisdictionScopes ?? [],
    });

    return NextResponse.json({ success: true, id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
