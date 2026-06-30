import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "clip-in-classic",
    name: "Classic Clip-In Set",
    category: "clip-in",
    categoryLabel: "Clip In Hair Extensions",
    description: "100% remy human hair clip-ins for instant length and volume.",
    longDescription:
      "Our Classic Clip-In Set is crafted from 100% double-drawn remy human hair, designed to blend seamlessly with your natural hair. Each weft uses silicone-lined clips that grip securely without damage. Reusable for 6-12 months with proper care.",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1200&auto=format&fit=crop",
    lengths: ["40cm", "45cm", "50cm", "55cm", "60cm"],
    colours: ["Natural Black", "Chocolate Brown", "Honey Blonde", "Platinum Blonde", "Balayage"],
  },
  {
    id: "2",
    slug: "tape-in-luxe",
    name: "Luxe Tape Extensions",
    category: "tape",
    categoryLabel: "Tape Extensions",
    description: "Ultra-thin, seamless tape wefts for an undetectable finish.",
    longDescription:
      "Luxe Tape Extensions use medical-grade adhesive tape and ultra-thin wefts for a virtually invisible application. Lies flat against the scalp, lasts 6-8 weeks per application, and is fully reusable.",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457ff853?q=80&w=1200&auto=format&fit=crop",
    lengths: ["40cm", "45cm", "50cm", "55cm", "60cm"],
    colours: ["Natural Black", "Chocolate Brown", "Honey Blonde", "Platinum Blonde", "Balayage"],
  },
  {
    id: "3",
    slug: "invisible-weft-premium",
    name: "Invisible Weft Premium",
    category: "invisible-weft",
    categoryLabel: "Invisible Weft",
    description: "Hand-tied wefts with no bulk, for a flawless, flat install.",
    longDescription:
      "The Invisible Weft Premium is hand-tied using a genius weft technique, eliminating bulk at the root. Perfect for fine or thin hair, it offers a flat, natural-looking install that moves freely.",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1200&auto=format&fit=crop",
    lengths: ["45cm", "50cm", "55cm", "60cm", "65cm"],
    colours: ["Natural Black", "Chocolate Brown", "Honey Blonde", "Platinum Blonde", "Balayage"],
  },
  {
    id: "4",
    slug: "nano-rings-set",
    name: "Nano Ring Extensions",
    category: "nano",
    categoryLabel: "Nano Extensions",
    description: "Micro nano rings for the most discreet, long-lasting wear.",
    longDescription:
      "Nano Ring Extensions use micro-sized copper rings, smaller than traditional micro-rings, for an exceptionally discreet application. Strand-by-strand application allows full styling versatility, including updos.",
    price: 329,
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop",
    lengths: ["40cm", "45cm", "50cm", "55cm", "60cm"],
    colours: ["Natural Black", "Chocolate Brown", "Honey Blonde", "Platinum Blonde"],
  },
  {
    id: "5",
    slug: "ceramic-styling-iron",
    name: "Professional Ceramic Styling Iron",
    category: "tools",
    categoryLabel: "Professional Tools",
    description: "Salon-grade ceramic flat iron for extension-safe styling.",
    longDescription:
      "Designed specifically for use with hair extensions, this ceramic styling iron offers precise, even heat distribution from 120°C to 230°C, minimising damage to both natural hair and extensions.",
    price: 159,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    lengths: ["One Size"],
    colours: ["Black/Gold"],
  },
  {
    id: "6",
    slug: "satin-scrunchie-set",
    name: "Silk Hair Accessory Set",
    category: "accessories",
    categoryLabel: "Hair Accessories",
    description: "Premium silk scrunchies and clips, gentle on extensions.",
    longDescription:
      "A curated set of silk scrunchies, clips and pins designed to be gentle on extensions, reducing friction and snagging while adding a luxurious finishing touch to any style.",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
    lengths: ["One Size"],
    colours: ["Black", "Gold", "Cream"],
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
