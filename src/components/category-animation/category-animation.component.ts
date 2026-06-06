import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { MissionCategory } from '../../types'

@Component({
  selector: 'app-category-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-animation.component.html',
  styleUrls: ['./category-animation.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CategoryAnimationComponent implements OnInit {
  @Input() xpGained: number = 0
  @Input() category: MissionCategory = 'fitness'
  @Input() leveledUp: boolean = false
  @Input() newLevel: number = 0
  @Output() animationComplete = new EventEmitter<void>()

  showAnimation = true

  ngOnInit() {
    // Auto-cerrar después de 2 segundos
    setTimeout(() => {
      this.close()
    }, 2000)
  }

  close() {
    this.showAnimation = false
    setTimeout(() => {
      this.animationComplete.emit()
    }, 200)
  }

  getCategoryIcon(): string {
    const icons: Record<MissionCategory, string> = {
      fitness: '👟',
      learning: '📖',
      habits: '🌱',
      finance: '💰'
    }
    return icons[this.category]
  }

  getCategoryColor(): string {
    const colors: Record<MissionCategory, string> = {
      fitness: '#00d1ff',
      learning: '#c799ff',
      habits: '#bef500',
      finance: '#ff6e84'
    }
    return colors[this.category]
  }

  getCategoryName(): string {
    const names: Record<MissionCategory, string> = {
      fitness: 'Fitness',
      learning: 'Learning',
      habits: 'Habits',
      finance: 'Finance'
    }
    return names[this.category]
  }
}
