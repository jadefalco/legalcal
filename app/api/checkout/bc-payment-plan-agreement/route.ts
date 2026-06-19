import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createSession } from "@/lib/session";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(key, {
    apiVersion: "2026-05-27.dahlia",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const token = createSession(body);

    const origin =
      request.headers.get("origin") ||
      request.nextUrl.origin ||
      "http://localhost:3000";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "BC Payment Plan Agreement",
            },
            unit_amount: 500, // $5.00 CAD
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/bc/payment-plan-agreement/success?token=${token}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bc/payment-plan-agreement`,
      metadata: { token },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
