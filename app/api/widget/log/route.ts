import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logWidgetEvent } from "@/lib/authority/db";

const widgetEventSchema = z
  .object({
    calculator: z.string(),
    country: z.enum(["us", "ca"]),
    state: z.string().optional(),
    province: z.string().optional(),
    city: z.string().optional(),
    eventType: z.enum(["view", "calculate"]),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.country === "us" && !data.state) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "state is required for US",
        path: ["state"],
      });
    }
    if (data.country === "ca" && !data.province) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "province is required for CA",
        path: ["province"],
      });
    }
  });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = widgetEventSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    const { calculator, country, state, province, city, eventType, metadata } = parseResult.data;

    await logWidgetEvent({
      calculator,
      country,
      state,
      province,
      city,
      eventType,
      metadata: metadata || {},
    });

    const response = NextResponse.json({ success: true });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
