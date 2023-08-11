import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commentaire } from '../Models/Commentaire';


@Injectable({
  providedIn: 'root'
})
export class ComentService {

  constructor(
    private _http : HttpClient
  ) { }


  post(value : Commentaire ){
    return this._http.post<any>(environment.api_url + '/api/coment', value);
  }

  getMessages(postId : number ): Observable<any>{
    return this._http.get<any>(environment.api_url + '/api/loadComent/'+ postId)
  }

  delet(messageId : Number){
    return this._http.get<any>(environment.api_url + '/api/coment/delet/' + messageId);
  }
}
