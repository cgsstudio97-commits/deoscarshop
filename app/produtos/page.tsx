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
  { value: "tools", label: "Professional Tools" },
  { value: "accessories", label: "Hair Accessories" },
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
    <div className="bg-cream px-[8vw] py-20">
      <div className="mb-12 text-center">
        <p className="section-eyebrow">Shop</p>
        <h1 className="section-title text-[clamp(2rem,4vw,3.2rem)]">
          The Collection
        </h1>
        <div className="divider mx-auto" />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {CATEGORIES.map((c) => (
          <Link
            key={c.value}
            href={c.value === "all" ? "/produtos" : `/produtos?categoria=${c.value}`}
            className={`text-[0.65rem] tracking-widest uppercase px-4 py-2 border transition-colors ${
              active === c.value
                ? "bg-black text-cream border-black"
                : "border-black/20 text-black/70 hover:border-gold hover:text-gold"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-text-light">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gold/15">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
