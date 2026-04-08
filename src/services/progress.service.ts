import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { UserProfile, UserProgress } from '../types'

const API_BASE = 'http://localhost:3000'

@Injectable({ providedIn: 'root' })
export class ProgressService {
  constructor(private http: HttpClient) {}

  getUserProfile(): Promise<UserProfile> {
    return firstValueFrom(this.http.get<UserProfile>(`${API_BASE}/users/profile`))
  }

  getUserProgress(): Promise<UserProgress> {
    return firstValueFrom(this.http.get<UserProgress>(`${API_BASE}/users/progress`))
  }
}
