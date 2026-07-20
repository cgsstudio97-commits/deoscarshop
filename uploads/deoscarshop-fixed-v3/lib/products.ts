import { Product } from "@/types";

export type { Product };

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "clip-in-classic",
    name: "Classic Clip-In Hair Extensions",
    category: "clip-in",
    categoryLabel: "Clip-In Hair Extensions",
    badge: "Best Seller",
    description: "100% Double Drawn Remy human hair clip-ins for instant length and volume.",
    longDescription:
      "Our Classic Clip-In Hair Extensions are crafted from 100% Double Drawn Remy Human Hair, designed to blend seamlessly with your natural hair. Each weft features silicone-lined clips for a secure, damage-free hold. Reusable for 6–12 months with proper care.",
    price: 230,
    lengthPrices: { "40cm": 230, "45cm": 250, "50cm": 270, "55cm": 290, "60cm": 310 },
    image: "/products/clip-in-premium.webp",
    lengths: ["40cm", "45cm", "50cm", "55cm", "60cm"],
    colours: ["Natural Black", "Chocolate Brown", "Honey Blonde", "Platinum Blonde", "Balayage"],
  },
  {
    id: "2",
    slug: "tape-in-luxe",
    name: "Premium Tape-In Hair Extensions",
    category: "tape",
    categoryLabel: "Tape-In Hair Extensions",
    badge: "Most Popular",
    description: "Ultra-thin, seamless tape wefts for an undetectable finish.",
    longDescription:
      "Our Premium Tape-In Hair Extensions are made from 100% Double Drawn Remy Human Hair and feature medical-grade adhesive tapes for a comfortable, lightweight and natural-looking finish. Reusable with professional maintenance.",
    price: 240,
    lengthPrices: { "40cm": 240, "45cm": 260, "50cm": 280, "55cm": 300, "60cm": 320 },
    image: "/products/tape-in-premium.webp",
    lengths: ["40cm", "45cm", "50cm", "55cm", "60cm"],
    colours: ["Natural Black", "Chocolate Brown", "Honey Blonde", "Platinum Blonde", "Balayage"],
  },
  {
    id: "3",
    slug: "invisible-weft-premium",
    name: "Premium Invisible Weft Hair Extensions",
    category: "invisible-weft",
    categoryLabel: "Invisible Weft Hair Extensions",
    badge: "Salon Favourite",
    description: "Hand-tied wefts with no bulk, for a flawless, flat install.",
    longDescription:
      "Our Premium Invisible Weft Hair Extensions are made from 100% Double Drawn Remy Human Hair, designed to create maximum volume with an ultra-discreet finish. Ideal for professional salon installations and long-lasting wear.",
    price: 270,
    lengthPrices: { "45cm": 270, "50cm": 290, "55cm": 310, "60cm": 330, "65cm": 350 },
    image: "/products/invisible-weft-premium.webp",
    lengths: ["45cm", "50cm", "55cm", "60cm", "65cm"],
    colours: ["Natural Black", "Chocolate Brown", "Honey Blonde", "Platinum Blonde", "Balayage"],
  },
  {
    id: "4",
    slug: "nano-rings-set",
    name: "Premium Nano Tip Hair Extensions",
    category: "nano",
    categoryLabel: "Nano Tip Hair Extensions",
    badge: "Premium",
    description: "Micro nano rings for the most discreet, long-lasting wear.",
    longDescription:
      "Our Premium Nano Tip Hair Extensions are crafted from 100% Double Drawn Remy Human Hair, offering a lightweight, discreet and reusable application using nano rings. Perfect for achieving seamless length and volume while protecting your natural hair.",
    price: 240,
    lengthPrices: { "40cm": 240, "45cm": 260, "50cm": 280, "55cm": 300, "60cm": 320 },
    image: "/products/nano-tip-premium.webp",
    lengths: ["40cm", "45cm", "50cm", "55cm", "60cm"],
    colours: ["Natural Black", "Chocolate Brown", "Honey Blonde", "Platinum Blonde"],
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
