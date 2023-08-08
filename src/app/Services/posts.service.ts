import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iposts } from '../Models/Iposts';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postForm! : UntypedFormGroup;

  constructor(
    private httpClient: HttpClient ) { }


    get(): Observable<Iposts[]>{
      return this.httpClient.get<Iposts[]>(environment.api_url + '/posts');
    }


    //c'est une requete qui cherche une page :
    getPage(pagination : number): Observable<Iposts[]>{
      return this.httpClient.get<Iposts[]>(environment.api_url + '/api/posts/'+pagination+'/4');
    }

    //C'est une requete qui cherche tous les page d'un utilisateur
    getPageUser(username : string) : Observable<Iposts[]>{
      return this.httpClient.get<Iposts[]>(environment.api_url + '/api/posts/'+username);
    }


    //c'est une requete qui cherche toutes les postes:
   /*  getAllPosts(): Observable<Iposts[]>{
    return this.httpClient.get<Iposts[]>(environment.api_url + '/api/posts');
    } */
  
    post(value : Iposts){
      return this.httpClient.post<any>(environment.api_url + '/api/post', value);
    }
    
    delet(postId : Number){
      return this.httpClient.get<any>(environment.api_url + '/api/post/delet/' + postId);
    }

   

}
