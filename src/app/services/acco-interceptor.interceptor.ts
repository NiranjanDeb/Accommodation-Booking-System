import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

export const accoInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router)
  const token = localStorage.getItem('userToken')
  
  if(req.url.includes('/auth/sign')){

    return next(req);
  }

  if(token){
    req = req.clone({
      setHeaders: {
        Authorization : `Bearer ${token}`
      }
    });
  }

 return next(req).pipe(
  catchError((error) => {

      if (error.status === 401) {
        // authService.logout();
        localStorage.removeItem('auth')
        router.navigate(['']);
      }

      return throwError(() => error);
    })
 );
};
