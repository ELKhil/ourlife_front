import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class LanguageService {

    keyLanguage = 'userLanguage'

    constructor(){}

    initLanguage(){
        const value = localStorage.getItem(this.keyLanguage)
    }
}