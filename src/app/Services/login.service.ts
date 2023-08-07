import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../Models/auth.model';
import { Login } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _http: HttpClient
  ) { }

  public login(form: Login) : Observable<Auth>{
    return this._http.post<Auth>('http://localhost:8000/api/login_check', form);
  }
}
