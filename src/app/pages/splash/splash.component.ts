import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [IonContent],
  template: `
    <ion-content class="splash-content">
      <div class="splash-container">
        <div class="logo-wrapper">
          <div class="pretzel-icon">🥨</div>
          <h1 class="app-name">SaltySnacks</h1>
          <p class="tagline">Snack Smart. Snack Salty.</p>
        </div>
        <div class="loading-dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .splash-content {
      --background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    }

    .splash-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      animation: fadeIn 0.6s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .logo-wrapper {
      text-align: center;
      animation: scaleIn 0.8s ease-out;
    }

    @keyframes scaleIn {
      from {
        transform: scale(0.5);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    .pretzel-icon {
      font-size: 120px;
      margin-bottom: 20px;
      animation: bounce 1s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    .app-name {
      font-size: 3rem;
      font-weight: 700;
      color: white;
      margin: 0;
      text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
      letter-spacing: 1px;
    }

    .tagline {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.95);
      margin: 12px 0 0 0;
      font-weight: 500;
      font-style: italic;
    }

    .loading-dots {
      display: flex;
      gap: 12px;
      margin-top: 40px;
    }

    .dot {
      width: 12px;
      height: 12px;
      background: white;
      border-radius: 50%;
      animation: pulse 1.4s ease-in-out infinite;
    }

    .dot:nth-child(1) {
      animation-delay: 0s;
    }

    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.5);
        opacity: 0.5;
      }
    }

    @media (max-width: 768px) {
      .pretzel-icon {
        font-size: 90px;
      }

      .app-name {
        font-size: 2.5rem;
      }

      .tagline {
        font-size: 1rem;
      }
    }
  `]
})
export class SplashComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.checkAuthAndNavigate();
  }

  private async checkAuthAndNavigate() {
    setTimeout(async () => {
      const isAuthenticated = await this.authService.checkAuthStatus();

      if (isAuthenticated) {
        this.router.navigate(['/products'], { replaceUrl: true });
      } else {
        this.router.navigate(['/home'], { replaceUrl: true });
      }
    }, 2500);
  }
}
