import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private sessionId: string;

  constructor() {
    this.supabase = createClient(
      'https://vglkuynxhbpcygmouspl.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnbGt1eW54aGJwY3lnbW91c3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjkxMzksImV4cCI6MjA3Nzg0NTEzOX0.TuDGJvs2IPfYihD9jSGjtN18Z7Mz_BoutP48OrM6JDw'
    );

    this.sessionId = localStorage.getItem('sessionId') || this.generateSessionId();
    localStorage.setItem('sessionId', this.sessionId);
  }

  private generateSessionId(): string {
    return 'sess_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  getSessionId(): string {
    return this.sessionId;
  }

  async getProducts() {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  }

  async getProduct(id: string) {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async getCartItems() {
    const { data, error } = await this.supabase
      .from('cart_items')
      .select(`
        *,
        products (*)
      `)
      .eq('session_id', this.sessionId);

    if (error) throw error;
    return data;
  }

  async addToCart(productId: string, quantity: number = 1) {
    const existing = await this.supabase
      .from('cart_items')
      .select('*')
      .eq('session_id', this.sessionId)
      .eq('product_id', productId)
      .maybeSingle();

    if (existing.data) {
      const { data, error } = await this.supabase
        .from('cart_items')
        .update({ quantity: existing.data.quantity + quantity })
        .eq('id', existing.data.id)
        .select();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await this.supabase
        .from('cart_items')
        .insert([{
          session_id: this.sessionId,
          product_id: productId,
          quantity
        }])
        .select();

      if (error) throw error;
      return data;
    }
  }

  async updateCartItem(cartItemId: string, quantity: number) {
    const { data, error } = await this.supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .select();

    if (error) throw error;
    return data;
  }

  async removeFromCart(cartItemId: string) {
    const { error } = await this.supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) throw error;
  }

  async clearCart() {
    const { error } = await this.supabase
      .from('cart_items')
      .delete()
      .eq('session_id', this.sessionId);

    if (error) throw error;
  }

  async createOrder(totalAmount: number, items: any[]) {
    const orderNumber = 'ORD-' + Date.now().toString(36).toUpperCase();

    const { data: order, error: orderError } = await this.supabase
      .from('orders')
      .insert([{
        order_number: orderNumber,
        session_id: this.sessionId,
        total_amount: totalAmount,
        status: 'confirmed'
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.products.name,
      quantity: item.quantity,
      price: item.products.price
    }));

    const { error: itemsError } = await this.supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    await this.clearCart();

    return order;
  }

  async getOrders() {
    const { data, error } = await this.supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *
        )
      `)
      .eq('session_id', this.sessionId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}
