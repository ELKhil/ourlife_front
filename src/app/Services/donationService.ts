import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Donation } from '../Models/donation';


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




}
