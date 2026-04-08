import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { IonContent, IonSpinner } from '@ionic/angular/standalone'
import { AppStore } from '../../store/app.store'
import { I18nService } from '../../services/i18n.service'
import { TranslatePipe } from '../../pipes/translate.pipe'
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component'
import { ProgressService } from '../../services/progress.service'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonSpinner, FormsModule, TranslatePipe, BottomNavComponent],
})
export class EditProfilePage implements OnInit {
  username = ''
  email = ''
  bio = ''
  saving = false
  loading = true
  successMsg = ''
  errorMsg = ''

  constructor(
    private store: AppStore,
    private router: Router,
    private progressService: ProgressService,
    private auth: AuthService,
    readonly i18n: I18nService
  ) {}

  async ngOnInit(): Promise<void> {
    // Intentar desde el store primero
    const cached = this.store.user()
    if (cached) {
      this.username = cached.username ?? ''
      this.email = this.store.email()
    }

    // Siempre refrescar desde el backend para tener datos actualizados
    try {
      const profile = await this.progressService.getUserProfile()
      this.username = profile.username ?? ''
      this.store.setUser(profile)

      // Si el email no está en el store, leerlo desde Preferences
      if (!this.email) {
        this.email = await this.auth.getStoredEmail()
        if (this.email) this.store.setEmail(this.email)
      }
    } catch {
      // Si falla, usar lo que hay en el store
    } finally {
      this.loading = false
    }
  }

  goBack(): void {
    this.router.navigate(['/settings'])
  }

  async save(): Promise<void> {
    this.saving = true
    this.successMsg = ''
    this.errorMsg = ''
    try {
      // TODO: llamar al endpoint PUT /users/profile cuando esté disponible
      await new Promise(r => setTimeout(r, 800))
      // Actualizar el store con el nuevo username
      const current = this.store.user()
      if (current) {
        this.store.setUser({ ...current, username: this.username })
      }
      this.successMsg = this.i18n.t('edit.success')
    } catch {
      this.errorMsg = this.i18n.t('edit.error')
    } finally {
      this.saving = false
    }
  }
}
