
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(AuthService);
  const router = inject(Router);
  return userService.isLoggedIn.pipe(
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return true;
      } else {
        // Redirect to the login page
        return router.parseUrl('/login');
      }
    })
  );
};
