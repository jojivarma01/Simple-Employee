import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(private userData: AuthServiceService) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.userData.$userData.pipe(
      map((data) => {
        if(data && data.isLoginSuccess) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.userData.$userData.getValue().isLoginSuccess; 
  }
}
