"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/lib/CartContext";
import { Minus, Plus, Check } from "lucide-react";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [length, setLength] = useState(product.lengths[0]);
  const [colour, setColour] = useState(product.colours[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const currentPrice = product.lengthPrices[length] ?? product.price;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: currentPrice,
      category: product.categoryLabel,
      length,
      colour,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-black px-[6vw] sm:px-[8vw] py-12 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 max-w-6xl mx-auto">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-mid overflow-hidden order-2 md:order-1">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Details */}
        <div className="order-1 md:order-2">
          <p className="text-[0.65rem] tracking-widest uppercase text-gold mb-2 sm:mb-3">
            {product.categoryLabel}
          </p>
          <h1 className="font-serif text-cream text-[clamp(1.6rem,4vw,2.8rem)] leading-tight mb-3 sm:mb-4">
            {product.name}
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-gold mb-4 sm:mb-6">
            ${currentPrice.toFixed(2)} AUD
          </p>
          <p className="text-cream/55 leading-relaxed mb-6 sm:mb-8 text-[0.95rem]">
            {product.longDescription}
          </p>

          <div className="divider" />

          {/* Length */}
          <div className="mb-6">
            <label>Length</label>
            <div className="flex flex-wrap gap-2">
              {product.lengths.map((l) => (
                <button
                  key={l}
                  onClick={() => setLength(l)}
                  className={`text-xs px-3 sm:px-4 py-2 border transition-colors ${
                    length === l
                      ? "bg-gold text-black border-gold"
                      : "border-cream/20 text-cream/70 hover:border-gold"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Colour */}
          <div className="mb-6">
            <label>Colour</label>
            <div className="flex flex-wrap gap-2">
              {product.colours.map((c) => (
                <button
                  key={c}
                  onClick={() => setColour(c)}
                  className={`text-xs px-3 sm:px-4 py-2 border transition-colors ${
                    colour === c
                      ? "bg-gold text-black border-gold"
                      : "border-cream/20 text-cream/70 hover:border-gold"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <label>Quantity</label>
            <div className="flex items-center border border-cream/20 w-fit">
              <button
                className="px-3 py-2"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="px-4 text-sm text-cream">{quantity}</span>
              <button
                className="px-3 py-2"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-primary w-full sm:w-auto text-center flex items-center justify-center gap-2"
          >
            {added ? (
              <>
                <Check size={16} /> Added to Cart
              </>
            ) : (
              "Add to Cart"
            )}
          </button>

          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-[0.72rem] text-cream/45">
            <span>Secure Checkout</span>
            <span>Sydney-Based Salon</span>
            <span>Personal Colour Matching Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
