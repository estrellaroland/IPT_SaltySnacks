import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person, code, colorPalette } from 'ionicons/icons';

@Component({
  selector: 'app-developers',
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
    IonCardContent,
    IonIcon
  ],
  template: `
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Developers</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="page-container">
      <div class="developers-container">
        <div class="developers-header">
          <h1>Meet the Team</h1>
          <p>The talented individuals behind SaltySnacks</p>
        </div>

        <div class="developers-grid">
          <ion-card class="developer-card card-hover">
            <div class="developer-avatar">
              <ion-icon name="person"></ion-icon>
            </div>
            <ion-card-header>
              <ion-card-title>Roland Angelo Estrella</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class="role">
                <ion-icon name="color-palette"></ion-icon>
                <span>Developer / UI Designer</span>
              </div>
              <p class="bio">
                Responsible for crafting the beautiful and intuitive user interface that makes
                SaltySnacks a pleasure to use. Roland focused on creating a responsive,
                modern design with smooth animations and excellent user experience.
              </p>
              <div class="skills">
                <span class="skill-badge">UI Design</span>
                <span class="skill-badge">Angular</span>
                <span class="skill-badge">Ionic</span>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="developer-card card-hover">
            <div class="developer-avatar">
              <ion-icon name="person"></ion-icon>
            </div>
            <ion-card-header>
              <ion-card-title>Sean Trinidad</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class="role">
                <ion-icon name="code"></ion-icon>
                <span>Developer / Backend Integration</span>
              </div>
              <p class="bio">
                Specialized in backend integration and database management. Sean implemented
                the Supabase integration, handling all data operations for products, cart,
                and order management to ensure reliable and efficient data flow.
              </p>
              <div class="skills">
                <span class="skill-badge">Supabase</span>
                <span class="skill-badge">Backend</span>
                <span class="skill-badge">Database</span>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <ion-card class="team-card">
          <ion-card-header>
            <ion-card-title>Project Overview</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              This e-commerce application was developed as a collaborative project to demonstrate
              proficiency in modern web technologies. The team worked together to create a fully
              functional shopping experience with features including:
            </p>
            <ul>
              <li>Product catalog with detailed views</li>
              <li>Shopping cart with quantity management</li>
              <li>Order processing and transaction history</li>
              <li>Responsive design for all devices</li>
              <li>Smooth animations and transitions</li>
            </ul>
          </ion-card-content>
        </ion-card>

        <ion-card class="contact-card">
          <ion-card-header>
            <ion-card-title>Get In Touch</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              Interested in learning more about this project or discussing potential collaborations?
              Feel free to reach out to the development team!
            </p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [`
    .developers-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .developers-header {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      border-radius: 12px;
      color: white;
      margin-bottom: 32px;
    }

    .developers-header h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .developers-header p {
      font-size: 1.125rem;
      opacity: 0.95;
    }

    .developers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .developer-card {
      margin: 0;
      border-radius: 12px;
      text-align: center;
    }

    .developer-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 24px auto 20px;
    }

    .developer-avatar ion-icon {
      font-size: 70px;
      color: white;
    }

    .developer-card ion-card-title {
      color: #1f2937;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .role {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #f59e0b;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .role ion-icon {
      font-size: 20px;
    }

    .bio {
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 16px;
      text-align: left;
    }

    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      margin-top: 16px;
    }

    .skill-badge {
      padding: 6px 12px;
      background: #fef3c7;
      color: #92400e;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .team-card {
      margin-bottom: 20px;
      border-radius: 12px;
    }

    .team-card ion-card-title {
      color: #1f2937;
    }

    .team-card p, .team-card ul {
      color: #4b5563;
      line-height: 1.75;
    }

    .team-card ul {
      margin: 12px 0 0 0;
      padding-left: 20px;
    }

    .team-card li {
      margin-bottom: 8px;
    }

    .contact-card {
      border-radius: 12px;
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    }

    .contact-card ion-card-title {
      color: #92400e;
    }

    .contact-card p {
      color: #78350f;
      line-height: 1.75;
    }

    @media (max-width: 768px) {
      .developers-header h1 {
        font-size: 1.5rem;
      }

      .developers-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DevelopersComponent {
  constructor() {
    addIcons({ person, code, colorPalette });
  }
}
