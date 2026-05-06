import { NextRequest, NextResponse } from "next/server";
import { getRule } from "@/lib/authority/query";
import { getReview } from "@/lib/authority/db";
import { withApiAuth } from "@/lib/authority/api/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { country: string; state: string; slug: string[] } }
) {
  return withApiAuth(request, async (req) => {
    const { country, state, slug } = params;

    if (slug.length !== 1 && slug.length !== 2) {
      return NextResponse.json(
        { success: false, error: "Invalid path. Expected /{topic} or /{city}/{topic}" },
        { status: 404 }
      );
    }

    const topic = slug.length === 1 ? slug[0] : slug[1];
    const city = slug.length === 2 ? slug[0] : undefined;

    try {
      const rule = getRule(state, topic, city);
      if (!rule) {
        return NextResponse.json(
          { success: false, error: "Rule not found" },
          { status: 404 }
        );
      }

      let review = null;
      try {
        const { getDb } = await import("@/lib/authority/db");
        const db = getDb();
        const jurisdiction = db
          .prepare(
            city
              ? "SELECT id FROM jurisdictions WHERE country = ? AND state = ? AND city = ?"
              : "SELECT id FROM jurisdictions WHERE country = ? AND state = ? AND city IS NULL"
          )
          .get(
            country.toLowerCase(),
            state.toLowerCase(),
            ...(city ? [city.toLowerCase()] : [])
          ) as { id: number } | undefined;
        if (jurisdiction) {
          const ruleRow = db
            .prepare(
              "SELECT id FROM rules WHERE jurisdiction_id = ? AND topic_id = (SELECT id FROM topics WHERE name = ?)"
            )
            .get(jurisdiction.id, topic) as { id: number } | undefined;
          if (ruleRow) {
            review = await getReview(ruleRow.id);
          }
        }
      } catch {
        // ignore DB errors for review metadata
      }

      const response = NextResponse.json({
        jurisdiction: city
          ? { country, state, city }
          : { country, state },
        topic,
        rule,
        review: review
          ? {
              status: review.status,
              reviewer: review.reviewer,
              reviewedAt: review.reviewedAt,
            }
          : { status: "placeholder", reviewer: null, reviewedAt: null },
      });

      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set("Access-Control-Allow-Methods", "GET");
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return NextResponse.json(
        { success: false, error: message },
        { status: 500 }
      );
    }
  });
}
