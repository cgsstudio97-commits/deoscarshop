import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminSupabase } from "@/lib/supabase/admin";

const ALLOWED_PAYMENT = ["pending", "paid", "failed"];
const ALLOWED_ORDER = ["new", "processing", "shipped", "completed"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createServerSupabase();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const update: Record<string, string> = {};

  if (body.payment_status && ALLOWED_PAYMENT.includes(body.payment_status)) {
    update.payment_status = body.payment_status;
  }
  if (body.order_status && ALLOWED_ORDER.includes(body.order_status)) {
    update.order_status = body.order_status;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
  }

  const admin = createAdminSupabase();
  const { data, error } = await admin
    .from("orders")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ order: data });
}
