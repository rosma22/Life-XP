import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { UserMission, CompletionResult, Mission } from '../types'
import { environment } from '../environments/environment'

const API_BASE = environment.apiUrl

@Injectable({ providedIn: 'root' })
export class MissionService {
  constructor(private http: HttpClient) {}

  getDailyMissions(): Promise<UserMission[]> {
    return firstValueFrom(
      this.http.get<UserMission[]>(`${API_BASE}/missions/daily`)
    )
  }

  completeMission(missionId: string): Promise<CompletionResult> {
    return firstValueFrom(
      this.http.post<CompletionResult>(`${API_BASE}/user-missions/complete`, { userMissionId: missionId })
    )
  }

  getAvailableMissions(): Promise<Mission[]> {
    return firstValueFrom(
      this.http.get<Mission[]>(`${API_BASE}/missions`)
    )
  }

  selectMissions(missionIds: string[]): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${API_BASE}/missions/select`, { missionIds })
    )
  }
}
