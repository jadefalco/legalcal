import { NextRequest, NextResponse } from "next/server";
import { getTemplateInfoFromSlug } from "@/lib/documents/templates";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }

  const templateInfo = await getTemplateInfoFromSlug(slug);
  if (!templateInfo) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }

  return NextResponse.json(templateInfo);
}
