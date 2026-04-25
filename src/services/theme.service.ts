import { Injectable, signal } from '@angular/core'

const STORAGE_KEY = 'app_theme'

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _dark = signal<boolean>(this.loadPreference())

  readonly isDark = this._dark.asReadonly()

  constructor() {
    this.apply(this._dark())
  }

  toggle(dark: boolean): void {
    this._dark.set(dark)
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
    this.apply(dark)
  }

  private apply(dark: boolean): void {
    document.body.classList.toggle('light-mode', !dark)
  }

  private loadPreference(): boolean {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return stored === 'dark'
    return true // dark by default
  }
}
