import { Injectable, signal, computed } from '@angular/core'
import { UserMission, UserProfile, CompletionResult } from '../types'

@Injectable({ providedIn: 'root' })
export class AppStore {
  // --- Signals ---
  private _user = signal<UserProfile | null>(null)
  private _email = signal<string>('')
  private _missions = signal<UserMission[]>([])
  private _loading = signal(false)

  // --- Selectors ---
  readonly user = this._user.asReadonly()
  readonly email = this._email.asReadonly()
  readonly missions = this._missions.asReadonly()
  readonly loading = this._loading.asReadonly()

  readonly pendingMissions = computed(() =>
    this._missions().filter(m => m.status === 'pending')
  )
  readonly completedMissions = computed(() =>
    this._missions().filter(m => m.status === 'completed')
  )

  // --- Mutations ---
  setUser(profile: UserProfile | null): void {
    this._user.set(profile)
  }

  setEmail(email: string): void {
    this._email.set(email)
  }

  setMissions(missions: UserMission[]): void {
    this._missions.set(missions)
  }

  setLoading(value: boolean): void {
    this._loading.set(value)
  }

  /** Update a single mission's status after completion, and patch user progress — no full reload needed */
  applyCompletionResult(missionId: string, result: CompletionResult): void {
    this._missions.update(list =>
      list.map(m =>
        m.id === missionId
          ? { ...m, status: 'completed' as const, completedAt: new Date().toISOString() }
          : m
      )
    )
    this._user.update(u =>
      u
        ? {
            ...u,
            level: result.newLevel,
            totalXP: result.newTotalXP,
            streak: result.streak,
          }
        : u
    )
  }
}
