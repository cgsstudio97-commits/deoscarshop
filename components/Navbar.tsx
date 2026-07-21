"use client";
import Link from "next/link";
import { useState, useContext } from "react";
import { CartContext } from "@/lib/CartContext";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const { count, openCart } = useContext(CartContext)!;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-transparent">
      <div className="relative px-4 sm:px-[6vw] py-5 sm:py-6 flex items-center justify-center">
        <ul className="hidden md:flex items-center gap-10 lg:gap-14 list-none">
          <li>
            <Link href="/" className="text-[0.65rem] tracking-[0.25em] uppercase text-cream/75 hover:text-gold transition-colors duration-500">
              Home
            </Link>
          </li>
          <li>
            <a href="/#shop" className="text-[0.65rem] tracking-[0.25em] uppercase text-cream/75 hover:text-gold transition-colors duration-500">
              Extensions
            </a>
          </li>
          <li>
            <Link href="/produtos" className="text-[0.65rem] tracking-[0.25em] uppercase text-cream/75 hover:text-gold transition-colors duration-500">
              Products
            </Link>
          </li>
        </ul>

        <div className="absolute right-2 sm:right-[6vw] flex items-center gap-1 sm:gap-3">
          <button
            onClick={openCart}
            className="relative text-cream/85 hover:text-gold transition-colors duration-500 w-11 h-11 flex items-center justify-center"
            aria-label="Open cart"
          >
            <ShoppingBag size={17} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute top-1 right-1 bg-gold text-black text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            className="md:hidden text-cream/85 w-11 h-11 flex items-center justify-center"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={17} strokeWidth={1.5} /> : <Menu size={17} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm px-4 py-5 flex flex-col gap-4">
          <Link href="/" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.2em] uppercase text-cream/80 hover:text-gold">
            Home
          </Link>
          <a href="/#shop" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.2em] uppercase text-cream/80 hover:text-gold">
            Extensions
          </a>
          <Link href="/produtos" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.2em] uppercase text-cream/80 hover:text-gold">
            Products
          </Link>
        </div>
      )}
    </nav>
  );
}
