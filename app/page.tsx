import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const categories = Array.from(
    new Map(PRODUCTS.map((p) => [p.category, p])).values()
  );

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2000&auto=format&fit=crop"
            alt="Dé.Oscar Hair Extensions"
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/50 to-black/20" />
        </div>
        <div className="relative z-10 px-[8vw] max-w-[700px]">
          <p className="text-[0.7rem] tracking-[0.35em] uppercase text-gold mb-6">
            Sydney, Australia &middot; Premium Hair Extensions
          </p>
          <h1 className="font-serif text-[clamp(2.6rem,6vw,5rem)] text-white leading-[1.1] mb-6">
            Effortless length.
            <br />
            <em className="italic text-gold-light">Timeless luxury.</em>
          </h1>
          <p className="text-white/70 leading-relaxed max-w-[480px] mb-10">
            Hand-selected 100% remy human hair extensions, crafted for the
            modern Australian woman who refuses to compromise.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/produtos" className="btn-primary">
              Shop the Collection
            </Link>
            <a href="#categorias" className="btn-outline !text-white !border-white/40">
              Explore Categories
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-gold py-3 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {Array(6)
            .fill(
              "100% Remy Human Hair · Free AU Shipping Over $150 · Premium Quality Guaranteed ·"
            )
            .map((t, i) => (
              <span
                key={i}
                className="text-[0.65rem] tracking-[0.25em] uppercase text-black font-medium"
              >
                {t}
              </span>
            ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section id="categorias" className="bg-black text-cream px-[8vw] py-24">
        <div className="text-center mb-16">
          <p className="section-eyebrow">Our Collections</p>
          <h2 className="section-title text-cream text-[clamp(2rem,4vw,3.2rem)] mb-6">
            Curated for every style
          </h2>
          <p className="text-cream/55 text-sm max-w-[520px] mx-auto leading-relaxed">
            From everyday clip-ins to salon-grade nano extensions — discover
            the range trusted by Australian stylists and self-styled queens
            alike.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1.5px] bg-gold/15">
          {categories.map((p) => (
            <Link
              key={p.category}
              href={`/produtos?categoria=${p.category}`}
              className="group bg-mid overflow-hidden"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.categoryLabel}
                  fill
                  sizes="(max-width:768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="font-serif text-sm text-cream leading-tight">
                  {p.categoryLabel}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="px-[8vw] py-24 bg-cream">
        <div className="mb-12">
          <p className="section-eyebrow">Bestsellers</p>
          <h2 className="section-title text-[clamp(2rem,4vw,3.2rem)]">
            Customer favourites
          </h2>
          <div className="divider" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gold/15">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="bg-black text-center px-[8vw] py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10">
          <h2 className="section-title text-cream text-[clamp(2rem,5vw,4rem)] mb-4">
            Need styling advice?
          </h2>
          <p className="text-cream/55 max-w-[520px] mx-auto mb-10 leading-relaxed">
            Chat directly with our extension specialists on WhatsApp for
            colour matching and length recommendations.
          </p>
          <a
            href="https://wa.me/61000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <style>{`
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .animate-marquee{animation:marquee 22s linear infinite}
      `}</style>
    </>
  );
}
