import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonButton, IonInput, IonIcon, IonSpinner, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logIn, arrowForward } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonInput,
    IonIcon,
    IonSpinner,
    IonToast
  ],
  template: `
    <ion-header>
      <ion-toolbar color="warning">
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="auth-content">
      <div class="auth-container">
        <div class="auth-header">
          <h1>🥨 SaltySnacks</h1>
          <p>Sign in to your account</p>
        </div>

        <ion-card class="auth-card">
          <ion-card-content>
            <form (ngSubmit)="login()" #loginForm="ngForm">
              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <ion-input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  [(ngModel)]="email"
                  name="email"
                  required
                  [disabled]="loading"
                  class="form-input">
                </ion-input>
              </div>

              <div class="form-group">
                <label for="password" class="form-label">Password</label>
                <ion-input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  [(ngModel)]="password"
                  name="password"
                  required
                  [disabled]="loading"
                  class="form-input">
                </ion-input>
              </div>

              <ion-button
                expand="block"
                color="warning"
                type="submit"
                [disabled]="loading || !loginForm.valid"
                class="submit-button">
                <ion-icon *ngIf="!loading" slot="start" name="log-in"></ion-icon>
                <ion-spinner *ngIf="loading" name="crescent" slot="start"></ion-spinner>
                {{ loading ? 'Signing in...' : 'Sign In' }}
              </ion-button>
            </form>

            <div class="divider"></div>

            <p class="auth-link">
              Don't have an account?
              <a routerLink="/register" class="link">Sign up here</a>
            </p>
          </ion-card-content>
        </ion-card>

        <p class="demo-hint">Demo: Use any email with password 'password123'</p>
      </div>

      <ion-toast
        [isOpen]="showToast"
        [message]="toastMessage"
        [duration]="3000"
        position="bottom"
        color="danger"
        (didDismiss)="showToast = false">
      </ion-toast>
    </ion-content>
  `,
  styles: [`
    .auth-content {
      --background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    }

    .auth-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    .auth-header {
      text-align: center;
      color: white;
      margin-bottom: 32px;
    }

    .auth-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .auth-header p {
      font-size: 1.125rem;
      margin: 8px 0 0 0;
      opacity: 0.9;
    }

    .auth-card {
      width: 100%;
      max-width: 400px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 8px;
    }

    .form-input {
      --padding-start: 12px;
      --padding-end: 12px;
      --padding-top: 12px;
      --padding-bottom: 12px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .form-input:focus {
      --border-color: #f59e0b;
    }

    .submit-button {
      margin-top: 8px;
      --box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
    }

    .divider {
      height: 1px;
      background: #e5e7eb;
      margin: 24px 0;
    }

    .auth-link {
      text-align: center;
      color: #6b7280;
      font-size: 0.875rem;
      margin: 0;
    }

    .link {
      color: #f59e0b;
      text-decoration: none;
      font-weight: 600;
      transition: opacity 0.3s ease;
    }

    .link:hover {
      opacity: 0.8;
    }

    .demo-hint {
      text-align: center;
      color: white;
      font-size: 0.875rem;
      margin-top: 24px;
      opacity: 0.8;
    }

    @media (max-width: 480px) {
      .auth-header h1 {
        font-size: 2rem;
      }

      .auth-card {
        max-width: 100%;
      }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  showToast = false;
  toastMessage = '';
  returnUrl: string = '/home';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ logIn, arrowForward });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  async login() {
    if (!this.email || !this.password) {
      this.toastMessage = 'Please enter email and password';
      this.showToast = true;
      return;
    }

    this.loading = true;

    const { user, error } = await this.authService.signIn(this.email, this.password);

    if (error) {
      this.toastMessage = error;
      this.showToast = true;
      this.loading = false;
    } else if (user) {
      setTimeout(() => {
        this.router.navigateByUrl(this.returnUrl);
      }, 500);
    }
  }
}
