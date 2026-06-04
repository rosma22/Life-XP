import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { UserProfile, UserProgress, AchievementsResponse } from '../types'
import { environment } from '../environments/environment'

const API_BASE = environment.apiUrl

@Injectable({ providedIn: 'root' })
export class ProgressService {
  constructor(private http: HttpClient) {}

  getUserProfile(): Promise<UserProfile> {
    return firstValueFrom(this.http.get<UserProfile>(`${API_BASE}/users/profile`))
  }

  getUserProgress(): Promise<UserProgress> {
    return firstValueFrom(this.http.get<UserProgress>(`${API_BASE}/users/progress`))
  }

  getUserAchievements(): Promise<AchievementsResponse> {
    return firstValueFrom(this.http.get<AchievementsResponse>(`${API_BASE}/users/achievements`))
  }

  checkStreak(): Promise<{ streak: number; updated: boolean }> {
    return firstValueFrom(this.http.post<{ streak: number; updated: boolean }>(`${API_BASE}/users/check-streak`, {}))
  }
}
