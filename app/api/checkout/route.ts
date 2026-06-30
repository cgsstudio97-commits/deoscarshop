import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { sendOrderNotificationToOwner } from "@/lib/email";
import { CartItem, OrderRecord } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, total } = body as {
      customer: {
        fullName: string;
        email: string;
        phone: string;
        address: string;
        suburb: string;
        state: string;
        postcode: string;
        country: string;
        notes?: string;
      };
      items: CartItem[];
      total: number;
    };

    if (!customer?.fullName || !customer?.email || !customer?.phone) {
      return NextResponse.json(
        { error: "Missing required customer details." },
        { status: 400 }
      );
    }
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const supabase = createAdminSupabase();

    // 1. Create the order with payment_status = "pending"
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        suburb: customer.suburb,
        state: customer.state,
        postcode: customer.postcode,
        country: customer.country,
        notes: customer.notes || null,
        total_price: total,
        payment_status: "pending",
        order_status: "new",
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("Order insert error:", orderError);
      return NextResponse.json(
        { error: "Could not create order." },
        { status: 500 }
      );
    }

    // 2. Insert order items
    const itemRows = items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.name,
      product_type: item.category,
      length: item.length,
      colour: item.colour,
      quantity: item.quantity,
      unit_price: item.price,
      line_total: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(itemRows);

    if (itemsError) {
      console.error("Order items insert error:", itemsError);
      return NextResponse.json(
        { error: "Could not save order items." },
        { status: 500 }
      );
    }

    // 3. Payment: frontend now calls /api/fiserv/redirect to get signed
    // Connect hosted-checkout fields and redirects the browser there.

    // 4. Notify the store owner that a new order has arrived.
    const orderRecord: OrderRecord = {
      id: order.id,
      created_at: order.created_at,
      customer_name: order.customer_name,
      email: order.email,
      phone: order.phone,
      address: order.address,
      suburb: order.suburb,
      state: order.state,
      postcode: order.postcode,
      country: order.country,
      notes: order.notes,
      items: itemRows.map((r) => ({
        product_id: r.product_id,
        product_name: r.product_name,
        product_type: r.product_type,
        length: r.length,
        colour: r.colour,
        quantity: r.quantity,
        unit_price: r.unit_price,
        line_total: r.line_total,
      })),
      total_price: order.total_price,
      payment_status: order.payment_status,
      order_status: order.order_status,
    };

    await sendOrderNotificationToOwner(orderRecord).catch((e) =>
      console.error("Owner notification failed:", e)
    );

    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
