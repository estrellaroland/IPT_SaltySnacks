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
                <img src="https://i.ibb.co/27GkMfJ7/image.png" alt="Roland Angelo Estrella" />
              <ion-icon name="person"></ion-icon>
            </div>
            <ion-card-header>
              <ion-card-title>Roland Angelo Estrella</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class="role">
                <ion-icon name="color-palette"></ion-icon>
                <span>Developer / UI Designer / Backend Integration</span>
              </div>
              <p class="bio">
                
              </p>
              <div class="skills">
                <span class="skill-badge">UI Design</span>
                <span class="skill-badge">Angular</span>
                <span class="skill-badge">Ionic</span>
                <span class="skill-badge">Frontend</span>
                <span class="skill-badge">Backend</span>
                <span class="skill-badge">Database</span>
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
                <span>Developer</span>
              </div>
              <p class="bio">
              
              </p>
              <div class="skills">
                
                <span class="skill-badge">Backend</span>
                
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <ion-card class="team-card">
          <ion-card-header>
            <ion-card-title></ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              
            </p>
            <ul>
              
            </ul>
          </ion-card-content>
        </ion-card>

        <ion-card class="contact-card">
          <ion-card-header>
            <ion-card-title></ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}

.developer-avatar img {
  width: 100px;       /* adjust size as you like */
  height: 100px;
  border-radius: 50%; /* makes it circular */
  object-fit: cover;  /* keeps proportions nice */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
