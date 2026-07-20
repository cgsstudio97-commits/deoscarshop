import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import AccessoriesCarousel from "@/components/AccessoriesCarousel";

const WHY_ITEMS = [
  {
    label: "100% Remy Human Hair",
    text: "Every strand is ethically sourced, cuticle-aligned Remy hair — the gold standard for longevity, softness and natural movement.",
  },
  {
    label: "Professional Salon Quality",
    text: "Applied by experienced technicians at our Bankstown salon — every set is installed with precision and care for your natural hair.",
  },
  {
    label: "Colour Matching Support",
    text: "Send us a photo and our specialists hand-select the perfect shade from our extensive library — guaranteed seamless blending.",
  },
  {
    label: "Australian Based",
    text: "Proudly Sydney-based with a physical salon in Bankstown NSW — come in for a consultation or order with confidence.",
  },
  {
    label: "Personal Consultation",
    text: "Not sure where to start? Chat directly with our team for personalised recommendations — no commitment, no pressure.",
  },
  {
    label: "Fast Shipping",
    text: "Express dispatch on all in-stock items. We ship Australia-wide so your dream hair arrives quickly and beautifully packaged.",
  },
];

const ACCESSORIES = [
  {
    tag: "Adhesive",
    name: "Walker Tape Ultra Hold Adhesive",
    desc: "Maximum-strength hair system adhesive by Walker Tape. Brush-on applicator, 0.5 fl oz. Ideal for tape and weft installations.",
    image: "/products/acc-adhesive.png",
  },
  {
    tag: "Kit",
    name: "Micro Ring Beads & Application Tool Kit",
    desc: "Complete kit with silicone-lined micro ring beads in multiple shades, loop pulling needles and wooden applicator tools for nano and micro ring installs.",
    image: "/products/acc-kit.png",
  },
  {
    tag: "Tape",
    name: "Walker Tape Lace Front Hair System Tape",
    desc: "Professional-grade double-sided hair system tape. Available in 3-yard and 36-yard rolls. Made in the USA.",
    image: "/products/acc-tape-lacefront.png",
  },
  {
    tag: "Remover",
    name: "Lace Wig Bond & Toupee Tape Remover",
    desc: "Gentle yet effective solvent for removing lace wig bond and toupee tape adhesives. 30ml precision-tip bottle. Safe for scalp use.",
    image: "/products/acc-remover.png",
  },
  {
    tag: "Micro Rings",
    name: "Silicone-Lined Micro Ring Beads",
    desc: "Available in shades #1, #3, #8, #11, #13 and more. Silicone lining protects the hair shaft. 500 beads per jar.",
    image: "/products/acc-microrings.png",
  },
  {
    tag: "Tape",
    name: "Walker Tape Ultra Hold Hair System Tape",
    desc: "12-yard roll of Ultra Hold double-sided hair system tape. Strong, waterproof hold. Made in the USA.",
    image: "/products/acc-tape-ultrahold.png",
  },
  {
    tag: "Nano Rings",
    name: "Copper Nano Rings / Micro Tubes",
    desc: "2.8mm OD × 2.3mm ID × 7.0mm length. Available in shades #1, #3, #5, #6, #7, #8, #11, #13.",
    image: "/products/acc-nanorings.png",
  },
];

