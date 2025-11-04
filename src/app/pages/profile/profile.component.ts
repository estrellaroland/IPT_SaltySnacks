import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonNote, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person, cart, receipt, calendar } from 'ionicons/icons';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
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
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonIcon
  ],
  template: `
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="page-container">
      <div class="profile-container">
        <div class="profile-header">
          <div class="avatar">
            <ion-icon name="person"></ion-icon>
          </div>
          <h1>Guest User</h1>
          <p class="session-id">Session: {{ sessionId }}</p>
        </div>

        <ion-card class="stats-card">
          <ion-card-header>
            <ion-card-title>Shopping Statistics</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list lines="none">
              <ion-item>
                <ion-icon slot="start" name="receipt" color="warning"></ion-icon>
                <ion-label>
                  <h2>Total Orders</h2>
                </ion-label>
                <ion-note slot="end" class="stat-value">{{ orderCount }}</ion-note>
              </ion-item>

              <ion-item>
                <ion-icon slot="start" name="cart" color="warning"></ion-icon>
                <ion-label>
                  <h2>Items in Cart</h2>
                </ion-label>
                <ion-note slot="end" class="stat-value">{{ cartItemCount }}</ion-note>
              </ion-item>

              <ion-item>
                <ion-icon slot="start" name="calendar" color="warning"></ion-icon>
                <ion-label>
                  <h2>Member Since</h2>
                </ion-label>
                <ion-note slot="end" class="stat-value">{{ memberSince }}</ion-note>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <ion-card class="info-card">
          <ion-card-header>
            <ion-card-title>Account Information</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p class="info-text">
              You are currently shopping as a guest. Your cart and order history are saved using your session ID.
            </p>
            <p class="info-text">
              This allows you to enjoy all features of SaltySnacks without creating an account!
            </p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [`
    .profile-container {
      max-width: 700px;
      margin: 0 auto;
      padding: 20px;
    }

    .profile-header {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      border-radius: 12px;
      color: white;
      margin-bottom: 24px;
    }

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }

    .avatar ion-icon {
      font-size: 60px;
      color: white;
    }

    .profile-header h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .session-id {
      font-size: 0.875rem;
      opacity: 0.9;
      font-family: monospace;
    }

    .stats-card {
      margin-bottom: 20px;
      border-radius: 12px;
    }

    .stats-card ion-item {
      --padding-start: 0;
      --padding-end: 0;
      --inner-padding-end: 0;
      margin-bottom: 16px;
    }

    .stats-card h2 {
      font-weight: 600;
      color: #1f2937;
    }

    .stat-value {
      font-size: 1.25rem;
      font-weight: 700;
      color: #f59e0b;
    }

    .info-card {
      border-radius: 12px;
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    }

    .info-text {
      color: #1f2937;
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .info-text:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      .profile-header h1 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  sessionId: string = '';
  orderCount: number = 0;
  cartItemCount: number = 0;
  memberSince: string = '';

  constructor(private supabase: SupabaseService) {
    addIcons({ person, cart, receipt, calendar });
  }

  async ngOnInit() {
    this.sessionId = this.supabase.getSessionId();
    this.memberSince = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    await this.loadStats();
  }

  async loadStats() {
    try {
      const orders = await this.supabase.getOrders();
      this.orderCount = orders.length;

      const cartItems = await this.supabase.getCartItems();
      this.cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }
}
