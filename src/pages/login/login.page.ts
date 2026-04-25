import { Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { IonContent, IonSpinner } from '@ionic/angular/standalone'
import { AuthService } from '../../services/auth.service'
import { MissionService } from '../../services/mission.service'
import { AppStore } from '../../store/app.store'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    IonContent, IonSpinner,
  ],
})
export class LoginPage {
  form: FormGroup
  errorMessage = ''
  loading = false

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private missionService: MissionService,
    private store: AppStore,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return
    this.loading = true
    this.errorMessage = ''

    const { email, password } = this.form.value
    try {
      await this.auth.login(email, password)
      this.store.setEmail(email)
    } catch (err: any) {
      if (err?.status === 401) {
        this.errorMessage = 'Email o contraseña incorrectos.'
      } else {
        this.errorMessage = 'Error al iniciar sesión. Intenta de nuevo.'
      }
      this.loading = false
      return
    }

    try {
      const missions = await this.missionService.getDailyMissions()
      console.log('[login] missions response:', missions)
      await this.router.navigate([missions.length === 0 ? '/mission-select' : '/missions'])
    } catch {
      // Si falla la consulta de misiones, ir a missions de todas formas
      await this.router.navigate(['/missions'])
    } finally {
      this.loading = false
    }
  }
}
