import { Component, inject } from '@angular/core'
import { RouterLink, RouterLinkActive, Router } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="bottom-nav">
      <a routerLink="/mission-select" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-item" #dash="routerLinkActive">
        <div class="nav-pill" [class.pill-active]="dash.isActive">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            [attr.fill]="dash.isActive ? '#97a9ff' : '#555'">
            <path d="M3 3h8v8H3zm0 10h8v8H3zM13 3h8v8h-8zm0 10h8v8h-8z"/>
          </svg>
        </div>
      </a>

      <a routerLink="/missions" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-item" #missions="routerLinkActive">
        <div class="nav-pill" [class.pill-active]="isMissionsActive()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"
            [attr.fill]="isMissionsActive() ? '#97a9ff' : '#555'">
            <path d="M461.81 53.81a4.4 4.4 0 00-3.3-3.39c-54.38-13.3-180 34.09-248.13 102.17a294.9 294.9 0 00-33.09 39.08c-21-1.9-42-.3-59.88 7.5-50.49 22.2-65.18 80.18-69.28 105.07a9 9 0 009.8 10.4l81.07-8.9a180.29 180.29 0 001.1 18.3 18.15 18.15 0 005.3 11.09l31.39 31.39a18.15 18.15 0 0011.1 5.3 179.91 179.91 0 0018.19 1.1l-8.89 81a9 9 0 0010.39 9.79c24.9-4 83-18.69 105.07-69.17 7.8-17.9 9.4-38.79 7.6-59.69a293.91 293.91 0 0039.19-33.09c68.38-68 115.47-190.86 102.37-247.95zM298.66 213.67a42.7 42.7 0 1160.38 0 42.65 42.65 0 01-60.38 0z"/>
            <path d="M109.64 352a45.06 45.06 0 00-26.35 12.84C65.67 382.52 64 448 64 448s65.52-1.67 83.15-19.31A44.73 44.73 0 00160 402.32a16 16 0 00-16-15.87 16.67 16.67 0 00-1.63.09 224.76 224.76 0 01-32.73-34.54z"/>
          </svg>
        </div>
      </a>

      <a routerLink="/rankings" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-item" #rankings="routerLinkActive">
        <div class="nav-pill" [class.pill-active]="rankings.isActive">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            [attr.fill]="rankings.isActive ? '#97a9ff' : '#555'">
            <path d="M12 2a7 7 0 1 0 0 14A7 7 0 0 0 12 2zm0 12.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-9.5L13.5 9l3 .5-2.2 2.1.5 3L12 13l-2.8 1.6.5-3L7.5 9.5 10.5 9 12 5z"/>
            <path d="M9 15.5v5.8l3-1.8 3 1.8V15.5a8.1 8.1 0 0 1-6 0z"/>
          </svg>
        </div>
      </a>

      <a routerLink="/profile" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-item" #profile="routerLinkActive">
        <div class="nav-pill" [class.pill-active]="profile.isActive">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            [attr.fill]="profile.isActive ? '#97a9ff' : '#555'">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </div>
      </a>
    </nav>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&display=swap');

    .bottom-nav {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 14px 16px 32px;
      background: var(--nav-bg, rgba(14, 14, 14, 0.85));
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-top: 1px solid var(--nav-border, rgba(255,255,255,0.06));
      border-radius: 28px 28px 0 0;
      box-shadow: 0 -20px 40px rgba(0,0,0,0.6);
    }

    .nav-item {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      flex: 1;
    }

    .nav-pill {
      width: 48px; 
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s ease;
    }

    .pill-active {
      background: linear-gradient(135deg, rgba(151,169,255,0.2), rgba(199,153,255,0.15));
      box-shadow: 0 0 16px rgba(151,169,255,0.2);
    }

    svg {
      transition: fill 0.25s ease;
    }
  `]
})
export class BottomNavComponent {
  private router = inject(Router)

  isMissionsActive(): boolean {
    return this.router.url === '/missions'
  }
}
