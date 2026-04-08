import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import { appConfig } from './app/app.config'

console.log('[main] bootstrapping...')

bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('[main] bootstrap OK'))
  .catch(err => {
    console.error('[main] bootstrap FAILED:', err)
    document.body.innerHTML = `<pre style="color:red;padding:20px">${err}</pre>`
  })
