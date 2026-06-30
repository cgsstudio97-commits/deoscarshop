import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminSupabase } from "@/lib/supabase/admin";

async function requireAdmin() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

const VALID_ORDER_STATUSES = ["new", "processing", "shipped", "completed"];
const VALID_PAYMENT_STATUSES = ["pending", "paid", "failed"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { order_status, payment_status } = body as {
    order_status?: string;
    payment_status?: string;
  };

  const updates: Record<string, string> = {};

  if (order_status) {
    if (!VALID_ORDER_STATUSES.includes(order_status)) {
      return NextResponse.json({ error: "Invalid order_status" }, { status: 400 });
    }
    updates.order_status = order_status;
  }

  if (payment_status) {
    if (!VALID_PAYMENT_STATUSES.includes(payment_status)) {
      return NextResponse.json({ error: "Invalid payment_status" }, { status: 400 });
    }
    updates.payment_status = payment_status;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const admin = createAdminSupabase();
  const { data, error } = await admin
    .from("orders")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ order: data });
}
