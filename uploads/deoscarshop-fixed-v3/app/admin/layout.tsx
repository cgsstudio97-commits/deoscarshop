"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LayoutDashboard, Users, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex bg-cream">
      <aside className="w-56 bg-black text-cream flex flex-col py-8 px-5 fixed h-full">
        <Link href="/admin/dashboard" className="font-serif text-xl mb-12 block">
          Dé<span className="text-gold">.</span>Oscar
          <span className="block text-[0.6rem] tracking-widest uppercase text-gold/70 mt-1">
            Admin
          </span>
        </Link>

        <nav className="flex flex-col gap-1">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 text-sm rounded hover:bg-white/5 transition-colors"
          >
            <LayoutDashboard size={16} />
            Orders
          </Link>
          <Link
            href="/admin/customers"
            className="flex items-center gap-3 px-3 py-2.5 text-sm rounded hover:bg-white/5 transition-colors"
          >
            <Users size={16} />
            Customers
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-3 py-2.5 text-sm rounded hover:bg-white/5 transition-colors text-cream/60"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </aside>
      <main className="flex-1 ml-56 p-8">{children}</main>
    </div>
  );
}
