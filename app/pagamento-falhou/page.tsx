"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { XCircle } from "lucide-react";

function FailedContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="px-[6vw] py-28 max-w-xl mx-auto text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
        <XCircle className="text-red-500" size={32} />
      </div>
      <h1 className="section-title text-3xl mb-4">Payment Failed</h1>
      <p className="text-text-light leading-relaxed mb-2">
        We couldn&apos;t process your payment. No charge has been made.
      </p>
      {orderId && (
        <p className="text-xs tracking-widest uppercase text-gold mb-8">
          Order #{orderId.slice(0, 8).toUpperCase()}
        </p>
      )}
      <p className="text-text-light leading-relaxed mb-10">
        Please check your card details and try again, or reach out to us
        directly for assistance.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/checkout" className="btn-primary">
          Try Again
        </Link>
        <a
          href="https://wa.me/61000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          Chat with Us on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense>
      <FailedContent />
    </Suspense>
  );
}
