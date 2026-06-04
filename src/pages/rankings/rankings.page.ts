import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { Router } from '@angular/router'
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component'

interface RankingUser {
  rank: number
  name: string
  avatar: string
  level: number
  xp: number
  velocity: number
  streak: number
  badges: number
  trend: 'up' | 'down' | 'same'
  trendValue: number
}

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [CommonModule, IonicModule, BottomNavComponent],
  templateUrl: './rankings.page.html',
  styleUrls: ['./rankings.page.scss']
})
export class RankingsPage implements OnInit {
  currentUser = {
    rank: 12,
    name: 'rosmaryrojas',
    avatar: '👤',
    level: 2,
    xp: 225,
    velocity: 87,
    streak: 3
  }

  topRankings: RankingUser[] = [
    {
      rank: 1,
      name: 'quantumleap',
      avatar: '🚀',
      level: 15,
      xp: 12450,
      velocity: 98,
      streak: 45,
      badges: 28,
      trend: 'same',
      trendValue: 0
    },
    {
      rank: 2,
      name: 'neuralflow',
      avatar: '⚡',
      level: 14,
      xp: 11280,
      velocity: 95,
      streak: 38,
      badges: 24,
      trend: 'up',
      trendValue: 2
    },
    {
      rank: 3,
      name: 'cosmicdev',
      avatar: '🌟',
      level: 13,
      xp: 10150,
      velocity: 92,
      streak: 32,
      badges: 22,
      trend: 'down',
      trendValue: 1
    },
    {
      rank: 4,
      name: 'syntaxninja',
      avatar: '🥷',
      level: 12,
      xp: 9420,
      velocity: 90,
      streak: 28,
      badges: 20,
      trend: 'up',
      trendValue: 1
    },
    {
      rank: 5,
      name: 'pixelwizard',
      avatar: '🧙',
      level: 11,
      xp: 8750,
      velocity: 88,
      streak: 25,
      badges: 18,
      trend: 'same',
      trendValue: 0
    },
    {
      rank: 6,
      name: 'datastream',
      avatar: '💫',
      level: 10,
      xp: 7890,
      velocity: 85,
      streak: 22,
      badges: 16,
      trend: 'up',
      trendValue: 3
    },
    {
      rank: 7,
      name: 'codealchemy',
      avatar: '⚗️',
      level: 9,
      xp: 7120,
      velocity: 83,
      streak: 20,
      badges: 15,
      trend: 'down',
      trendValue: 2
    },
    {
      rank: 8,
      name: 'bytebender',
      avatar: '🔮',
      level: 9,
      xp: 6850,
      velocity: 81,
      streak: 18,
      badges: 14,
      trend: 'same',
      trendValue: 0
    }
  ]

  stats = {
    totalUsers: 1247,
    avgVelocity: 72,
    topStreak: 45,
    weeklyGrowth: 12
  }

  constructor(private router: Router) {}

  ngOnInit() {}

  goToProfile() {
    this.router.navigate(['/profile'])
  }

  getTrendIcon(trend: string): string {
    if (trend === 'up') return '↗'
    if (trend === 'down') return '↘'
    return '→'
  }

  getTrendColor(trend: string): string {
    if (trend === 'up') return '#00d1ff'
    if (trend === 'down') return '#ff6e84'
    return '#adaaaa'
  }

  getVelocityColor(velocity: number): string {
    if (velocity >= 90) return '#00d1ff'
    if (velocity >= 80) return '#c799ff'
    if (velocity >= 70) return '#97a9ff'
    return '#adaaaa'
  }

  getRankBadgeClass(rank: number): string {
    if (rank === 1) return 'rank-gold'
    if (rank === 2) return 'rank-silver'
    if (rank === 3) return 'rank-bronze'
    return 'rank-default'
  }
}
