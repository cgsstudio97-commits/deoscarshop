"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[4vw] py-[1.1rem] transition-colors duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-md" : "bg-black/40"
      }`}
    >
      <Link href="/" className="font-serif text-2xl text-cream tracking-wide">
        Dé<span className="text-gold">.</span>Oscar
      </Link>

      <ul className="hidden md:flex items-center gap-10 list-none">
        <li>
          <Link href="/produtos" className="nav-link">
            Shop
          </Link>
        </li>
        <li>
          <Link href="/produtos?categoria=clip-in" className="nav-link">
            Clip-Ins
          </Link>
        </li>
        <li>
          <Link href="/produtos?categoria=tape" className="nav-link">
            Tape
          </Link>
        </li>
        <li>
          <Link href="/produtos?categoria=nano" className="nav-link">
            Nano
          </Link>
        </li>
        <li>
          <Link href="/produtos?categoria=tools" className="nav-link">
            Tools
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <button
          onClick={openCart}
          className="relative text-cream hover:text-gold transition-colors"
          aria-label="Open cart"
        >
          <ShoppingBag size={20} />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-medium w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
        <button
          className="md:hidden text-cream"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-black flex flex-col gap-4 p-6 md:hidden">
          <Link href="/produtos" onClick={() => setMobileOpen(false)} className="nav-link">
            Shop All
          </Link>
          <Link
            href="/produtos?categoria=clip-in"
            onClick={() => setMobileOpen(false)}
            className="nav-link"
          >
            Clip-In Extensions
          </Link>
          <Link
            href="/produtos?categoria=tape"
            onClick={() => setMobileOpen(false)}
            className="nav-link"
          >
            Tape Extensions
          </Link>
          <Link
            href="/produtos?categoria=invisible-weft"
            onClick={() => setMobileOpen(false)}
            className="nav-link"
          >
            Invisible Weft
          </Link>
          <Link
            href="/produtos?categoria=nano"
            onClick={() => setMobileOpen(false)}
            className="nav-link"
          >
            Nano Extensions
          </Link>
          <Link
            href="/produtos?categoria=tools"
            onClick={() => setMobileOpen(false)}
            className="nav-link"
          >
            Professional Tools
          </Link>
          <Link
            href="/produtos?categoria=accessories"
            onClick={() => setMobileOpen(false)}
            className="nav-link"
          >
            Hair Accessories
          </Link>
        </div>
      )}

      <style>{`
        .nav-link{color:var(--cream);text-decoration:none;font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;font-weight:400;opacity:.8;transition:opacity .2s}
        .nav-link:hover{opacity:1;color:var(--gold-light)}
      `}</style>
    </nav>
  );
}
