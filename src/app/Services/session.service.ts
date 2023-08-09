
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Token } from '../Models/token.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  token!: string;

  decodedToken! : Token;

  isLogged = false;

  constructor() { 
    let token = localStorage.getItem('TOKEN');
    console.log('Token from local storage:', token);
    if(token){
      this.save(token);
    }
   }

  save(token: string){
    this.token =token;
    this.isLogged =true;
    this.decodedToken = jwtDecode(token);
    localStorage.setItem('TOKEN', token);
  };

  clear() {
    this.isLogged =false;
    this.token = "";
    localStorage.removeItem('TOKEN')
  };
}
