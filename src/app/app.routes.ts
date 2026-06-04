import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('../pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../pages/register/register.page').then(m => m.RegisterPage),
  },
  {
    path: 'mission-select',
    loadComponent: () =>
      import('../pages/mission-select/mission-select.page').then(m => m.MissionSelectPage),
  },
  {
    path: 'missions',
    loadComponent: () =>
      import('../pages/missions/missions.page').then(m => m.MissionsPage),
  },
  {
    path: 'rankings',
    loadComponent: () =>
      import('../pages/rankings/rankings.page').then(m => m.RankingsPage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('../pages/profile/profile.page').then(m => m.ProfilePage),
  },
  {
    path: 'edit-profile',
    loadComponent: () =>
      import('../pages/edit-profile/edit-profile.page').then(m => m.EditProfilePage),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('../pages/settings/settings.page').then(m => m.SettingsPage),
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('../pages/change-password/change-password.page').then(m => m.ChangePasswordPage),
  },
  { path: '**', redirectTo: 'login' },
]
