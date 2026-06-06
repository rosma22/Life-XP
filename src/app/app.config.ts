import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideIonicAngular } from '@ionic/angular/standalone'
import { routes } from './app.routes'
import { authInterceptor } from './auth.interceptor'

console.log('[config] building appConfig...')

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
  ],
}

console.log('[config] appConfig ready')
