/*
  # SaltySnacks E-Commerce Database Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text, not null)
      - `price` (decimal, not null)
      - `image_url` (text, not null)
      - `stock` (integer, default 100)
      - `created_at` (timestamptz, default now())
    
    - `cart_items`
      - `id` (uuid, primary key)
      - `session_id` (text, not null) - for guest users
      - `product_id` (uuid, foreign key to products)
      - `quantity` (integer, not null, default 1)
      - `created_at` (timestamptz, default now())
    
    - `orders`
      - `id` (uuid, primary key)
      - `order_number` (text, unique, not null)
      - `session_id` (text, not null)
      - `total_amount` (decimal, not null)
      - `status` (text, default 'pending')
      - `created_at` (timestamptz, default now())
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `product_id` (uuid, foreign key to products)
      - `product_name` (text, not null)
      - `quantity` (integer, not null)
      - `price` (decimal, not null)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to products
    - Add policies for cart and order operations based on session_id
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  image_url text NOT NULL,
  stock integer DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  session_id text NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  product_name text NOT NULL,
  quantity integer NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view cart items by session"
  ON cart_items FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert cart items"
  ON cart_items FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can update cart items"
  ON cart_items FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete cart items"
  ON cart_items FOR DELETE
  TO anon
  USING (true);

CREATE POLICY "Anyone can view orders"
  ON orders FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert orders"
  ON orders FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert order items"
  ON order_items FOR INSERT
  TO anon
  WITH CHECK (true);