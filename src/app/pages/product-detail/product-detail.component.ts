import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardContent, IonButton, IonIcon, IonSpinner, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cart, arrowBack } from 'ionicons/icons';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
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
          <ion-back-button defaultHref="/products"></ion-back-button>
        </ion-buttons>
        <ion-title>Product Details</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="page-container">
      <div *ngIf="loading" class="loading-container">
        <ion-spinner name="crescent" color="warning"></ion-spinner>
      </div>

      <div *ngIf="!loading && product" class="product-detail-container">
        <div class="product-image-large" [style.background-image]="'url(' + product.image_url + ')'"></div>

        <ion-card class="product-info-card">
          <ion-card-content>
            <h1 class="product-title">{{ product.name }}</h1>
            <p class="product-description-full">{{ product.description }}</p>

            <div class="product-meta">
              <div class="meta-item">
                <span class="meta-label">Price</span>
                <span class="meta-value price">\₱{{ product.price }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Stock</span>
                <span class="meta-value">{{ product.stock }} available</span>
              </div>
            </div>

            <ion-button
              (click)="addToCart()"
              expand="block"
              size="large"
              color="warning"
              class="add-to-cart-large">
              <ion-icon slot="start" name="cart"></ion-icon>
              Add to Cart
            </ion-button>
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
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
    }

    .product-detail-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }

    .product-image-large {
      width: 100%;
      height: 400px;
      background-size: cover;
      background-position: center;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .product-info-card {
      margin-top: 20px;
      border-radius: 12px;
    }

    .product-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 16px;
    }

    .product-description-full {
      font-size: 1.125rem;
      color: #6b7280;
      line-height: 1.75;
      margin-bottom: 24px;
    }

    .product-meta {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 24px;
      padding: 20px;
      background: #f3f4f6;
      border-radius: 8px;
    }

    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .meta-label {
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 500;
    }

    .meta-value {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
    }

    .meta-value.price {
      color: #f59e0b;
      font-size: 1.75rem;
    }

    .add-to-cart-large {
      --box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
      margin-top: 8px;
    }

    @media (max-width: 768px) {
      .product-image-large {
        height: 300px;
      }

      .product-title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  loading = true;
  showToast = false;
  toastMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabase: SupabaseService
  ) {
    addIcons({ cart, arrowBack });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.loadProduct(id);
    }
  }

  async loadProduct(id: string) {
    try {
      this.loading = true;
      this.product = await this.supabase.getProduct(id);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      this.loading = false;
    }
  }

  async addToCart() {
    try {
      await this.supabase.addToCart(this.product.id, 1);
      this.toastMessage = `${this.product.name} added to cart!`;
      this.showToast = true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.toastMessage = 'Failed to add to cart';
      this.showToast = true;
    }
  }
}
