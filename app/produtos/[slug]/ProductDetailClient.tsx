"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Check } from "lucide-react";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [length, setLength] = useState(product.lengths[0]);
  const [colour, setColour] = useState(product.colours[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.categoryLabel,
      length,
      colour,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-cream px-[6vw] py-16">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-mid overflow-hidden">
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
        <div>
          <p className="text-[0.65rem] tracking-widest uppercase text-gold mb-3">
            {product.categoryLabel}
          </p>
          <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] leading-tight mb-4">
            {product.name}
          </h1>
          <p className="font-serif text-2xl text-gold mb-6">
            ${product.price.toFixed(2)} AUD
          </p>
          <p className="text-text-light leading-relaxed mb-8">
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
                  className={`text-xs px-4 py-2 border transition-colors ${
                    length === l
                      ? "bg-black text-cream border-black"
                      : "border-black/20 hover:border-gold"
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
                  className={`text-xs px-4 py-2 border transition-colors ${
                    colour === c
                      ? "bg-black text-cream border-black"
                      : "border-black/20 hover:border-gold"
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
            <div className="flex items-center border border-black/20 w-fit">
              <button
                className="px-3 py-2"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="px-4 text-sm">{quantity}</span>
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
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {added ? (
              <>
                <Check size={16} /> Added to Cart
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
