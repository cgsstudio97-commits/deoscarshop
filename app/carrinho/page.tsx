"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="px-[8vw] py-28 text-center">
        <h1 className="section-title text-3xl mb-4">Your Cart is Empty</h1>
        <p className="text-text-light mb-8">
          Discover our luxury hair extensions collection.
        </p>
        <Link href="/produtos" className="btn-primary">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="px-[6vw] md:px-[8vw] py-16 max-w-5xl mx-auto">
      <h1 className="section-title text-3xl mb-10">Your Cart</h1>

      <div className="flex flex-col gap-6 mb-10">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-5 border-b border-black/10 pb-6"
          >
            <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-mid flex-shrink-0 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[0.6rem] tracking-widest uppercase text-gold mb-1">
                  {item.category}
                </p>
                <p className="font-serif text-lg leading-tight">{item.name}</p>
                <p className="text-xs text-text-light mt-1">
                  {item.length} · {item.colour}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-black/15">
                  <button
                    className="px-3 py-2"
                    onClick={() => updateQuantity(idx, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 text-sm">{item.quantity}</span>
                  <button
                    className="px-3 py-2"
                    onClick={() => updateQuantity(idx, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="font-serif text-lg w-20 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(idx)}
                  className="text-text-light hover:text-black"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-end gap-4">
        <div className="flex justify-between w-full sm:w-72 text-lg">
          <span className="text-text-light text-sm uppercase tracking-widest">
            Total
          </span>
          <span className="font-serif">${total.toFixed(2)} AUD</span>
        </div>
        <Link
          href="/checkout"
          className="btn-primary w-full sm:w-72 text-center"
        >
          Continue to Checkout
        </Link>
        <Link
          href="/produtos"
          className="text-xs uppercase tracking-widest text-text-light hover:text-gold"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}
