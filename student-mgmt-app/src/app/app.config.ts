import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Nora from '@primeng/themes/nora';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { studentsReducer } from './store/reducers/students.reducers';
import { provideEffects } from '@ngrx/effects';
import { DashboardEffects } from './store/effects/students.effects';
import { errorInterceptor } from './interceptors/error.interceptor';
import { provideToastr } from 'ngx-toastr';
import { httpCallInterceptor } from './interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideToastr(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Nora
            }
        }),
        provideHttpClient(withInterceptors([errorInterceptor, httpCallInterceptor])),
        provideStore(),
        provideState({ name: 'students', reducer: studentsReducer }),
        provideEffects(DashboardEffects)
    ]
};
