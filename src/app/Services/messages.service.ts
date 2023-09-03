import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserForm } from '../Models/UserForm';
import { Message } from '../Models/Message';



@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  active : boolean = false;

  constructor(
    private http: HttpClient
  ) { }


  get(value: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/api/messages/${value}`);
    }

    
    post(value : any){
      return this.http.post<any>(environment.api_url + '/api/message', value);
    }
 

}



