"use client";

import { Fragment, useEffect, useState, useCallback } from "react";
import { Search, RefreshCw } from "lucide-react";

interface OrderItem {
  id: string;
  product_name: string;
  product_type: string;
  length: string;
  colour: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  notes: string | null;
  total_price: number;
  payment_status: "pending" | "paid" | "failed";
  order_status: "new" | "processing" | "shipped" | "completed";
  order_items: OrderItem[];
}

const PAYMENT_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
};

const ORDER_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-orange-100 text-orange-700",
  completed: "bg-green-100 text-green-700",
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async (q: string) => {
    setLoading(true);
    const res = await fetch(`/api/admin/orders?search=${encodeURIComponent(q)}`);
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders("");
  }, [fetchOrders]);

  useEffect(() => {
    const t = setTimeout(() => fetchOrders(search), 350);
    return () => clearTimeout(t);
  }, [search, fetchOrders]);

  const filteredOrders = orders.filter(
    (o) =>
      (paymentFilter === "all" || o.payment_status === paymentFilter) &&
      (statusFilter === "all" || o.order_status === statusFilter)
  );

  async function updateStatus(orderId: string, field: "order_status" | "payment_status", value: string) {
    setUpdatingId(orderId);
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, [field]: value } : o))
      );
    }
    setUpdatingId(null);
  }

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.payment_status === "pending").length,
    paid: orders.filter((o) => o.payment_status === "paid").length,
    revenue: orders
      .filter((o) => o.payment_status === "paid")
      .reduce((sum, o) => sum + Number(o.total_price), 0),
  };

  return (
    <div className="px-[6vw] sm:px-[8vw] py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h1 className="font-serif text-2xl sm:text-3xl">Orders</h1>
        <button
          onClick={() => fetchOrders(search)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-text-light hover:text-gold"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <StatCard label="Total Orders" value={stats.total} />
        <StatCard label="Pending Payment" value={stats.pending} />
        <StatCard label="Paid" value={stats.paid} />
        <StatCard label="Revenue (Paid)" value={`$${stats.revenue.toFixed(2)}`} />
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
        <div className="relative max-w-md flex-1 min-w-[220px]">
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
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="!w-auto"
        >
          <option value="all">All Payments</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="!w-auto"
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <p className="text-text-light text-sm">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-text-light text-sm">No orders found.</p>
      ) : (
        <div className="bg-white border border-black/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left text-[0.65rem] uppercase tracking-widest text-text-light">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <Fragment key={order.id}>
                  <tr className="border-b border-black/5 hover:bg-cream/50">
                    <td className="px-4 py-3 whitespace-nowrap text-text-light">
                      {new Date(order.created_at).toLocaleDateString("en-AU", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.customer_name}</p>
                      <p className="text-text-light text-xs">{order.email}</p>
                    </td>
                    <td className="px-4 py-3 font-serif">
                      ${Number(order.total_price).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.payment_status}
                        disabled={updatingId === order.id}
                        onChange={(e) =>
                          updateStatus(order.id, "payment_status", e.target.value)
                        }
                        className={`!w-auto !py-1 !px-2 text-xs rounded border-none ${PAYMENT_COLORS[order.payment_status]}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.order_status}
                        disabled={updatingId === order.id}
                        onChange={(e) =>
                          updateStatus(order.id, "order_status", e.target.value)
                        }
                        className={`!w-auto !py-1 !px-2 text-xs rounded border-none ${ORDER_COLORS[order.order_status]}`}
                      >
                        <option value="new">New</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === order.id ? null : order.id)
                        }
                        className="text-xs text-gold uppercase tracking-widest"
                      >
                        {expandedId === order.id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>
                  {expandedId === order.id && (
                    <tr className="bg-cream/40">
                      <td colSpan={6} className="px-4 py-5">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-[0.65rem] uppercase tracking-widest text-text-light mb-2">
                              Shipping Address
                            </p>
                            <p>{order.customer_name}</p>
                            <p>{order.phone}</p>
                            <p>{order.address}</p>
                            <p>
                              {order.suburb}, {order.state} {order.postcode}
                            </p>
                            <p>{order.country}</p>
                            {order.notes && (
                              <p className="mt-2 italic text-text-light">
                                Notes: {order.notes}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-[0.65rem] uppercase tracking-widest text-text-light mb-2">
                              Products
                            </p>
                            <ul className="flex flex-col gap-2">
                              {order.order_items?.map((item) => (
                                <li key={item.id} className="flex justify-between text-sm border-b border-black/5 pb-2">
                                  <span>
                                    {item.product_name}{" "}
                                    <span className="text-text-light text-xs">
                                      ({item.product_type} · {item.length} · {item.colour}) × {item.quantity}
                                    </span>
                                  </span>
                                  <span>${Number(item.line_total).toFixed(2)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white border border-black/10 p-5">
      <p className="text-[0.65rem] uppercase tracking-widest text-text-light mb-2">
        {label}
      </p>
      <p className="font-serif text-2xl">{value}</p>
    </div>
  );
}
