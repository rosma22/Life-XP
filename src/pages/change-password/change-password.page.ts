import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { IonContent, IonSpinner } from '@ionic/angular/standalone'
import { TranslatePipe } from '../../pipes/translate.pipe'
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component'
import { I18nService } from '../../services/i18n.service'
import { AuthService } from '../../services/auth.service'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'

const API_BASE = 'http://localhost:3000'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [IonContent, IonSpinner, FormsModule, TranslatePipe, BottomNavComponent],
})
export class ChangePasswordPage {
  currentPassword = ''
  newPassword = ''
  confirmPassword = ''

  showCurrent = false
  showNew = false
  showConfirm = false

  saving = false
  successMsg = ''
  errorMsg = ''

  get confirmMismatch(): boolean {
    return this.confirmPassword.length > 0 && this.confirmPassword !== this.newPassword
  }

  get canSave(): boolean {
    return (
      this.currentPassword.length >= 6 &&
      this.newPassword.length >= 6 &&
      this.newPassword === this.confirmPassword
    )
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private http: HttpClient,
    readonly i18n: I18nService
  ) {}

  goBack(): void {
    this.router.navigate(['/settings'])
  }

  async save(): Promise<void> {
    if (!this.canSave) return
    this.saving = true
    this.successMsg = ''
    this.errorMsg = ''
    try {
      const token = await this.auth.getToken()
      await firstValueFrom(
        this.http.patch(
          `${API_BASE}/users/password`,
          { currentPassword: this.currentPassword, newPassword: this.newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      )
      this.successMsg = this.i18n.t('pwd.success')
      this.currentPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    } catch (err: any) {
      if (err?.status === 401) {
        this.errorMsg = this.i18n.t('pwd.error_wrong')
      } else {
        this.errorMsg = this.i18n.t('pwd.error_generic')
      }
    } finally {
      this.saving = false
    }
  }
}
