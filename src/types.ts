// Re-export from shared — single source of truth for frontend types
// (Angular build resolves local imports reliably without cross-workspace paths)

export type MissionCategory = 'fitness' | 'learning' | 'finance' | 'habits'
export type Difficulty = 'easy' | 'medium' | 'hard'
export type MissionStatus = 'pending' | 'completed' | 'expired'

export interface Mission {
  id: string
  title: string
  description: string
  category: MissionCategory
  difficulty: Difficulty
  xpReward: number
  estimatedMinutes: number
  isActive: boolean
  createdAt: string
}

export interface UserMission {
  id: string
  userId: string
  missionId: string
  mission: Mission
  status: MissionStatus
  assignedAt: string
  completedAt?: string
  expiresAt: string
}

export interface UserProgress {
  userId: string
  totalXP: number
  currentLevel: number
  xpToNextLevel: number
  streak: number
  lastActivityDate: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  username: string
  passwordHash: string
  createdAt: string
}

export interface UserProfile {
  id: string
  username: string
  description?: string
  level: number
  totalXP: number
  streak: number
  avatarUrl?: string
}

export interface CompletionResult {
  missionId: string
  xpGained: number
  newTotalXP: number
  newLevel: number
  leveledUp: boolean
  streak: number
}

export interface ProgressResult {
  xpGained: number
  newTotalXP: number
  previousLevel: number
  newLevel: number
  leveledUp: boolean
  xpToNextLevel: number
}

export interface AssignmentSummary {
  totalUsers: number
  totalAssigned: number
  errors: Array<{ userId: string; error: string }>
}

export interface StreakResult {
  currentStreak: number
  increased: boolean
}
