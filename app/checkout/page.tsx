"use client";

import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";

const AU_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    suburb: "",
    state: AU_STATES[0],
    postcode: "",
    country: "Australia",
    notes: "",
  });

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate(): string | null {
    if (!form.fullName.trim()) return "Full name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter a valid email address.";
    if (!/^[0-9+()\-\s]{6,}$/.test(form.phone)) return "Enter a valid phone number.";
    if (!form.address.trim()) return "Shipping address is required.";
    if (!form.suburb.trim()) return "Suburb/city is required.";
    if (!/^[0-9]{4}$/.test(form.postcode)) return "Postcode must be 4 digits.";
    if (!form.country.trim()) return "Country is required.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items,
          total,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong creating your order.");
      }

      // Order saved with payment_status = pending.
      // Fetch signed Fiserv Connect fields and redirect to hosted checkout.
      const redirectRes = await fetch("/api/fiserv/redirect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: data.orderId }),
      });
      const redirectData = await redirectRes.json();

      if (!redirectRes.ok) {
        throw new Error(redirectData.error || "Could not start payment.");
      }

      clearCart();
      submitToFiserv(redirectData.action, redirectData.fields);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
      setLoading(false);
    }
  }

  function submitToFiserv(action: string, fields: Record<string, string>) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = action;
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  }

  if (items.length === 0) {
    return (
      <div className="px-[8vw] py-28 text-center">
        <h1 className="section-title text-3xl mb-4">Your Cart is Empty</h1>
        <Link href="/produtos" className="btn-primary">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="px-[6vw] md:px-[8vw] py-16 max-w-5xl mx-auto grid md:grid-cols-[1.3fr_1fr] gap-12">
      <div>
        <h1 className="section-title text-3xl mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              required
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone *</label>
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="address">Shipping Address *</label>
            <input
              id="address"
              required
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label htmlFor="suburb">Suburb / City *</label>
              <input
                id="suburb"
                required
                value={form.suburb}
                onChange={(e) => update("suburb", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="state">State *</label>
              <select
                id="state"
                required
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
              >
                {AU_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="postcode">Postcode *</label>
              <input
                id="postcode"
                required
                value={form.postcode}
                onChange={(e) => update("postcode", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="country">Country *</label>
            <input
              id="country"
              required
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="notes">Order Notes (optional)</label>
            <textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm border border-red-200 bg-red-50 px-4 py-3">
              {error}
            </p>
          )}

          <p className="text-[0.7rem] text-text-light leading-relaxed">
            Payment is processed securely. Your order will be created and you
            will be redirected to complete payment. Card details are never
            stored on our servers.
          </p>

          <button type="submit" disabled={loading} className="btn-primary mt-2">
            {loading ? "Processing..." : "Place Order & Pay"}
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-mid text-cream p-6 md:p-8 h-fit">
        <h2 className="font-serif text-xl mb-6">Order Summary</h2>
        <ul className="flex flex-col gap-4 mb-6">
          {items.map((item, idx) => (
            <li key={idx} className="flex justify-between text-sm gap-3">
              <span className="text-cream/70">
                {item.name} ({item.length}, {item.colour}) × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-gold/20 pt-4 flex justify-between font-serif text-lg">
          <span>Total</span>
          <span className="text-gold-light">${total.toFixed(2)} AUD</span>
        </div>
      </div>
    </div>
  );
}
