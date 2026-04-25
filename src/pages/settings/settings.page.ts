import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { IonContent } from '@ionic/angular/standalone'
import { AuthService } from '../../services/auth.service'
import { AppStore } from '../../store/app.store'
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component'
import { I18nService, Lang } from '../../services/i18n.service'
import { TranslatePipe } from '../../pipes/translate.pipe'
import { ThemeService } from '../../services/theme.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, FormsModule, BottomNavComponent, TranslatePipe],
})
export class SettingsPage {
  pushNotifications = true
  dailyReminder = false

  get darkMode(): boolean { return this.theme.isDark() }
  set darkMode(val: boolean) { this.theme.toggle(val) }

  get language(): Lang { return this.i18n.lang() }
  set language(val: Lang) { this.i18n.setLang(val) }

  get username(): string { return this.store.user()?.username ?? 'User' }
  get email(): string { return '' }

  constructor(
    private auth: AuthService,
    private store: AppStore,
    private router: Router,
    readonly i18n: I18nService,
    readonly theme: ThemeService
  ) {}

  goBack(): void { this.router.navigate(['/profile']) }
  editProfile(): void {
    this.router.navigate(['/edit-profile'])
  }
  changePassword(): void {
    this.router.navigate(['/change-password'])
  }

  async logout(): Promise<void> {
    await this.auth.logout()
    this.store.setUser(null)
    await this.router.navigate(['/login'])
  }

  deleteAccount(): void {}
}
