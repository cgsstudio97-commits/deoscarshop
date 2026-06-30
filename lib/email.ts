/**
 * EMAIL / NOTIFICATION STRUCTURE
 * ============================================================
 * Stubbed so you can plug in any provider (Resend, SendGrid, Postmark...).
 * Recommended: Resend (https://resend.com) — simplest API, good free tier.
 *
 * To activate:
 *   1. npm install resend
 *   2. Add RESEND_API_KEY to your env vars
 *   3. Uncomment the Resend code below
 * ============================================================
 */
import { OrderRecord } from "@/types";

const STORE_OWNER_EMAIL = process.env.STORE_OWNER_EMAIL || "owner@deoscar.com.au";
const FROM_EMAIL = process.env.NOTIFICATIONS_FROM_EMAIL || "orders@deoscar.com.au";

export async function sendOrderConfirmationToCustomer(order: OrderRecord) {
  const subject = `Your Dé.Oscar order #${order.id.slice(0, 8)} is confirmed`;
  const html = renderCustomerEmail(order);
  await sendEmail(order.email, subject, html);
}

export async function sendOrderNotificationToOwner(order: OrderRecord) {
  const subject = `🛍️ New order #${order.id.slice(0, 8)} — $${order.total_price.toFixed(2)}`;
  const html = renderOwnerEmail(order);
  await sendEmail(STORE_OWNER_EMAIL, subject, html);
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[email stub] would send to ${to}: ${subject}`);
    return;
  }

  // --- Uncomment once `resend` package is installed ---
  // const { Resend } = await import("resend");
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from: FROM_EMAIL, to, subject, html });

  console.log(`[email] RESEND_API_KEY set but Resend client not wired in yet. To: ${to}`);
}

function renderCustomerEmail(order: OrderRecord) {
  return `
    <div style="font-family:sans-serif;background:#0a0a0a;color:#f5f0e8;padding:32px">
      <h1 style="color:#c9a96e;font-weight:300">Thank you, ${order.customer_name}</h1>
      <p>Your Dé.Oscar order has been received.</p>
      <p>Order ID: ${order.id}</p>
      <p>Total: $${order.total_price.toFixed(2)} AUD</p>
    </div>
  `;
}

function renderOwnerEmail(order: OrderRecord) {
  return `
    <div style="font-family:sans-serif;padding:32px">
      <h2>New order received</h2>
      <p>${order.customer_name} — ${order.email} — ${order.phone}</p>
      <p>Total: $${order.total_price.toFixed(2)} AUD</p>
      <p>Order ID: ${order.id}</p>
    </div>
  `;
}
