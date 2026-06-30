"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCart();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[200]"
          onClick={closeCart}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cream z-[201] flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <h2 className="font-serif text-xl">Your Cart</h2>
          <button onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-text-light text-sm mt-10 text-center">
              Your cart is empty.
            </p>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="relative w-20 h-24 bg-mid flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <p className="font-serif text-base leading-tight">{item.name}</p>
                    <p className="text-[0.7rem] text-text-light">
                      {item.length} · {item.colour}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center border border-black/15">
                        <button
                          className="px-2 py-1"
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button
                          className="px-2 py-1"
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(idx)}
                    className="text-text-light hover:text-black self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-black/10 px-6 py-5">
            <div className="flex justify-between mb-4 text-sm">
              <span className="uppercase tracking-widest text-[0.7rem] text-text-light">
                Subtotal
              </span>
              <span className="font-serif text-lg">${total.toFixed(2)} AUD</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full block"
            >
              Continue to Checkout
            </Link>
            <Link
              href="/carrinho"
              onClick={closeCart}
              className="btn-outline w-full block mt-3"
            >
              View Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
