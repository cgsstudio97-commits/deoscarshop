"use client";
import { useContext } from "react";
import { CartContext } from "@/lib/CartContext";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, total } =
    useContext(CartContext)!;

  return (
    <>
      {isOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black/50 z-[200]"
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-black z-[201] flex flex-col transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 bg-black flex items-center justify-between px-6 py-4 border-b border-gold/20">
          <h2 className="font-serif text-xl text-cream">Cart</h2>
          <button onClick={closeCart} className="text-cream hover:text-gold">
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
            <ShoppingBag size={48} className="text-gold/30 mb-4" />
            <p className="text-cream/55 mb-6">Your cart is empty</p>
            <button
              onClick={closeCart}
              className="btn-primary text-sm"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 px-6 py-6 overflow-y-auto space-y-4">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 pb-4 border-b border-cream/10"
                >
                  <div className="relative w-20 h-24 bg-mid flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="text-xs text-gold uppercase mb-1">
                      {item.category}
                    </p>
                    <p className="font-serif text-sm leading-tight mb-1 text-cream">
                      {item.name}
                    </p>
                    <p className="text-xs text-cream/55 mb-3">
                      {item.length} · {item.colour}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-cream/15">
                        <button
                          className="px-2 py-1"
                          onClick={() =>
                            updateQuantity(idx, item.quantity - 1)
                          }
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs w-6 text-center text-cream">
                          {item.quantity}
                        </span>
                        <button
                          className="px-2 py-1"
                          onClick={() =>
                            updateQuantity(idx, item.quantity + 1)
                          }
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-serif text-sm text-cream">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(idx)}
                        className="text-cream/50 hover:text-gold"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-black border-t border-gold/20 p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-cream/55 uppercase tracking-widest">
                  Total
                </span>
                <span className="font-serif text-lg text-cream">
                  ${total.toFixed(2)} AUD
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-primary w-full text-center block"
              >
                Checkout
              </Link>
              <Link
                href="/carrinho"
                onClick={closeCart}
                className="text-xs uppercase tracking-widest text-center block text-cream/55 hover:text-gold"
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
