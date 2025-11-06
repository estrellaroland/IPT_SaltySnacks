import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSpinner, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash, add, remove, checkmarkCircle } from 'ionicons/icons';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonSpinner,
    IonToast
  ],
  template: `
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Shopping Cart</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="page-container">
      <div *ngIf="loading" class="loading-container">
        <ion-spinner name="crescent" color="warning"></ion-spinner>
      </div>

      <div *ngIf="!loading" class="cart-container">
        <div *ngIf="cartItems.length === 0" class="empty-cart">
          <ion-icon name="cart" class="empty-icon"></ion-icon>
          <h2>Your cart is empty</h2>
          <p>Add some delicious snacks to get started!</p>
          <ion-button routerLink="/products" color="warning" size="large">
            Browse Products
          </ion-button>
        </div>

        <div *ngIf="cartItems.length > 0" class="cart-content">
          <ion-card *ngFor="let item of cartItems" class="cart-item-card">
            <ion-card-content>
              <div class="cart-item">
                <div class="item-image" [style.background-image]="'url(' + item.products.image_url + ')'"></div>
                <div class="item-details">
                  <h3 class="item-name">{{ item.products.name }}</h3>
                  <p class="item-price">\₱{{ item.products.price }}</p>
                  <div class="quantity-controls">
                    <ion-button
                      (click)="decreaseQuantity(item)"
                      fill="outline"
                      size="small"
                      color="warning">
                      <ion-icon slot="icon-only" name="remove"></ion-icon>
                    </ion-button>
                    <span class="quantity">{{ item.quantity }}</span>
                    <ion-button
                      (click)="increaseQuantity(item)"
                      fill="outline"
                      size="small"
                      color="warning">
                      <ion-icon slot="icon-only" name="add"></ion-icon>
                    </ion-button>
                  </div>
                </div>
                <div class="item-actions">
                  <p class="item-total">\₱{{ (item.products.price * item.quantity).toFixed(2) }}</p>
                  <ion-button
                    (click)="removeItem(item)"
                    fill="clear"
                    color="danger"
                    size="small">
                    <ion-icon slot="icon-only" name="trash"></ion-icon>
                  </ion-button>
                </div>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="summary-card">
            <ion-card-header>
              <ion-card-title>Order Summary</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class="summary-row">
                <span>Subtotal:</span>
                <span>\₱{{ getSubtotal().toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span>Tax (8%):</span>
                <span>\₱{{ getTax().toFixed(2) }}</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-row total">
                <span>Total:</span>
                <span>\₱{{ getTotal().toFixed(2) }}</span>
              </div>
              <ion-button
                (click)="checkout()"
                expand="block"
                color="warning"
                size="large"
                class="checkout-btn">
                <ion-icon slot="start" name="checkmark-circle"></ion-icon>
                Place Order
              </ion-button>
            </ion-card-content>
          </ion-card>
        </div>
      </div>

      <ion-toast
        [isOpen]="showToast"
        [message]="toastMessage"
        [duration]="2000"
        position="bottom"
        [color]="toastColor"
        (didDismiss)="showToast = false">
      </ion-toast>
    </ion-content>
  `,
  styles: [`
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
    }

    .cart-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }

    .empty-cart {
      text-align: center;
      padding: 80px 20px;
    }

    .empty-icon {
      font-size: 120px;
      color: #d1d5db;
      margin-bottom: 20px;
    }

    .empty-cart h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 8px;
    }

    .empty-cart p {
      color: #6b7280;
      margin-bottom: 24px;
    }

    .cart-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .cart-item-card {
      margin: 0;
      border-radius: 12px;
    }

    .cart-item {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .item-image {
      width: 100px;
      height: 100px;
      background-size: cover;
      background-position: center;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .item-details {
      flex: 1;
    }

    .item-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
    }

    .item-price {
      color: #f59e0b;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .quantity {
      font-size: 1.125rem;
      font-weight: 600;
      min-width: 30px;
      text-align: center;
    }

    .item-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }

    .item-total {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
    }

    .summary-card {
      margin: 0;
      border-radius: 12px;
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 1rem;
    }

    .summary-row.total {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
    }

    .summary-divider {
      height: 1px;
      background: rgba(0, 0, 0, 0.1);
      margin: 12px 0;
    }

    .checkout-btn {
      margin-top: 16px;
      --box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
    }

    @media (max-width: 768px) {
      .cart-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .item-image {
        width: 100%;
        height: 200px;
      }

      .item-actions {
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  loading = true;
  showToast = false;
  toastMessage = '';
  toastColor = 'success';

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {
    addIcons({ trash, add, remove, checkmarkCircle });
  }

  async ngOnInit() {
    await this.loadCart();
  }

  async loadCart() {
    try {
      this.loading = true;
      this.cartItems = await this.supabase.getCartItems();
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      this.loading = false;
    }
  }

  async increaseQuantity(item: any) {
    try {
      await this.supabase.updateCartItem(item.id, item.quantity + 1);
      item.quantity += 1;
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }

  async decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      try {
        await this.supabase.updateCartItem(item.id, item.quantity - 1);
        item.quantity -= 1;
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    } else {
      await this.removeItem(item);
    }
  }

  async removeItem(item: any) {
    try {
      await this.supabase.removeFromCart(item.id);
      this.cartItems = this.cartItems.filter(i => i.id !== item.id);
      this.toastMessage = 'Item removed from cart';
      this.toastColor = 'warning';
      this.showToast = true;
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.products.price * item.quantity), 0);
  }

  getTax(): number {
    return this.getSubtotal() * 0.08;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  async checkout() {
    try {
      const order = await this.supabase.createOrder(this.getTotal(), this.cartItems);
      this.toastMessage = `Order ${order.order_number} placed successfully!`;
      this.toastColor = 'success';
      this.showToast = true;

      setTimeout(() => {
        this.router.navigate(['/orders']);
      }, 1500);
    } catch (error) {
      console.error('Error creating order:', error);
      this.toastMessage = 'Failed to place order';
      this.toastColor = 'danger';
      this.showToast = true;
    }
  }
}
