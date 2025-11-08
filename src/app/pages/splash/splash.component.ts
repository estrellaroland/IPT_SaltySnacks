import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface Slide {
  emoji: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule, IonContent],
  template: `
    <ion-content class="splash-content">
      <div class="slides-container">
        <div class="slide-wrapper" [@slideAnimation]="currentSlideIndex">
          <div class="slide-container">
            <div class="emoji-large">{{ slides[currentSlideIndex].emoji }}</div>
            <h2 class="slide-title">{{ slides[currentSlideIndex].title }}</h2>
            <p class="slide-description">{{ slides[currentSlideIndex].description }}</p>
            <div *ngIf="currentSlideIndex === slides.length - 1" class="button-group">
              <button class="get-started-btn" (click)="onGetStarted()">Get Started</button>
            </div>
          </div>
        </div>

        <div class="dots-container">
          <button
            *ngFor="let slide of slides; let i = index"
            class="dot"
            [class.active]="i === currentSlideIndex"
            (click)="goToSlide(i)">
          </button>
        </div>

        <div class="nav-buttons">
          <button
            *ngIf="currentSlideIndex > 0"
            class="nav-btn prev-btn"
            (click)="previousSlide()">
            ‹
          </button>
          <button
            *ngIf="currentSlideIndex < slides.length - 1"
            class="nav-btn next-btn"
            (click)="nextSlide()">
            ›
          </button>
        </div>
      </div>

      <div class="skip-button">
        <button (click)="onSkip()">Skip</button>
      </div>
    </ion-content>
  `,
  styles: [`
    .splash-content {
      --background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    }

    .slides-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      position: relative;
    }

    .slide-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: slideInUp 0.6s ease-out;
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .slide-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 20px;
      max-width: 500px;
    }

    .emoji-large {
      font-size: 120px;
      margin-bottom: 30px;
      animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    .slide-title {
      font-size: 2rem;
      font-weight: 700;
      color: white;
      margin: 0 0 20px 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      letter-spacing: 0.5px;
    }

    .slide-description {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.95);
      margin: 0;
      line-height: 1.6;
      max-width: 300px;
    }

    .button-group {
      margin-top: 40px;
    }

    .get-started-btn {
      padding: 14px 40px;
      background: white;
      color: #f59e0b;
      border: none;
      border-radius: 30px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }

    .get-started-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }

    .get-started-btn:active {
      transform: translateY(0);
    }

    .dots-container {
      display: flex;
      gap: 12px;
      margin-top: 40px;
      position: absolute;
      bottom: 80px;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .dot.active {
      background: white;
      transform: scale(1.2);
    }

    .nav-buttons {
      display: flex;
      gap: 16px;
      position: absolute;
      bottom: 40px;
    }

    .nav-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid white;
      color: white;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .nav-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
    }

    .skip-button {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 10;
    }

    .skip-button button {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid white;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .skip-button button:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 768px) {
      .emoji-large {
        font-size: 90px;
        margin-bottom: 20px;
      }

      .slide-title {
        font-size: 1.6rem;
      }

      .slide-description {
        font-size: 1rem;
        max-width: 280px;
      }

      .slide-container {
        padding: 30px 15px;
      }

      .dots-container {
        bottom: 120px;
      }

      .nav-buttons {
        bottom: 70px;
      }

      .nav-btn {
        width: 45px;
        height: 45px;
        font-size: 20px;
      }
    }
  `]
})
export class SplashComponent implements OnInit {
  currentSlideIndex = 0;
  slides: Slide[] = [
    {
      emoji: '🛒',
      title: 'Shop Snacks Easily',
      description: 'Browse our delicious selection of premium snacks and find your favorites in seconds.'
    },
    {
      emoji: '⚡',
      title: 'Fast & Secure Checkout',
      description: 'Complete your purchase with our quick and secure checkout process. Your safety is our priority.'
    },
    {
      emoji: '🥨',
      title: 'Snack Smart, Snack Salty',
      description: 'Enjoy premium quality snacks delivered right to your door. Start your salty journey today!'
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkIfSplashShown();
  }

  private checkIfSplashShown() {
    const splashShown = localStorage.getItem('splashShown');
    if (splashShown === 'true') {
      this.navigateToAppropriate();
    }
  }

  onGetStarted() {
    localStorage.setItem('splashShown', 'true');
    this.navigateToAppropriate();
  }

  onSkip() {
    localStorage.setItem('splashShown', 'true');
    this.navigateToAppropriate();
  }

  nextSlide() {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex++;
    }
  }

  previousSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    }
  }

  goToSlide(index: number) {
    this.currentSlideIndex = index;
  }

  private async navigateToAppropriate() {
    const isAuthenticated = await this.authService.checkAuthStatus();

    if (isAuthenticated) {
      this.router.navigate(['/products'], { replaceUrl: true });
    } else {
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }
}
