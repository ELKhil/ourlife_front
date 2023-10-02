import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../Services/session.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  constructor(private router : Router,
              private session : SessionService,){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.session.isLogged.pipe(
        take(1),
        map(isLogged => {
          if (isLogged) {
            this.router.navigate(['accueil']);
            return false;
          }
          return true;
        })
      );
  }
  
}
