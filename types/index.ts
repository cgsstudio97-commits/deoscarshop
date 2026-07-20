export type ProductCategory =
  | "clip-in"
  | "tape"
  | "invisible-weft"
  | "nano";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  badge?: string;
  description: string;
  longDescription: string;
  price: number; // AUD - starting price (lowest length)
  lengthPrices: Record<string, number>; // AUD price per length option
  image: string;
  lengths: string[];
  colours: string[];
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  category: string;
  length: string;
  colour: string;
  quantity: number;
}

export type PaymentStatus = "pending" | "paid" | "failed";
export type OrderStatus = "new" | "processing" | "shipped" | "completed";

export interface OrderItemRecord {
  product_id: string;
  product_name: string;
  product_type: string;
  length: string;
  colour: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface OrderRecord {
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
  items: OrderItemRecord[];
  total_price: number;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
}
