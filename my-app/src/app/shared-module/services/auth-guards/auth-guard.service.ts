import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(private userData: AuthServiceService) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    let canAccessRoute = false;
    this.userData.$userData.subscribe((loggedInUserData) => {
      if (loggedInUserData && loggedInUserData.isLoginSuccess) {
        canAccessRoute = true;
      }
    });

    return canAccessRoute;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    let canAccessRoute = false;
    console.log('route-', route);
    console.log('state-', state);
    this.userData.$userData.subscribe((loggedInUserData) => {
      if (loggedInUserData && loggedInUserData.isLoginSuccess) {
        canAccessRoute = true;
      }
    });

    return canAccessRoute;
  }
}
