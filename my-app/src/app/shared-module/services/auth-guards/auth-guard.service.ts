import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userData: AuthServiceService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    let canAccessRoute = false;
    this.userData.$userData.subscribe((loggedInUserData) => {
      if (loggedInUserData && loggedInUserData.isLoginSuccess) {
        canAccessRoute = true;
      }
    });

    return canAccessRoute;
  }
}
