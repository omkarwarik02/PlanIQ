import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import Aura from '@primeuix/themes/aura';


export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
