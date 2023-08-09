
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Token } from '../Models/token.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  token!: string;
  decodedToken! : Token;


  private _isLoggedSubject = new BehaviorSubject<boolean>(false);
  isLogged = this._isLoggedSubject.asObservable();

  constructor() { 
    let token = localStorage.getItem('TOKEN');
    console.log('Token from local storage:', token);
    if(token){
      this.save(token);
    }
   }

   save(token: string) {
    this.token = token;
    this.decodedToken = jwtDecode(token);
    localStorage.setItem('TOKEN', token);
    this._isLoggedSubject.next(true);
  }

  clear() {
    this.token = "";
    localStorage.removeItem('TOKEN');
    this._isLoggedSubject.next(false);
  }
}
