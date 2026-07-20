import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Dé.Oscar Hair Extensions – Premium Australian Luxury",
  description:
    "Premium hair extensions, handcrafted for the modern Australian woman. Clip-ins, tape, invisible weft, nano extensions and professional tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="video" href="/videos/hero-1.mp4" type="video/mp4" />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-black text-cream">
        <CartProvider>
          <SiteChrome>{children}</SiteChrome>
        </CartProvider>
      </body>
    </html>
  );
}
