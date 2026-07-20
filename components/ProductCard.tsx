import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

interface Props {
  product: Product;
  dark?: boolean;
}

export default function ProductCard({ product, dark }: Props) {
  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-mid transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.18)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:640px) 100vw, (max-width:768px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-black/85 text-gold text-[0.58rem] tracking-[0.18em] uppercase px-3 py-1.5 font-medium">
            {product.badge}
          </span>
        )}
      </div>

      <div className="pt-6 sm:pt-7 flex flex-col items-start">
        <p className="text-[0.72rem] tracking-[0.15em] uppercase text-gold/80 mb-3">
          {product.categoryLabel}
        </p>
        <h3 className={`font-serif font-medium text-[1.625rem] leading-tight mb-2 ${dark ? "text-cream" : "text-black"}`}>
          {product.name}
        </h3>
        <p className={`text-[1rem] leading-relaxed mb-4 line-clamp-2 font-light ${dark ? "text-cream/55" : "text-text-light"}`}>
          {product.description}
        </p>
        <div className="flex items-center justify-between w-full gap-4 mt-1">
          <span className={`font-serif font-semibold text-[1.25rem] ${dark ? "text-cream" : "text-black"}`}>
            ${product.price.toFixed(2)} AUD
          </span>
          <span
            className={
              dark
                ? "text-[0.68rem] tracking-[0.15em] uppercase text-cream bg-transparent border border-cream/20 px-4 py-2.5 group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap"
                : "text-[0.68rem] tracking-[0.15em] uppercase text-black bg-transparent border border-black/15 px-4 py-2.5 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap"
            }
          >
            Shop Now &rarr;
          </span>
        </div>
        <p className={`text-[0.65rem] tracking-[0.08em] mt-3 ${dark ? "text-cream/40" : "text-text-light/70"}`}>
          100% Remy Human Hair · Sydney Salon Quality
        </p>
      </div>
    </Link>
  );
}
