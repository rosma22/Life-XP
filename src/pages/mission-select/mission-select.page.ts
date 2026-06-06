import { Component, OnInit, computed, signal } from '@angular/core'
import { Router } from '@angular/router'
import { IonContent, IonSpinner } from '@ionic/angular/standalone'
import { MissionService } from '../../services/mission.service'
import { Mission } from '../../types'
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component'

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'fitness', label: 'Physical' },
  { key: 'learning', label: 'Mental' },
  { key: 'habits', label: 'Skills' },
  { key: 'finance', label: 'Social' },
]

@Component({
  selector: 'app-mission-select',
  templateUrl: './mission-select.page.html',
  styleUrls: ['./mission-select.page.scss'],
  standalone: true,
  imports: [IonContent, IonSpinner, BottomNavComponent],
})
export class MissionSelectPage implements OnInit {
  categories = CATEGORIES
  activeCategory = signal('all')
  loading = true
  errorMessage = ''
  selectedIds = new Set<string>()

  private _missions = signal<Mission[]>([])

  filteredMissions = computed(() =>
    this.activeCategory() === 'all'
      ? this._missions()
      : this._missions().filter(m => m.category === this.activeCategory())
  )

  constructor(
    private missionService: MissionService,
    private router: Router
  ) {}

  getMissionTitle(mission: Mission): string {
    const lang = localStorage.getItem('app_lang') as 'en' | 'es' || 'es'
    return mission.translations?.[lang]?.title ?? mission.title
  }

  getMissionDescription(mission: Mission): string {
    const lang = localStorage.getItem('app_lang') as 'en' | 'es' || 'es'
    return mission.translations?.[lang]?.description ?? mission.description
  }

  async ngOnInit(): Promise<void> {
    try {
      // Obtener las misiones disponibles y las misiones ya asignadas al usuario
      const [allMissions, userMissions] = await Promise.all([
        this.missionService.getAvailableMissions(),
        this.missionService.getDailyMissions()
      ])

      // Crear un Set con los IDs de las misiones ya asignadas
      const assignedMissionIds = new Set(userMissions.map(um => um.missionId))

      // Filtrar las misiones disponibles para excluir las ya asignadas
      const availableMissions = allMissions.filter(m => !assignedMissionIds.has(m.id))
      
      this._missions.set(availableMissions)
    } catch {
      this.errorMessage = 'No se pudieron cargar las misiones.'
    } finally {
      this.loading = false
    }
  }

  isSelected(id: string): boolean {
    return this.selectedIds.has(id)
  }

  toggleSelect(id: string): void {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id)
    } else {
      this.selectedIds.add(id)
    }
    // trigger change detection
    this.selectedIds = new Set(this.selectedIds)
  }

  async confirmSelection(): Promise<void> {
    if (this.selectedIds.size === 0) return
    try {
      await this.missionService.selectMissions([...this.selectedIds])
      await this.router.navigate(['/missions'])
    } catch {
      this.errorMessage = 'Error al guardar la selección.'
    }
  }

  categoryColor(category: string): string {
    const map: Record<string, string> = {
      fitness: '#bef500',
      learning: '#97a9ff',
      habits: '#c799ff',
      finance: '#ff6e84',
    }
    return map[category] ?? '#97a9ff'
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

  diffColor(difficulty: string): string {
    const map: Record<string, string> = {
      easy: '#bef500',
      medium: '#97a9ff',
      hard: '#ff6e84',
    }
    return map[difficulty] ?? '#adaaaa'
  }
}
