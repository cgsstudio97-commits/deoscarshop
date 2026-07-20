-- ============================================================
-- DE.OSCAR HAIR EXTENSIONS — SUPABASE SCHEMA
-- Run this file in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- 1. ORDERS TABLE
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Customer
  customer_name text not null,
  email text not null,
  phone text not null,

  -- Shipping address
  address text not null,
  suburb text not null,
  state text not null,
  postcode text not null,
  country text not null default 'Australia',
  notes text,

  -- Order financials
  total_price numeric(10,2) not null,

  -- Status
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'failed')),
  order_status text not null default 'new'
    check (order_status in ('new', 'processing', 'shipped', 'completed')),

  -- Payment gateway metadata (Fiserv)
  fiserv_transaction_id text,
  fiserv_response jsonb
);

-- 2. ORDER ITEMS TABLE (one row per product line in an order)
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  product_type text not null,
  length text not null,
  colour text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null,
  line_total numeric(10,2) not null
);

create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_orders_email on public.orders(email);
create index if not exists idx_orders_payment_status on public.orders(payment_status);
create index if not exists idx_orders_order_status on public.orders(order_status);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public (anon) can INSERT an order during checkout, but cannot read/update/delete.
-- All reads/updates happen via the service-role key in our backend API routes only.
drop policy if exists "public can insert orders" on public.orders;
create policy "public can insert orders"
  on public.orders for insert
  to anon
  with check (true);

drop policy if exists "public can insert order items" on public.order_items;
create policy "public can insert order items"
  on public.order_items for insert
  to anon
  with check (true);

-- No select/update/delete policies for anon = denied by default with RLS enabled.
-- Admin dashboard reads/writes go through the service role key (bypasses RLS),
-- used only inside our protected /api/admin/* server routes after auth check.

-- ============================================================
-- ADMIN AUTH
-- ============================================================
-- Use Supabase Auth (Email/Password) for the business owner login.
-- Create the admin user via: Supabase Dashboard > Authentication > Users > Add User
-- No extra table needed — /admin routes check supabase.auth.getUser() server-side.
