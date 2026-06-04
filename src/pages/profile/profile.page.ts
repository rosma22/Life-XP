import { Component, OnInit } from '@angular/core'
import { RouterLink, Router } from '@angular/router'
import { IonContent, IonSpinner } from '@ionic/angular/standalone'
import { ProgressService } from '../../services/progress.service'
import { AppStore } from '../../store/app.store'
import { UserProfile, UserProgress, Achievement } from '../../types'
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component'
import { I18nService } from '../../services/i18n.service'
import { TranslatePipe } from '../../pipes/translate.pipe'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [RouterLink, IonContent, IonSpinner, BottomNavComponent, TranslatePipe],
})
export class ProfilePage implements OnInit {
  profile: UserProfile | null = null
  progress: UserProgress | null = null
  badges: Achievement[] = []
  loading = true
  errorMessage = ''

  recentActivity = [
    { icon: '🚀', title: 'Mission Accomplished: Strategic Plan', time: 'Today • 2:45 PM', xp: 120, color: '#c799ff' },
    { icon: '📊', title: 'Weekly Insight Summary Available',     time: 'Yesterday • 11:30 AM', xp: 50, color: '#97a9ff' },
  ]

  weekBars = [
    { day: 'M', height: 40,  active: false },
    { day: 'T', height: 65,  active: false },
    { day: 'W', height: 90,  active: true  },
    { day: 'T', height: 30,  active: false },
    { day: 'F', height: 55,  active: false },
    { day: 'S', height: 80,  active: false },
    { day: 'S', height: 20,  active: false },
  ]

  constructor(
    private progressService: ProgressService,
    private store: AppStore,
    private router: Router,
    readonly i18n: I18nService
  ) {}

  goToSettings(): void {
    this.router.navigate(['/settings'])
  }

  async ngOnInit(): Promise<void> {
    try {
      const [profile, progress, achievementsData] = await Promise.all([
        this.progressService.getUserProfile(),
        this.progressService.getUserProgress(),
        this.progressService.getUserAchievements(),
      ])
      this.profile = profile
      this.progress = progress
      this.badges = achievementsData.achievements
      this.store.setUser(profile)
    } catch {
      this.errorMessage = 'No se pudo cargar el perfil.'
    } finally {
      this.loading = false
    }
  }

  getAchievementName(achievement: Achievement): string {
    const lang = this.i18n.lang()
    return achievement.translations?.[lang]?.title ?? achievement.title
  }

  getAchievementDescription(achievement: Achievement): string {
    const lang = this.i18n.lang()
    return achievement.translations?.[lang]?.description ?? achievement.description
  }

  getCategoryColor(category: string): string {
    const map: Record<string, string> = {
      missions: '#00d1ff',
      streak: '#bef500',
      level: '#c799ff',
      xp: '#ff6e84',
    }
    return map[category] ?? '#97a9ff'
  }

  get xpPercent(): number {
    if (!this.progress) return 0
    const { totalXP, xpToNextLevel, currentLevel } = this.progress
    const threshold = (currentLevel * (currentLevel - 1)) / 2 * 100
    const xpInLevel = totalXP - threshold
    const xpNeeded = xpInLevel + xpToNextLevel
    return xpNeeded > 0 ? Math.round((xpInLevel / xpNeeded) * 100) : 100
  }
}
