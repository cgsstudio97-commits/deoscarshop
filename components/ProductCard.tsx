import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group bg-mid block overflow-hidden"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <p className="text-[0.6rem] tracking-widest uppercase text-gold mb-2">
          {product.categoryLabel}
        </p>
        <h3 className="font-serif text-xl text-cream mb-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-[0.8rem] text-cream/50 leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-gold-light font-serif text-lg">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[0.65rem] tracking-widest uppercase text-gold border-b border-gold/40 pb-0.5 group-hover:border-gold transition-colors">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
