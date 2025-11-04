import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonMenuToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, basket, cart, receipt, person, informationCircle, peopleCircle } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonMenuToggle
  ],
  template: `
    <ion-app>
      <ion-split-pane contentId="main-content">
        <ion-menu contentId="main-content" type="overlay">
          <ion-header>
            <ion-toolbar color="warning">
              <ion-title>🥨 SaltySnacks</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-list lines="none" class="menu-list">
              <ion-menu-toggle autoHide="false">
                <ion-item routerLink="/home" routerLinkActive="active-item" [routerLinkActiveOptions]="{exact: true}" button detail="false" class="menu-item">
                  <ion-icon slot="start" name="home"></ion-icon>
                  <ion-label>Home</ion-label>
                </ion-item>
              </ion-menu-toggle>

              <ion-menu-toggle autoHide="false">
                <ion-item routerLink="/products" routerLinkActive="active-item" button detail="false" class="menu-item">
                  <ion-icon slot="start" name="basket"></ion-icon>
                  <ion-label>Products</ion-label>
                </ion-item>
              </ion-menu-toggle>

              <ion-menu-toggle autoHide="false">
                <ion-item routerLink="/cart" routerLinkActive="active-item" button detail="false" class="menu-item">
                  <ion-icon slot="start" name="cart"></ion-icon>
                  <ion-label>Cart</ion-label>
                </ion-item>
              </ion-menu-toggle>

              <ion-menu-toggle autoHide="false">
                <ion-item routerLink="/orders" routerLinkActive="active-item" button detail="false" class="menu-item">
                  <ion-icon slot="start" name="receipt"></ion-icon>
                  <ion-label>Orders</ion-label>
                </ion-item>
              </ion-menu-toggle>

              <ion-menu-toggle autoHide="false">
                <ion-item routerLink="/profile" routerLinkActive="active-item" button detail="false" class="menu-item">
                  <ion-icon slot="start" name="person"></ion-icon>
                  <ion-label>Profile</ion-label>
                </ion-item>
              </ion-menu-toggle>

              <div class="menu-divider"></div>

              <ion-menu-toggle autoHide="false">
                <ion-item routerLink="/about" routerLinkActive="active-item" button detail="false" class="menu-item">
                  <ion-icon slot="start" name="information-circle"></ion-icon>
                  <ion-label>About</ion-label>
                </ion-item>
              </ion-menu-toggle>

              <ion-menu-toggle autoHide="false">
                <ion-item routerLink="/developers" routerLinkActive="active-item" button detail="false" class="menu-item">
                  <ion-icon slot="start" name="people-circle"></ion-icon>
                  <ion-label>Developers</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>
          </ion-content>
        </ion-menu>

        <ion-router-outlet id="main-content"></ion-router-outlet>
      </ion-split-pane>
    </ion-app>
  `,
  styles: [`
    .menu-list {
      padding: 16px 0;
    }

    .menu-item {
      --padding-start: 20px;
      --padding-end: 20px;
      --inner-padding-end: 12px;
      margin: 4px 8px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .menu-item:hover {
      --background: rgba(var(--ion-color-warning-rgb), 0.1);
    }

    .active-item {
      --background: linear-gradient(135deg, rgba(var(--ion-color-warning-rgb), 0.2), rgba(var(--ion-color-warning-rgb), 0.3));
      font-weight: 600;
      border-left: 4px solid var(--ion-color-warning);
    }

    .menu-divider {
      height: 1px;
      background: var(--ion-color-light);
      margin: 16px 16px;
    }

    ion-icon {
      font-size: 24px;
      margin-right: 12px;
    }
  `]
})
export class AppComponent {
  constructor() {
    addIcons({ home, basket, cart, receipt, person, informationCircle, peopleCircle });
  }
}
