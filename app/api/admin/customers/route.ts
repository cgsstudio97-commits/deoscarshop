import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminSupabase } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabase();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const search = req.nextUrl.searchParams.get("search")?.trim() || "";

  const admin = createAdminSupabase();
  let query = admin
    .from("orders")
    .select("customer_name, email, phone, total_price, payment_status, created_at");

  if (search) {
    query = query.or(
      `customer_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
    );
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const byEmail = new Map<
    string,
    {
      name: string;
      email: string;
      phone: string;
      orders_count: number;
      total_spent: number;
      last_order_at: string;
    }
  >();

  for (const row of data) {
    const existing = byEmail.get(row.email);
    const spent = row.payment_status === "paid" ? Number(row.total_price) : 0;
    if (existing) {
      existing.orders_count += 1;
      existing.total_spent += spent;
      if (row.created_at > existing.last_order_at) {
        existing.last_order_at = row.created_at;
        existing.name = row.customer_name;
        existing.phone = row.phone;
      }
    } else {
      byEmail.set(row.email, {
        name: row.customer_name,
        email: row.email,
        phone: row.phone,
        orders_count: 1,
        total_spent: spent,
        last_order_at: row.created_at,
      });
    }
  }

  const customers = Array.from(byEmail.values()).sort(
    (a, b) => new Date(b.last_order_at).getTime() - new Date(a.last_order_at).getTime()
  );

  return NextResponse.json({ customers });
}
