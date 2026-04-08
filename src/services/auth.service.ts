import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Preferences } from '@capacitor/preferences'
import { firstValueFrom } from 'rxjs'

const JWT_KEY = 'auth_token'
const API_BASE = 'http://localhost:3000'

export interface AuthResult {
  token: string
  user: { id: string; email: string; username: string }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  async register(email: string, password: string, username: string): Promise<AuthResult> {
    const result = await firstValueFrom(
      this.http.post<AuthResult>(`${API_BASE}/auth/register`, { email, password, username })
    )
    await this.storeToken(result.token)
    await Preferences.set({ key: 'auth_email', value: result.user.email ?? email })
    return result
  }

  async login(email: string, password: string): Promise<AuthResult> {
    const result = await firstValueFrom(
      this.http.post<AuthResult>(`${API_BASE}/auth/login`, { email, password })
    )
    await this.storeToken(result.token)
    // Guardar email junto al token
    await Preferences.set({ key: 'auth_email', value: result.user.email ?? email })
    return result
  }

  async getStoredEmail(): Promise<string> {
    const { value } = await Preferences.get({ key: 'auth_email' })
    return value ?? ''
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: JWT_KEY })
    await Preferences.remove({ key: 'auth_email' })
  }

  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: JWT_KEY })
    return value
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken()
    return token !== null
  }

  private async storeToken(token: string): Promise<void> {
    await Preferences.set({ key: JWT_KEY, value: token })
  }
}
