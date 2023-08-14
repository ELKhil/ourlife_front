import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SchoolBranch } from '../Models/SchoolBranch';



@Injectable({
  providedIn: 'root'
})
export class SchoolBranchService {

  constructor(
    private _http : HttpClient
  ) { }



  get(): Observable<SchoolBranch[]>{
    return this._http.get<SchoolBranch[]>(environment.api_url + '/api/schoolBranch/')
  }


}
