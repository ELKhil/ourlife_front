import { Commentaire } from "./Commentaire";
import { Iposts } from "./Iposts";

export interface UserForm {
    firstname: string;
    lastname : string;
    email : string;
    password : string;
    imageProfil: string;
    active: boolean;
    stars : number;
    id: string;
    commentUser: Commentaire,
    postsUsers: Iposts[],


}