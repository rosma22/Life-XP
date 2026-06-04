import { Component, OnInit, computed } from '@angular/core'
import { RouterLink } from '@angular/router'
import { IonContent, IonSpinner, ToastController } from '@ionic/angular/standalone'
import { MissionService } from '../../services/mission.service'
import { ProgressService } from '../../services/progress.service'
import { AppStore } from '../../store/app.store'
import { UserMission, CompletionResult, Mission } from '../../types'
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component'
import { I18nService } from '../../services/i18n.service'
import { TranslatePipe } from '../../pipes/translate.pipe'

@Component({
  selector: 'app-missions',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
  standalone: true,
  imports: [RouterLink, IonContent, IonSpinner, BottomNavComponent, TranslatePipe],
})
export class MissionsPage implements OnInit {
  errorMessage = ''

  readonly missions = this.store.missions
  readonly loading = this.store.loading

  readonly pendingMissions = computed(() =>
    this.store.missions().filter(m => m.status === 'pending')
  )

  readonly pendingCount = computed(() =>
    this.pendingMissions().length
  )
  readonly completedCount = computed(() =>
    this.store.missions().filter(m => m.status === 'completed').length
  )

  constructor(
    private missionService: MissionService,
    private progressService: ProgressService,
    readonly store: AppStore,
    private toastCtrl: ToastController,
    readonly i18n: I18nService
  ) {}

  getMissionTitle(mission: Mission): string {
    const lang = this.i18n.lang()
    return mission.translations?.[lang]?.title ?? mission.title
  }

  getMissionDescription(mission: Mission): string {
    const lang = this.i18n.lang()
    return mission.translations?.[lang]?.description ?? mission.description
  }

  async ngOnInit(): Promise<void> {
    await Promise.all([this.loadMissions(), this.loadProfile()])
  }

  async ionViewWillEnter(): Promise<void> {
    // Primero verificar/actualizar racha
    try {
      await this.progressService.checkStreak()
    } catch {
      // Si el endpoint no existe, continuar sin error
    }
    // Luego cargar datos actualizados
    await Promise.all([this.loadMissions(), this.loadProfile()])
  }

  async loadProfile(): Promise<void> {
    try {
      const profile = await this.progressService.getUserProfile()
      this.store.setUser(profile)
    } catch { /* si falla, usa lo que hay en el store */ }
  }

  async loadMissions(): Promise<void> {
    this.store.setLoading(true)
    this.errorMessage = ''
    try {
      const missions = await this.missionService.getDailyMissions()
      this.store.setMissions(missions)
    } catch {
      this.errorMessage = 'No se pudieron cargar las misiones.'
    } finally {
      this.store.setLoading(false)
    }
  }

  async complete(mission: UserMission): Promise<void> {
    if (mission.status !== 'pending') return
    try {
      const result: CompletionResult = await this.missionService.completeMission(mission.id)
      this.store.applyCompletionResult(mission.id, result)
      await this.showRewardToast(result)
    } catch (err: any) {
      const msg =
        err?.status === 409 ? 'Misión ya completada.' :
        err?.status === 410 ? 'La misión ha expirado.' :
        'No se pudo completar la misión.'
      await this.showErrorToast(msg)
    }
  }

  statusAccentColor(status: UserMission['status']): string {
    return status === 'completed' ? '#c799ff' : status === 'expired' ? '#484847' : '#00d1ff'
  }

  categoryColor(category: string): string {
    const map: Record<string, string> = {
      fitness: '#00d1ff',
      learning: '#c799ff',
      habits: '#bef500',
      finance: '#ff6e84',
    }
    return map[category] ?? '#00d1ff'
  }

  categoryEmoji(category: string): string {
    const map: Record<string, string> = {
      fitness: '👟',
      learning: '📖',
      habits: '🌱',
      finance: '💰',
    }
    return map[category] ?? '⚡'
  }

  private async showRewardToast(result: CompletionResult): Promise<void> {
    const levelMsg = result.leveledUp ? ` ¡Subiste al nivel ${result.newLevel}!` : ''
    const toast = await this.toastCtrl.create({
      message: `+${result.xpGained} XP${levelMsg} 🔥 Racha: ${result.streak}`,
      duration: 3000,
      color: result.leveledUp ? 'warning' : 'success',
      position: 'top',
    })
    await toast.present()
  }

  private async showErrorToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color: 'danger',
      position: 'top',
    })
    await toast.present()
  }
}
