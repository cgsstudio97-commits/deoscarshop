import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { buildConnectRedirectFields } from "@/lib/fiserv";

export async function POST(req: NextRequest) {
  const { orderId } = await req.json();
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  const supabase = createAdminSupabase();
  const { data: order, error } = await supabase
    .from("orders")
    .select("id, total_price")
    .eq("id", orderId)
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const origin = req.headers.get("origin") || req.nextUrl.origin;

  const { action, fields } = buildConnectRedirectFields({
    orderId: order.id,
    amount: order.total_price,
    successUrl: `${origin}/api/fiserv/return?orderId=${order.id}&result=success`,
    failUrl: `${origin}/api/fiserv/return?orderId=${order.id}&result=fail`,
  });

  return NextResponse.json({ action, fields });
}
