import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastrService);
  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 400:
          error.message = 'Bad Request';
          break;
        case 401:
          error.message = 'Unauthorized';
          break;
        case 403:
          error.message = 'Forbidden';
          break;
        case 404:
          error.message = 'An error occured. Please try again later.';
          break;
        default:
          error.message = 'Internal Server Error';
          break;
      }
      toastService.error(error.message);
      return throwError(() => error);
    }));;
};

