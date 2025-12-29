import { HttpInterceptorFn } from '@angular/common/http';

export const accoInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth')
  
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

 return next(req);
};
