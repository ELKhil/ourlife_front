import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commentaire } from '../Models/Commentaire';


@Injectable({
  providedIn: 'root'
})
export class donationService {

  constructor(
    private _http : HttpClient
  ) { }


  post(value : string){
    return this._http.post<any>(environment.api_url + '/api/donation', value);
  }




}
