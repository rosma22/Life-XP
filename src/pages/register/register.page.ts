import { Component } from '@angular/core'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { IonContent, IonSpinner } from '@ionic/angular/standalone'
import { AuthService } from '../../services/auth.service'
import { AppStore } from '../../store/app.store'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, IonContent, IonSpinner],
})
export class RegisterPage {
  form: FormGroup
  errorMessage = ''
  loading = false

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: AppStore,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return
    this.loading = true
    this.errorMessage = ''

    const { email, password, username } = this.form.value
    try {
      await this.auth.register(email, password, username)
      this.store.setEmail(email)
      await this.router.navigate(['/mission-select'])
    } catch (err: any) {
      if (err?.status === 409) {
        this.errorMessage = 'Ya existe una cuenta con ese email.'
      } else {
        this.errorMessage = 'Error al registrarse. Intenta de nuevo.'
      }
    } finally {
      this.loading = false
    }
  }
}
