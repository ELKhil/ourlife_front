import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Donation } from '../Models/donation';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class donationService {

  constructor(
    private _http : HttpClient
  ) { }


  post(value : Donation){
    return this._http.post<any>(environment.api_url + '/api/donation', value);
  }


  get(): Observable<any>{
    return this._http.get<any>(environment.api_url + '/api/donations')
  }



}
