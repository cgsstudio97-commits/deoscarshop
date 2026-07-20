export default function Footer() {
  return (
    <footer className="bg-black text-cream border-t border-gold/20">
      <div className="px-[6vw] sm:px-[8vw] py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 pb-8 border-b border-gold/20">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-gold mb-4">
              Dé.Oscar Hair Extensions
            </p>
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed max-w-md">
              Sydney-based luxury 100% Remy human hair extensions. Professional salon quality, ethically sourced, perfectly colour-matched.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-6 text-[0.65rem] sm:text-[0.7rem] tracking-widest uppercase text-cream/60 mb-8">
            <a href="/#colour" className="hover:text-gold transition-colors">
              Colours
            </a>
            <a href="/#accessories" className="hover:text-gold transition-colors">
              Accessories
            </a>
            <a href="/#contact" className="hover:text-gold transition-colors">
              Contact
            </a>
            <a
              href="https://www.instagram.com/de.oscarhairdresser/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              Instagram
            </a>
          </div>

          <div className="pt-8 border-t border-gold/20 text-[0.65rem] text-cream/50">
            <p>© 2026 Dé.Oscar Hair Extensions. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
