"use client";

import { useEffect, useState, useCallback } from "react";
import { Search } from "lucide-react";

interface Customer {
  name: string;
  email: string;
  phone: string;
  orders_count: number;
  total_spent: number;
  last_order_at: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCustomers = useCallback(async (q: string) => {
    setLoading(true);
    const res = await fetch(`/api/admin/customers?search=${encodeURIComponent(q)}`);
    if (res.ok) {
      const data = await res.json();
      setCustomers(data.customers || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCustomers("");
  }, [fetchCustomers]);

  useEffect(() => {
    const t = setTimeout(() => fetchCustomers(search), 350);
    return () => clearTimeout(t);
  }, [search, fetchCustomers]);

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Customers</h1>

      <div className="relative mb-6 max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light"
        />
        <input
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="!pl-9"
        />
      </div>

      {loading ? (
        <p className="text-text-light text-sm">Loading customers...</p>
      ) : customers.length === 0 ? (
        <p className="text-text-light text-sm">No customers found.</p>
      ) : (
        <div className="bg-white border border-black/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left text-[0.65rem] uppercase tracking-widest text-text-light">
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Total Spent</th>
                <th className="px-4 py-3">Last Order</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.email} className="border-b border-black/5 hover:bg-cream/50">
                  <td className="px-4 py-3">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-text-light text-xs">{c.email}</p>
                  </td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">{c.orders_count}</td>
                  <td className="px-4 py-3 font-serif">${c.total_spent.toFixed(2)}</td>
                  <td className="px-4 py-3 text-text-light whitespace-nowrap">
                    {new Date(c.last_order_at).toLocaleDateString("en-AU", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
