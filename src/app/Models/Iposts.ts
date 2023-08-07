
import { Commentaire } from "./Commentaire";

export interface Iposts{
    
    id: string;
    imageUser :string;
    nomUser : string;
    media : File;
    contenu :string;
    dateDePost: Date;
    like: number;
    dislike: number;
    active: boolean;
    typemedia : string ;

    commentaires: Commentaire []

 }





  



 