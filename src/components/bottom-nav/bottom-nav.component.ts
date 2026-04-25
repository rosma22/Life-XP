import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav">
      <a routerLink="/missions" routerLinkActive class="nav-item" #dash="routerLinkActive">
        <div class="nav-pill" [class.pill-active]="dash.isActive">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
            [attr.fill]="dash.isActive ? '#97a9ff' : '#555'">
            <path d="M3 3h8v8H3zm0 10h8v8H3zM13 3h8v8h-8zm0 10h8v8h-8z"/>
          </svg>
        </div>
      </a>

      <a routerLink="/missions" routerLinkActive class="nav-item" #missions="routerLinkActive">
        <div class="nav-pill pill-center" [class.pill-glow]="missions.isActive">
          <span class="nav-icon-lg">🚀</span>
        </div>
      </a>

      <a routerLink="/rankings" routerLinkActive class="nav-item" #rankings="routerLinkActive">
        <div class="nav-pill" [class.pill-active]="rankings.isActive">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
            [attr.fill]="rankings.isActive ? '#c799ff' : '#555'">
            <path d="M12 2a7 7 0 1 0 0 14A7 7 0 0 0 12 2zm0 12.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-9.5L13.5 9l3 .5-2.2 2.1.5 3L12 13l-2.8 1.6.5-3L7.5 9.5 10.5 9 12 5z"/>
            <path d="M9 15.5v5.8l3-1.8 3 1.8V15.5a8.1 8.1 0 0 1-6 0z"/>
          </svg>
        </div>
      </a>

      <a routerLink="/profile" routerLinkActive class="nav-item" #profile="routerLinkActive">
        <div class="nav-pill" [class.pill-active]="profile.isActive">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
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
      width: 48px; height: 48px;
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

    /* Center missions pill */
    .pill-center {
      width: 60px; height: 60px;
      border-radius: 20px;
      background: linear-gradient(135deg, #bef500 0%, #97a9ff 100%);
      box-shadow: 0 0 24px rgba(190, 245, 0, 0.45);
      transition: all 0.25s ease;
    }

    .pill-glow {
      box-shadow: 0 0 32px rgba(190, 245, 0, 0.65), 0 6px 20px rgba(151, 169, 255, 0.4);
      transform: translateY(-3px);
    }

    .nav-icon-lg {
      font-size: 26px;
    }
  `]
})
export class BottomNavComponent {}
