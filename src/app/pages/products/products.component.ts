import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSpinner, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cart, eye } from 'ionicons/icons';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-products',
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
        <ion-title>Products</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="page-container">
      <div class="products-header">
        <h1>Our Salty Snacks</h1>
        <p>Explore our delicious collection of premium salty treats</p>
      </div>

      <div *ngIf="loading" class="loading-container">
        <ion-spinner name="crescent" color="warning"></ion-spinner>
      </div>

      <div *ngIf="!loading" class="products-grid">
        <ion-card *ngFor="let product of products" class="product-card card-hover">
          <div class="product-image" [style.background-image]="'url(' + product.image_url + ')'"></div>
          <ion-card-header>
            <ion-card-title class="product-name">{{ product.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-footer">
              <span class="product-price">\₱{{ product.price }}</span>
              <div class="product-actions">
                <ion-button
                  [routerLink]="['/products', product.id]"
                  fill="outline"
                  size="small"
                  color="warning">
                  <ion-icon slot="icon-only" name="eye"></ion-icon>
                </ion-button>
                <ion-button
                  (click)="addToCart(product)"
                  size="small"
                  color="warning"
                  class="add-to-cart-btn">
                  <ion-icon slot="start" name="cart"></ion-icon>
                  Add
                </ion-button>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <ion-toast
        [isOpen]="showToast"
        [message]="toastMessage"
        [duration]="2000"
        position="bottom"
        color="success"
        (didDismiss)="showToast = false">
      </ion-toast>
    </ion-content>
  `,
  styles: [`
    .products-header {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      color: white;
    }

    .products-header h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .products-header p {
      font-size: 1.125rem;
      opacity: 0.95;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
      padding: 32px 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .product-card {
      margin: 0;
      border-radius: 12px;
      overflow: hidden;
    }

    .product-image {
      width: 100%;
      height: 200px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .product-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
    }

    .product-description {
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.5;
      margin-bottom: 16px;
      min-height: 60px;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
    }

    .product-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #f59e0b;
    }

    .product-actions {
      display: flex;
      gap: 8px;
    }

    .add-to-cart-btn {
      --box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
    }

    @media (max-width: 768px) {
      .products-grid {
        grid-template-columns: 1fr;
        padding: 20px 16px;
      }
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  loading = true;
  showToast = false;
  toastMessage = '';

  constructor(private supabase: SupabaseService) {
    addIcons({ cart, eye });
  }

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    try {
      this.loading = true;
      this.products = await this.supabase.getProducts();
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      this.loading = false;
    }
  }

  async addToCart(product: any) {
    try {
      await this.supabase.addToCart(product.id, 1);
      this.toastMessage = `${product.name} added to cart!`;
      this.showToast = true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.toastMessage = 'Failed to add to cart';
      this.showToast = true;
    }
  }
}
