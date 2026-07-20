"use client";

import { useCart } from "@/lib/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CarrinhoPage() {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-black px-[6vw] sm:px-[8vw] py-20 sm:py-28 text-center">
        <h1 className="section-title text-cream text-2xl sm:text-3xl mb-4">Your Cart is Empty</h1>
        <p className="text-cream/55 mb-6 sm:mb-8 text-[0.95rem]">
          Explore our collection and find your perfect extensions.
        </p>
        <Link href="/produtos" className="btn-primary">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black px-[6vw] sm:px-[8vw] py-12 sm:py-16 max-w-5xl mx-auto pt-24">
      <h1 className="section-title text-cream text-2xl sm:text-3xl mb-8 sm:mb-10">Your Cart</h1>

      <div className="flex flex-col gap-6 sm:gap-8 mb-8 sm:mb-10">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 border-b border-cream/10 pb-5 sm:pb-6"
          >
            <div className="flex gap-4 sm:gap-6 items-center">
              <div className="relative w-20 h-24 sm:w-24 sm:h-28 bg-mid flex-shrink-0 overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-serif text-base sm:text-lg leading-tight text-cream">{item.name}</p>
                <p className="text-xs text-cream/55 mt-1">
                  {item.length} · {item.colour}
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center border border-cream/15">
                  <button
                    className="px-2 py-1"
                    onClick={() => updateQuantity(idx, Math.max(1, item.quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-3 text-sm text-cream">{item.quantity}</span>
                  <button
                    className="px-2 py-1"
                    onClick={() => updateQuantity(idx, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <span className="font-serif text-base sm:text-lg w-20 text-right text-cream">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(idx)}
                  className="text-cream/50 hover:text-gold flex-shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-8 sm:mb-10">
        <span className="text-cream/55 text-xs uppercase tracking-widest">
          Total
        </span>
        <span className="font-serif text-cream">${total.toFixed(2)} AUD</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/checkout" className="btn-primary flex-1 text-center">
          Proceed to Checkout
        </Link>
        <Link
          href="/produtos"
          className="text-xs uppercase tracking-widest text-cream/55 hover:text-gold text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
