import { NextRequest, NextResponse } from "next/server";
import { updateDocumentTemplate } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      description,
      category,
      templateHtml,
      requiredFields,
      autoFields,
      jurisdictionScopes,
    } = body;

    if (typeof id !== "number") {
      return NextResponse.json(
        { success: false, error: "Missing template id" },
        { status: 400 }
      );
    }

    await updateDocumentTemplate(id, {
      name,
      description,
      category,
      templateHtml,
      requiredFields,
      autoFields,
      jurisdictionScopes,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
