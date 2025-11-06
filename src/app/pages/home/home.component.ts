import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { basket, cart, arrowForward } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
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
    IonIcon
  ],
  template: `
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>🥨 SaltySnacks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="page-container">
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Welcome to SaltySnacks!</h1>
          <p class="hero-subtitle">Your favorite salty treats, delivered to your door</p>
          <ion-button routerLink="/products" size="large" color="warning" class="hero-button">
            <ion-icon slot="start" name="basket"></ion-icon>
            Browse Products
            <ion-icon slot="end" name="arrow-forward"></ion-icon>
          </ion-button>
        </div>
      </div>

      <div class="features-section">
        <ion-card class="feature-card card-hover">
          <ion-card-header>
            <ion-card-title>🍿 Premium Quality</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            All our snacks are made with the finest ingredients for maximum crunch and flavor.
          </ion-card-content>
        </ion-card>

        

        <ion-card class="feature-card card-hover">
          <ion-card-header>
            <ion-card-title>💯 Best Prices</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Enjoy competitive prices on all your favorite salty snacks and treats.
          </ion-card-content>
        </ion-card>
      </div>

      <div class="cta-section">
        <h2>Ready to snack?</h2>
        <p>Browse our selection of delicious salty treats</p>
        <ion-button routerLink="/products" color="warning" size="large">
          <ion-icon slot="start" name="cart"></ion-icon>
          Shop Now
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      padding: 60px 20px;
      text-align: center;
      color: white;
    }

    .hero-content {
      max-width: 600px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 16px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 32px;
      opacity: 0.95;
    }

    .hero-button {
      --box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }

    .features-section {
      padding: 40px 20px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .feature-card {
      margin: 0;
      border-radius: 12px;
    }

    .feature-card ion-card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #f59e0b;
    }

    .cta-section {
      background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
      padding: 60px 20px;
      text-align: center;
    }

    .cta-section h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 12px;
      color: #1f2937;
    }

    .cta-section p {
      font-size: 1.125rem;
      color: #6b7280;
      margin-bottom: 24px;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }
    }
  `]
})
export class HomeComponent {
  constructor() {
    addIcons({ basket, cart, arrowForward });
  }
}
