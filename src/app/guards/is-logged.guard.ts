import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../Services/session.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  constructor(private router : Router,
              private session : SessionService,){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isLogged = this.session.isLogged;
      if(!isLogged) {
        this.router.navigate(['/login']);
      }
      return isLogged;
  }
  
}
