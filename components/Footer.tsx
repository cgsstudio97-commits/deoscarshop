import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-cream px-[5vw] py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <p className="font-serif text-xl text-cream mb-1">
          Dé<span className="text-gold">.</span>Oscar
        </p>
        <p className="text-[0.7rem] tracking-widest uppercase text-cream/40">
          Sydney, Australia
        </p>
      </div>
      <div className="flex gap-8 text-[0.7rem] tracking-widest uppercase text-cream/60">
        <Link href="/produtos" className="hover:text-gold transition-colors">
          Shop
        </Link>
        <Link href="/carrinho" className="hover:text-gold transition-colors">
          Cart
        </Link>
        <a
          href="https://wa.me/61000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors"
        >
          WhatsApp
        </a>
        <Link href="/admin" className="hover:text-gold transition-colors">
          Admin
        </Link>
      </div>
      <p className="text-[0.65rem] text-cream/30">
        © {new Date().getFullYear()} Dé.Oscar Hair Extensions. All rights reserved.
      </p>
    </footer>
  );
}
