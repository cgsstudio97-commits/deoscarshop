import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/admin";
import crypto from "crypto";

/**
 * POST /api/fiserv/webhook
 *
 * Fiserv (and most gateways) can notify your backend asynchronously
 * when a payment's final status is determined (useful for redirect /
 * hosted-checkout flows, or delayed authorisation results).
 *
 * IMPORTANT: verify the webhook signature before trusting the payload.
 * Adjust `verifySignature` to match the exact header/secret scheme
 * documented for your Fiserv product.
 */
function verifySignature(rawBody: string, signatureHeader: string | null): boolean {
  const secret = process.env.FISERV_API_SECRET;
  if (!secret || !signatureHeader) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("base64");
  return expected === signatureHeader;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("message-signature");

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);

  // Adjust field names to match Fiserv's actual webhook payload shape.
  const orderId: string | undefined = payload?.order?.orderId;
  const approved: boolean = payload?.status === "APPROVED";
  const transactionId: string | undefined = payload?.ipgTransactionId;

  if (!orderId) {
    return NextResponse.json({ error: "Missing order reference." }, { status: 400 });
  }

  const supabase = createAdminSupabase();

  await supabase
    .from("orders")
    .update({
      payment_status: approved ? "paid" : "failed",
      fiserv_transaction_id: transactionId ?? null,
      fiserv_response: payload,
    })
    .eq("id", orderId);

  return NextResponse.json({ received: true });
}
