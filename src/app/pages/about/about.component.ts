import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ],
  template: `
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>About</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="page-container">
      <div class="about-container">
        <div class="about-header">
          <h1>🥨 About SaltySnacks</h1>
        </div>

        <ion-card class="about-card">
          <ion-card-header>
            <ion-card-title>Our Mission</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              SaltySnacks is an e-commerce web application designed to make snack shopping fun and easy.
              We bring you the finest selection of salty treats, all in one convenient place.
            </p>
          </ion-card-content>
        </ion-card>

        <ion-card class="about-card">
          <ion-card-header>
            <ion-card-title>What We Offer</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ul class="feature-list">
              <li>
                <strong>Premium Quality Products</strong> - Six carefully selected salty snacks made with the finest ingredients
              </li>
              <li>
                <strong>Easy Shopping Experience</strong> - Browse products, view details, and add items to your cart with just a few clicks
              </li>
              <li>
                <strong>Secure Transactions</strong> - Safe and reliable order processing powered by modern technology
              </li>
              <li>
                <strong>Order History</strong> - Keep track of all your purchases and transactions
              </li>
              <li>
                <strong>Responsive Design</strong> - Optimized for both desktop and mobile devices
              </li>
            </ul>
          </ion-card-content>
        </ion-card>

        <ion-card class="about-card">
          <ion-card-header>
            <ion-card-title>Technologies Used</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ul class="tech-list">
              <li><strong>Ionic Framework</strong> - For responsive UI and cross-platform design</li>
              <li><strong>Angular</strong> - For component-based front-end logic and interactions</li>
              <li><strong>Supabase</strong> - For backend database and real-time data handling</li>
            </ul>
          </ion-card-content>
        </ion-card>

        <ion-card class="about-card highlight-card">
          <ion-card-header>
            <ion-card-title>Why Choose SaltySnacks?</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              We ensure a smooth and interactive shopping experience with clean design,
              intuitive navigation, and smooth animations. Whether you're on desktop or mobile,
              SaltySnacks delivers the same great experience.
            </p>
            <p>
              Start your snacking journey today and discover your new favorite treats!
            </p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [`
    .about-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }

    .about-header {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      border-radius: 12px;
      color: white;
      margin-bottom: 24px;
    }

    .about-header h1 {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
    }

    .about-card {
      margin-bottom: 20px;
      border-radius: 12px;
    }

    .about-card ion-card-title {
      color: #1f2937;
      font-weight: 700;
    }

    .about-card p {
      color: #4b5563;
      line-height: 1.75;
      margin-bottom: 12px;
    }

    .about-card p:last-child {
      margin-bottom: 0;
    }

    .feature-list, .tech-list {
      margin: 0;
      padding-left: 20px;
      color: #4b5563;
    }

    .feature-list li, .tech-list li {
      margin-bottom: 12px;
      line-height: 1.6;
    }

    .feature-list li:last-child, .tech-list li:last-child {
      margin-bottom: 0;
    }

    .feature-list strong, .tech-list strong {
      color: #1f2937;
    }

    .highlight-card {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    }

    .highlight-card ion-card-title {
      color: #92400e;
    }

    .highlight-card p {
      color: #78350f;
    }

    @media (max-width: 768px) {
      .about-header h1 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class AboutComponent {}
