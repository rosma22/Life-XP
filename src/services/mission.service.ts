import { Injectable } from '@angular/core'
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable, from, switchMap } from 'rxjs'
import { firstValueFrom } from 'rxjs'
import { AuthService } from './auth.service'
import { UserMission, CompletionResult, Mission } from '../types'

const API_BASE = 'http://localhost:3000'

// JWT interceptor — attaches Authorization header to every outgoing request
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.auth.getToken()).pipe(
      switchMap(token => {
        if (token) {
          req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        }
        return next.handle(req)
      })
    )
  }
}

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
