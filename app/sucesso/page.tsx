"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="px-[6vw] py-28 max-w-xl mx-auto text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/15 flex items-center justify-center">
        <CheckCircle2 className="text-gold" size={32} />
      </div>
      <h1 className="section-title text-3xl mb-4">Thank You for Your Order</h1>
      <p className="text-text-light leading-relaxed mb-2">
        Your order has been received and is being processed with care.
      </p>
      {orderId && (
        <p className="text-xs tracking-widest uppercase text-gold mb-8">
          Order #{orderId.slice(0, 8).toUpperCase()}
        </p>
      )}
      <p className="text-text-light leading-relaxed mb-10">
        A confirmation email is on its way. If you have any questions about
        your order, our team is happy to help.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/produtos" className="btn-outline">
          Continue Shopping
        </Link>
        <a
          href="https://wa.me/61000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Chat with Us on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
