import { Injectable, signal, computed } from '@angular/core'

export type Lang = 'en' | 'es'

const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    'nav.dashboard': 'Dashboard',
    'nav.missions': 'Missions',
    'nav.rankings': 'Rankings',
    'nav.profile': 'Profile',

    // Login
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Log In',
    'login.register': 'New recruit? Create Account',
    'login.error.invalid': 'Invalid email or password.',
    'login.error.generic': 'Login failed. Please try again.',
    'login.subheadline': 'Sync with the pulse',

    // Register
    'register.username': 'Username',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.submit': 'Engage Missions',
    'register.login': 'Already a member? Log In',
    'register.step': 'Step 01 / Initializing Protocol',
    'register.quote': 'Your journey starts here',
    'register.error.exists': 'An account with that email already exists.',
    'register.error.generic': 'Registration failed. Please try again.',

    // Missions
    'missions.title': 'Active Missions',
    'missions.remaining': 'REMAINING',
    'missions.empty': 'No missions available today.',
    'missions.loading': 'Loading missions...',
    'missions.complete': 'COMPLETE',
    'missions.completed': '✓ Completed',
    'missions.expired': 'EXPIRED',
    'missions.streak': 'DAY STREAK',
    'missions.momentum': 'Current Momentum',
    'missions.error': 'Could not load missions.',

    // Mission Select
    'select.title': 'Available Missions',
    'select.sub': 'Complete objectives to earn XP and climb the rankings.',
    'select.confirm': 'CONFIRM',
    'select.selected': '✓ SELECTED',
    'select.select': 'SELECT',
    'select.error': 'Could not load missions.',
    'select.cat.all': 'All',
    'select.cat.fitness': 'Physical',
    'select.cat.learning': 'Mental',
    'select.cat.habits': 'Skills',
    'select.cat.finance': 'Finance',

    // Profile
    'profile.role': 'Productivity Architect',
    'profile.edit': '✏ EDIT PROFILE',
    'profile.settings': '⚙ SETTINGS',
    'profile.weekly': 'Weekly Velocity',
    'profile.xp_total': 'XP TOTAL',
    'profile.mastery': 'Hall of Mastery',
    'profile.view_all': 'View All',
    'profile.pulse': 'Recent Pulse',
    'profile.progress': 'Progress',
    'profile.level_flow': 'Level Flow',
    'profile.streak': 'Streak',
    'profile.completed': 'Completed',
    'profile.xp_next': 'XP to next level',
    'profile.remaining': 'remaining',
    'profile.error': 'Could not load profile.',

    // Settings
    'settings.title': 'SETTINGS',
    'settings.account': 'Account',
    'settings.edit_profile': 'Edit Profile',
    'settings.edit_profile_desc': 'Update your username and avatar.',
    'settings.change_password': 'Change Password',
    'settings.change_password_desc': 'Update your access credentials.',
    'settings.notifications': 'Notifications',
    'settings.push': 'Push Notifications',
    'settings.push_desc': 'Real-time alerts for mission updates.',
    'settings.reminder': 'Daily Reminder Protocol',
    'settings.reminder_desc': 'Morning briefing for scheduled objectives.',
    'settings.preferences': 'Preferences',
    'settings.dark_mode': 'Dark Mode',
    'settings.dark_mode_desc': 'Optimized for high-energy neon visuals.',
    'settings.language': 'Language',
    'settings.language_desc': 'Select your preferred language.',
    'settings.danger': 'Danger Zone',
    'settings.logout': '⏻ LOGOUT',
    'settings.delete': 'Delete Account Permanently',
    // Edit Profile
    'edit.title': 'EDIT PROFILE',
    'edit.change_avatar': 'Change Avatar',
    'edit.username': 'Username',
    'edit.email': 'Email Address',
    'edit.email_hint': 'Email cannot be changed for security',
    'edit.bio': 'Bio / Description',
    'edit.bio_placeholder': 'Tell the world your mission...',
    'edit.save': 'SAVE CHANGES',
    'edit.success': 'Profile updated successfully.',
    'edit.error': 'Could not save changes. Try again.',
  },
  es: {
    // Nav
    'nav.dashboard': 'Inicio',
    'nav.missions': 'Misiones',
    'nav.rankings': 'Rankings',
    'nav.profile': 'Perfil',

    // Login
    'login.email': 'Email',
    'login.password': 'Contraseña',
    'login.submit': 'Iniciar Sesión',
    'login.register': '¿Nuevo? Crear Cuenta',
    'login.error.invalid': 'Email o contraseña incorrectos.',
    'login.error.generic': 'Error al iniciar sesión. Intenta de nuevo.',
    'login.subheadline': 'Sincroniza con el pulso',

    // Register
    'register.username': 'Usuario',
    'register.email': 'Email',
    'register.password': 'Contraseña',
    'register.submit': 'Comenzar Misiones',
    'register.login': '¿Ya tienes cuenta? Inicia sesión',
    'register.step': 'Paso 01 / Iniciando Protocolo',
    'register.quote': 'Tu viaje comienza aquí',
    'register.error.exists': 'Ya existe una cuenta con ese email.',
    'register.error.generic': 'Error al registrarse. Intenta de nuevo.',

    // Missions
    'missions.title': 'Misiones Activas',
    'missions.remaining': 'PENDIENTES',
    'missions.empty': 'No hay misiones disponibles hoy.',
    'missions.loading': 'Cargando misiones...',
    'missions.complete': 'COMPLETAR',
    'missions.completed': '✓ Completada',
    'missions.expired': 'EXPIRADA',
    'missions.streak': 'DÍAS DE RACHA',
    'missions.momentum': 'Momento Actual',
    'missions.error': 'No se pudieron cargar las misiones.',

    // Mission Select
    'select.title': 'Misiones Disponibles',
    'select.sub': 'Completa objetivos para ganar XP y subir en el ranking.',
    'select.confirm': 'CONFIRMAR',
    'select.selected': '✓ SELECCIONADA',
    'select.select': 'SELECCIONAR',
    'select.error': 'No se pudieron cargar las misiones.',
    'select.cat.all': 'Todas',
    'select.cat.fitness': 'Físico',
    'select.cat.learning': 'Mental',
    'select.cat.habits': 'Hábitos',
    'select.cat.finance': 'Finanzas',

    // Profile
    'profile.role': 'Arquitecto de Productividad',
    'profile.edit': '✏ EDITAR PERFIL',
    'profile.settings': '⚙ AJUSTES',
    'profile.weekly': 'Velocidad Semanal',
    'profile.xp_total': 'XP TOTAL',
    'profile.mastery': 'Salón de la Maestría',
    'profile.view_all': 'Ver Todo',
    'profile.pulse': 'Actividad Reciente',
    'profile.progress': 'Progreso',
    'profile.level_flow': 'Flujo de Nivel',
    'profile.streak': 'Racha',
    'profile.completed': 'Completadas',
    'profile.xp_next': 'XP para siguiente nivel',
    'profile.remaining': 'restantes',
    'profile.error': 'No se pudo cargar el perfil.',

    // Settings
    'settings.title': 'AJUSTES',
    'settings.account': 'Cuenta',
    'settings.edit_profile': 'Editar Perfil',
    'settings.edit_profile_desc': 'Actualiza tu nombre de usuario y avatar.',
    'settings.change_password': 'Cambiar Contraseña',
    'settings.change_password_desc': 'Actualiza tus credenciales de acceso.',
    'settings.notifications': 'Notificaciones',
    'settings.push': 'Notificaciones Push',
    'settings.push_desc': 'Alertas en tiempo real para actualizaciones de misiones.',
    'settings.reminder': 'Recordatorio Diario',
    'settings.reminder_desc': 'Resumen matutino de objetivos programados.',
    'settings.preferences': 'Preferencias',
    'settings.dark_mode': 'Modo Oscuro',
    'settings.dark_mode_desc': 'Optimizado para visuales neón de alta energía.',
    'settings.language': 'Idioma',
    'settings.language_desc': 'Selecciona tu idioma preferido.',
    'settings.danger': 'Zona de Peligro',
    'settings.logout': '⏻ CERRAR SESIÓN',
    'settings.delete': 'Eliminar Cuenta Permanentemente',

    // Edit Profile
    'edit.title': 'EDITAR PERFIL',
    'edit.change_avatar': 'Cambiar Avatar',
    'edit.username': 'Usuario',
    'edit.email': 'Correo Electrónico',
    'edit.email_hint': 'El email no se puede cambiar por seguridad',
    'edit.bio': 'Bio / Descripción',
    'edit.bio_placeholder': 'Cuéntale al mundo tu misión...',
    'edit.save': 'GUARDAR CAMBIOS',
    'edit.success': 'Perfil actualizado correctamente.',
    'edit.error': 'No se pudieron guardar los cambios. Intenta de nuevo.',
  }
}

const STORAGE_KEY = 'app_lang'

@Injectable({ providedIn: 'root' })
export class I18nService {
  private _lang = signal<Lang>(
    (localStorage.getItem(STORAGE_KEY) as Lang) ?? 'es'
  )

  readonly lang = this._lang.asReadonly()

  readonly translations = computed(() => TRANSLATIONS[this._lang()])

  setLang(lang: Lang): void {
    this._lang.set(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  t(key: string): string {
    return this.translations()[key] ?? key
  }
}
