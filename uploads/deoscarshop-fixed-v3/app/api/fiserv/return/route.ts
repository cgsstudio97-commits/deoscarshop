import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { sendOrderConfirmationToCustomer, sendOrderNotificationToOwner } from "@/lib/email";
import { verifyConnectResponse } from "@/lib/fiserv";
import { OrderRecord } from "@/types";

/**
 * Fiserv Connect posts the signed transaction result here
 * (responseSuccessURL / responseFailURL). We verify the signature
 * before trusting anything — never infer payment success from a
 * plain query param, since that would let anyone fake a "paid" order.
 */
export async function GET(req: NextRequest) {
  return handle(req);
}
export async function POST(req: NextRequest) {
  return handle(req);
}

async function handle(req: NextRequest) {
  const origin = req.nextUrl.origin;

  let fields: Record<string, string> = {};
  if (req.method === "POST") {
    const form = await req.formData().catch(() => null);
    if (form) {
      form.forEach((value, key) => (fields[key] = String(value)));
    }
  } else {
    fields = Object.fromEntries(req.nextUrl.searchParams.entries());
  }

  const orderId = fields.oid || fields.checkoutid;

  if (!orderId) {
    return NextResponse.redirect(`${origin}/pagamento-falhou`);
  }

  const signatureValid = verifyConnectResponse(fields);
  // Fiserv's own response code: "approved"/"1" depending on integration;
  // adjust to the exact field your Connect account returns (status / approval_code).
  const gatewayApproved =
    fields.status === "APPROVED" || fields.status === "1" || fields.approval_code === "Y";

  const approved = signatureValid && gatewayApproved;

  const supabase = createAdminSupabase();
  const { data: order } = await supabase
    .from("orders")
    .update({
      payment_status: approved ? "paid" : "failed",
      fiserv_transaction_id: fields.ipgTransactionId || fields.transactionid || null,
      fiserv_response: fields,
    })
    .eq("id", orderId)
    .select("*, order_items(*)")
    .single();

  if (approved && order) {
    const { order_items, ...orderFields } = order;
    const items = (order_items || []).map((r: Record<string, unknown>) => ({
      product_id: r.product_id,
      product_name: r.product_name,
      product_type: r.product_type,
      length: r.length,
      colour: r.colour,
      quantity: r.quantity,
      unit_price: r.unit_price,
      line_total: r.line_total,
    }));
    sendOrderConfirmationToCustomer({ ...orderFields, items } as OrderRecord).catch((e) =>
      console.error("Customer email failed:", e)
    );
    sendOrderNotificationToOwner({ ...orderFields, items } as OrderRecord).catch((e) =>
      console.error("Owner email failed:", e)
    );
    return NextResponse.redirect(`${origin}/sucesso?orderId=${orderId}`);
  }

  return NextResponse.redirect(`${origin}/pagamento-falhou?orderId=${orderId}`);
}
