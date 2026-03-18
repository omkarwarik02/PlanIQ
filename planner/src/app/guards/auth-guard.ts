import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth/auth-service';
import { map, catchError, of } from 'rxjs'

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getSession().pipe(
    map((res: any) => {
      return res?.user
        ? true
        : router.createUrlTree(['/login']); 
    }),
    catchError(() => {
      return of(router.createUrlTree(['/login'])); 
    })
  );
};
