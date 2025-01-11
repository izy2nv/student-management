import { inject, Provider } from '@angular/core';
import {
    HTTP_INTERCEPTORS,
    HttpInterceptorFn,
    HttpRequest,
    HttpHandlerFn,
    HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

export const httpCallInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const loaderService = inject(LoaderService);
    loaderService.show();
    return next(req).pipe(
        finalize(() => {
            loaderService.hide();
        })
    );
};

export const httpCallInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useValue: httpCallInterceptor,
    multi: true
};