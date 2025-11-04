import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSpinner, IonBadge, IonList, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { receipt, calendar, cart } from 'ionicons/icons';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-orders',
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
    IonBadge,
    IonList,
    IonItem,
    IonLabel,
    IonNote
  ],
  template: `
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Orders</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="page-container">
      <div *ngIf="loading" class="loading-container">
        <ion-spinner name="crescent" color="warning"></ion-spinner>
      </div>

      <div *ngIf="!loading" class="orders-container">
        <div *ngIf="orders.length === 0" class="empty-orders">
          <ion-icon name="receipt" class="empty-icon"></ion-icon>
          <h2>No orders yet</h2>
          <p>Start shopping to see your orders here!</p>
          <ion-button routerLink="/products" color="warning" size="large">
            Browse Products
          </ion-button>
        </div>

        <div *ngIf="orders.length > 0" class="orders-list">
          <h1 class="page-title">Your Orders</h1>

          <ion-card *ngFor="let order of orders" class="order-card card-hover">
            <ion-card-header>
              <div class="order-header">
                <div class="order-info">
                  <ion-card-title class="order-number">
                    <ion-icon name="receipt"></ion-icon>
                    {{ order.order_number }}
                  </ion-card-title>
                  <p class="order-date">
                    <ion-icon name="calendar"></ion-icon>
                    {{ formatDate(order.created_at) }}
                  </p>
                </div>
                <ion-badge [color]="getStatusColor(order.status)" class="status-badge">
                  {{ order.status }}
                </ion-badge>
              </div>
            </ion-card-header>

            <ion-card-content>
              <ion-list lines="none" class="order-items-list">
                <ion-item *ngFor="let item of order.order_items" class="order-item">
                  <ion-label>
                    <h3>{{ item.product_name }}</h3>
                    <p>Quantity: {{ item.quantity }} × \${{ item.price }}</p>
                  </ion-label>
                  <ion-note slot="end" class="item-total">
                    \${{ (item.quantity * item.price).toFixed(2) }}
                  </ion-note>
                </ion-item>
              </ion-list>

              <div class="order-total">
                <span class="total-label">Total Amount:</span>
                <span class="total-amount">\${{ order.total_amount }}</span>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
    }

    .orders-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }

    .empty-orders {
      text-align: center;
      padding: 80px 20px;
    }

    .empty-icon {
      font-size: 120px;
      color: #d1d5db;
      margin-bottom: 20px;
    }

    .empty-orders h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 8px;
    }

    .empty-orders p {
      color: #6b7280;
      margin-bottom: 24px;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 24px;
    }

    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .order-card {
      margin: 0;
      border-radius: 12px;
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .order-number {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.25rem;
      color: #1f2937;
      margin-bottom: 4px;
    }

    .order-number ion-icon {
      color: #f59e0b;
    }

    .order-date {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .order-date ion-icon {
      font-size: 16px;
    }

    .status-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .order-items-list {
      padding: 0;
      margin-bottom: 16px;
    }

    .order-item {
      --padding-start: 0;
      --padding-end: 0;
      --inner-padding-end: 0;
      margin-bottom: 12px;
    }

    .order-item h3 {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
    }

    .order-item p {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .item-total {
      font-size: 1rem;
      font-weight: 600;
      color: #1f2937;
    }

    .order-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-top: 2px solid #f3f4f6;
      margin-top: 8px;
    }

    .total-label {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
    }

    .total-amount {
      font-size: 1.5rem;
      font-weight: 700;
      color: #f59e0b;
    }

    @media (max-width: 768px) {
      .page-title {
        font-size: 1.5rem;
      }

      .order-header {
        flex-direction: column;
        gap: 12px;
      }
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;

  constructor(private supabase: SupabaseService) {
    addIcons({ receipt, calendar, cart });
  }

  async ngOnInit() {
    await this.loadOrders();
  }

  async loadOrders() {
    try {
      this.loading = true;
      this.orders = await this.supabase.getOrders();
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      this.loading = false;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'medium';
    }
  }
}
