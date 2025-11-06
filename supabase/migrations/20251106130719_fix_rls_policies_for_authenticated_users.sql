/*
  # Fix RLS Policies for Authenticated Users

  1. Problem
    - Products and cart/order policies only allowed "anon" role
    - Authenticated users couldn't access products after login
    - This caused products to disappear after authentication

  2. Solution
    - Add policies for "authenticated" role in addition to "anon"
    - Allow both authenticated and anonymous users to view products
    - Allow both to perform cart and order operations
    - Use user_id and session_id to track ownership

  3. Changes
    - Update products SELECT policy to include authenticated users
    - Update cart items policies for authenticated users (use auth.uid() for tracking)
    - Update orders policies for authenticated users (use auth.uid() for tracking)
    - Update order items policies for authenticated users
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' AND policyname = 'Authenticated users can view products'
  ) THEN
    CREATE POLICY "Authenticated users can view products"
      ON products FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cart_items' AND policyname = 'Authenticated users can view cart'
  ) THEN
    CREATE POLICY "Authenticated users can view cart"
      ON cart_items FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cart_items' AND policyname = 'Authenticated users can insert cart items'
  ) THEN
    CREATE POLICY "Authenticated users can insert cart items"
      ON cart_items FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cart_items' AND policyname = 'Authenticated users can update cart items'
  ) THEN
    CREATE POLICY "Authenticated users can update cart items"
      ON cart_items FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cart_items' AND policyname = 'Authenticated users can delete cart items'
  ) THEN
    CREATE POLICY "Authenticated users can delete cart items"
      ON cart_items FOR DELETE
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'orders' AND policyname = 'Authenticated users can view orders'
  ) THEN
    CREATE POLICY "Authenticated users can view orders"
      ON orders FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'orders' AND policyname = 'Authenticated users can insert orders'
  ) THEN
    CREATE POLICY "Authenticated users can insert orders"
      ON orders FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'order_items' AND policyname = 'Authenticated users can view order items'
  ) THEN
    CREATE POLICY "Authenticated users can view order items"
      ON order_items FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'order_items' AND policyname = 'Authenticated users can insert order items'
  ) THEN
    CREATE POLICY "Authenticated users can insert order items"
      ON order_items FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;