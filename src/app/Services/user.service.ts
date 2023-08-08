import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserForm } from '../Models/UserForm';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  active : boolean = false;

  constructor(
    private http: HttpClient
  ) { }


  get(): Observable<UserForm[]>{
    return this.http.get<UserForm[]>(environment.api_url + '/api/users');
  }
  
  post(value : UserForm){
    return this.http.post<any>(environment.api_url + 'api/user', value);
  }

  deletUser(username : string){
    return this.http.get<any>(environment.api_url + '/api/user/delet/' + username);
  }

  
}
