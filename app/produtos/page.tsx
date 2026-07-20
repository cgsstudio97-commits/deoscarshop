import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ProductCategory } from "@/types";

const CATEGORIES: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "clip-in", label: "Clip In Hair Extensions" },
  { value: "tape", label: "Tape Extensions" },
  { value: "invisible-weft", label: "Invisible Weft" },
  { value: "nano", label: "Nano Extensions" },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const active = categoria || "all";

  const filtered =
    active === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === active);

  return (
    <div className="bg-black px-[6vw] sm:px-[8vw] py-12 sm:py-20">
      <div className="mb-8 sm:mb-12 text-center">
        <p className="section-eyebrow">Shop</p>
        <h1 className="section-title text-cream text-[clamp(1.6rem,4vw,3.2rem)]">
          The Collection
        </h1>
        <div className="divider mx-auto" />
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
        {CATEGORIES.map((c) => (
          <Link
            key={c.value}
            href={c.value === "all" ? "/produtos" : `/produtos?categoria=${c.value}`}
            className={`text-[0.65rem] tracking-widest uppercase px-3 sm:px-4 py-2 border transition-colors whitespace-nowrap ${
              active === c.value
                ? "bg-gold text-black border-gold"
                : "border-cream/20 text-cream/70 hover:border-gold hover:text-gold"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-cream/55">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14 sm:gap-x-10 sm:gap-y-20 reveal">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} dark />
          ))}
        </div>
      )}
    </div>
  );
}
