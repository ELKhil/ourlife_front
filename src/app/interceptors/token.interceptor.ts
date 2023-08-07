import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../Services/session.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _session: SessionService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this._session.isLogged) {
      let clone = request.clone({setHeaders: {  
          Authorization: 'Bearer ' + this._session.token
        }});
        return next.handle(clone);
    }
    return next.handle(request);
  
  }
}
