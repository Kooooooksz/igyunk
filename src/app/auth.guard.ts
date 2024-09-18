import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUser().pipe(
    map(user => {
      if(user){
        return true;
      }else{
        router.navigate(["/login"]);
        return false;
      }
    })
  )
};
