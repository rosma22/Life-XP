import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'

@Component({
  selector: 'app-streak-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './streak-animation.component.html',
  styleUrls: ['./streak-animation.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        animate('600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)', keyframes([
          style({ transform: 'scale(0) rotate(-10deg)', opacity: 0, offset: 0 }),
          style({ transform: 'scale(1.2) rotate(5deg)', opacity: 1, offset: 0.7 }),
          style({ transform: 'scale(1) rotate(0deg)', opacity: 1, offset: 1 })
        ]))
      ])
    ]),
    trigger('pulse', [
      transition('* => *', [
        animate('1s ease-in-out', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.1)', offset: 0.5 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class StreakAnimationComponent implements OnInit {
  @Input() xpGained: number = 0
  @Input() streak: number = 0
  @Input() leveledUp: boolean = false
  @Input() newLevel: number = 0
  @Output() animationComplete = new EventEmitter<void>()

  particles: number[] = []
  showAnimation = true

  ngOnInit() {
    // Crear partículas para el efecto
    this.particles = Array.from({ length: 20 }, (_, i) => i)
    
    // Auto-cerrar después de 3.5 segundos
    setTimeout(() => {
      this.close()
    }, 3500)
  }

  close() {
    this.showAnimation = false
    setTimeout(() => {
      this.animationComplete.emit()
    }, 300)
  }
}