const HOURS = [
  ["Monday", "9:00 AM – 6:00 PM"],
  ["Tuesday", "Closed"],
  ["Wednesday", "9:00 AM – 6:00 PM"],
  ["Thursday", "9:00 AM – 8:00 PM"],
  ["Friday", "9:00 AM – 6:00 PM"],
  ["Saturday", "9:00 AM – 6:00 PM"],
  ["Sunday", "9:00 AM – 6:00 PM"],
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[94vh] sm:h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="/videos/hero-1.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ objectPosition: "50% 38%", transform: "scale(1.03)" }}
          />
          {/* soft edge vignette — hides any corner watermark without over-cropping */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="relative z-10 px-[6vw] max-w-[800px] mx-auto text-center flex flex-col items-center">
          <h1 className="font-serif text-[clamp(2rem,5vw,4.6rem)] text-white leading-[1.05] mb-6 sm:mb-8 fade-up">
            Effortless Length.
            <br />
            <em className="italic text-gold-light">Undeniable Luxury.</em>
          </h1>
          <p className="text-white/65 leading-relaxed max-w-[380px] mb-9 sm:mb-11 text-[0.9rem] font-light fade-up" style={{ animationDelay: "0.24s" }}>
            Hand-selected 100% Remy human hair, crafted for women who refuse
            to compromise.
          </p>
          <div className="flex fade-up" style={{ animationDelay: "0.36s" }}>
            <a href="#shop" className="btn-primary !rounded-full text-center">
              Shop Extensions
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID 1 */}
      <section id="shop" className="relative px-[6vw] sm:px-[10vw] pt-20 sm:pt-28 pb-28 sm:pb-44 bg-black">
        <div className="absolute inset-x-0 top-0 h-32 sm:h-40 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
        <Reveal className="text-center mb-16 sm:mb-24 max-w-[640px] mx-auto">
          <p className="section-eyebrow">The Collection</p>
          <h2 className="section-title text-cream text-[clamp(2rem,4.6vw,4rem)] mb-6 sm:mb-8">
            Premium Hair Collection
          </h2>
          <div className="divider mx-auto" />
          <p className="text-[0.95rem] text-cream/55 leading-relaxed max-w-[520px] mx-auto mb-10 sm:mb-12 font-light">
            Crafted from 100% Double Drawn Remy Human Hair. Designed for
            seamless blends, luxurious volume and salon-quality results
            trusted across Australia.
          </p>
          <a href="/produtos" className="btn-primary">
            Shop Collection &rarr;
          </a>
        </Reveal>
        <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14 sm:gap-x-10 sm:gap-y-20 max-w-[1400px] mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} dark />
          ))}
        </Reveal>
      </section>

      {/* EDITORIAL VIDEO SECTION */}
      <section className="relative min-h-[75vh] sm:min-h-[92vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="/videos/hero-2.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/products/img-06-634fe352.jpg"
            className="w-full h-full object-cover"
            style={{ objectPosition: "50% 45%", transform: "scale(1.03)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />
        </div>
        <Reveal className="relative z-10 px-[6vw] max-w-[600px] mx-auto text-center">
          <p className="section-eyebrow text-gold">Crafted With Care</p>
          <h2 className="section-title text-cream text-[clamp(2.2rem,5.6vw,5rem)] mb-7 sm:mb-10">
            Hair that moves
            <br />
            <em className="italic text-gold-light">like it&apos;s your own.</em>
          </h2>
          <p className="text-cream/60 leading-relaxed max-w-[380px] mx-auto mb-11 sm:mb-14 text-[0.9rem] font-light">
            Every set is hand-selected and precision-applied — an invisible,
            weightless finish built to move, shine and last.
          </p>
          <a href="/produtos" className="btn-outline !text-cream !border-gold/50">
            Shop The Collection
          </a>
        </Reveal>
      </section>

      {/* WHY US */}
      <Reveal>
      <section id="why" className="bg-black px-[6vw] sm:px-[10vw] py-28 sm:py-44">
        <div className="text-center max-w-[560px] mx-auto">
          <p className="section-eyebrow">The Dé.Oscar Difference</p>
          <h2 className="section-title text-cream text-[clamp(2rem,4.6vw,4rem)]">
            Why women choose
            <br />
            <em className="italic text-gold-light">Dé.Oscar.</em>
          </h2>
          <div className="divider mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 lg:gap-20 mt-20">
          {WHY_ITEMS.map((item) => (
            <div key={item.label} className="flex flex-col gap-4 sm:gap-5">
              <div className="w-10 h-10 flex items-center justify-center border border-gold/60 text-gold flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              </div>
              <p className="font-serif text-lg sm:text-xl text-cream">{item.label}</p>
              <p className="text-[0.82rem] text-cream/55 leading-relaxed max-w-[320px] font-light">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      </Reveal>

      {/* COLOUR MATCHING */}
      <Reveal>
      <section id="colour" className="px-[6vw] sm:px-[10vw] py-28 sm:py-44" style={{ background: "#0a0a0a" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 sm:gap-[7vw] items-center">
          <div className="order-2 md:order-1">
            <div
              className="relative aspect-[4/5] overflow-hidden"
              style={{
                maskImage:
                  "radial-gradient(ellipse 75% 80% at 50% 45%, black 55%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 75% 80% at 50% 45%, black 55%, transparent 100%)",
              }}
            >
              <Image
                src="/products/model-colour-match.png"
                alt="Model wearing Dé.Oscar hair extensions"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="text-cream order-1 md:order-2">
            <p className="section-eyebrow">Colour Matching</p>
            <h2 className="section-title text-[clamp(2rem,4.6vw,4rem)]">
              A shade for
              <br />
              every shade.
            </h2>
            <div className="divider" />
            <p className="text-cream/70 text-[0.9rem] leading-loose max-w-[400px] mb-9 sm:mb-11 font-light">
              From jet black to platinum blonde, ash tones to warm caramels —
              our colour range is curated to blend with every natural hair
              colour. Our specialists provide personalised shade matching so
              your extensions look like they grew from your own scalp.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 items-start">
              <a
                href="tel:0450670239"
                className="flex items-center gap-3 text-[0.7rem] sm:text-[0.72rem] tracking-[0.2em] uppercase text-cream/80 hover:text-gold transition-colors duration-500 before:content-[''] before:inline-block before:w-6 sm:before:w-7 before:h-px before:bg-gold"
              >
                Enquire About Colour Matching
              </a>
              <a
                href="https://www.instagram.com/de.oscarhairdresser/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[0.7rem] sm:text-[0.72rem] tracking-[0.2em] uppercase text-cream/80 hover:text-gold transition-colors duration-500 before:content-[''] before:inline-block before:w-6 sm:before:w-7 before:h-px before:bg-gold"
              >
                View Our Colour Gallery
              </a>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      {/* CONSULTATION CTA */}
      <Reveal>
      <section id="consult" className="bg-black text-center px-[6vw] sm:px-[10vw] py-28 sm:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.06)_0%,transparent_70%)]" />
        <div className="relative z-10">
          <p className="section-eyebrow text-gold">Your Journey Starts Here</p>
          <h2 className="section-title text-cream text-[clamp(2.2rem,5.6vw,5rem)] mb-5 sm:mb-7">
            Begin your <em className="italic text-gold-light">transformation.</em>
          </h2>
          <p className="text-cream/50 max-w-[400px] mx-auto mb-10 sm:mb-14 leading-relaxed text-[0.9rem] font-light">
            Chat with our specialists for personalised colour matching, length
            recommendations and styling guidance. No pressure — just expert
            advice, for free.
          </p>
          <a href="tel:0450670239" className="btn-primary">
            Contact Us
          </a>
        </div>
      </section>
      </Reveal>

      {/* ACCESSORIES */}
      <Reveal>
      <section id="accessories" className="bg-black px-[6vw] sm:px-[10vw] py-28 sm:py-44">
        <div className="max-w-[600px]">
          <p className="section-eyebrow">Tools &amp; Supplies</p>
          <h2 className="section-title text-cream text-[clamp(2rem,4.6vw,4rem)]">
            Application <em className="italic text-gold-light">Accessories.</em>
          </h2>
          <div className="divider" />
          <p className="text-[0.88rem] text-cream/55 leading-relaxed max-w-[440px] mb-14 sm:mb-20 font-light">
            Everything your technician needs for a flawless install. All
            accessories available from{" "}
            <strong className="text-cream font-medium">AUD $10+</strong> — enquire
            for pricing and availability.
          </p>
        </div>

        <Reveal>
        <AccessoriesCarousel items={ACCESSORIES} />
        </Reveal>

        <div className="text-center mt-16 sm:mt-24 p-10 sm:p-14 bg-mid border border-gold/15 max-w-[600px] mx-auto">
          <p className="font-serif text-xl sm:text-2xl text-cream mb-3">
            Need something not listed?
          </p>
          <p className="text-[0.8rem] text-cream/45 mb-7 sm:mb-8 font-light">
            Contact us — we stock a wide range of professional
            hair extension tools and supplies.
          </p>
          <a href="tel:0450670239" className="btn-primary">
            Contact Us
          </a>
        </div>
      </section>
      </Reveal>

      {/* CONTACT */}
      <Reveal>
      <section id="contact" className="bg-black px-[6vw] sm:px-[10vw] py-28 sm:py-44 grid grid-cols-1 md:grid-cols-2 gap-14 sm:gap-[7vw] items-start">
        <div>
          <p className="section-eyebrow">Get In Touch</p>
          <h2 className="font-serif text-cream text-[clamp(1.8rem,3.6vw,2.6rem)] font-light mb-7 sm:mb-9 leading-[1.15]">
            Visit Us in
            <br />
            Bankstown.
          </h2>
          <div className="divider" />
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="text-[0.85rem] text-cream/55 leading-relaxed font-light">
              <strong className="block font-serif text-base text-cream mb-1.5 font-normal">
                Salon Address
              </strong>
              11/324 Chapel Road, Bankstown NSW, Sydney, Australia
            </div>
            <div className="text-[0.85rem] text-cream/55 leading-relaxed font-light">
              <strong className="block font-serif text-base text-cream mb-1.5 font-normal">
                Phone
              </strong>
              <a href="tel:0450670239" className="text-inherit no-underline hover:text-gold transition-colors duration-500">
                0450 670 239
              </a>
            </div>
            <div className="text-[0.85rem] text-cream/55 leading-relaxed font-light">
              <strong className="block font-serif text-base text-cream mb-1.5 font-normal">
                Instagram
              </strong>
              <a
                href="https://www.instagram.com/de.oscarhairdresser/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-inherit no-underline hover:text-gold transition-colors duration-500"
              >
                @de.oscarhairdresser
              </a>
            </div>
          </div>
        </div>
        <div>
          <p className="section-eyebrow">Opening Hours</p>
          <h3 className="font-serif text-cream text-[clamp(1.5rem,2.8vw,2.1rem)] font-light mb-6 sm:mb-8 leading-[1.15]">
            When You Can
            <br />
            Find Us.
          </h3>
          <div className="divider" />
          <div className="grid gap-3 mb-8 sm:mb-10">
            {HOURS.map(([day, hours]) => (
              <div
                key={day}
                className="flex justify-between text-[0.8rem] pb-3 border-b border-cream/10 font-light"
              >
                <span className="text-cream/80">{day}</span>
                <span className={hours === "Closed" ? "text-[#e08a8a]" : "text-cream/55"}>
                  {hours}
                </span>
              </div>
            ))}
          </div>
          <a href="tel:0450670239" className="btn-primary w-full sm:w-auto text-center">
            Call to Book
          </a>
        </div>
      </section>
      </Reveal>
    </>
  );
}
