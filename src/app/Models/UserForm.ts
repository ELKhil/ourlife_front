import { Commentaire } from "./Commentaire";
import { Iposts } from "./Iposts";

export interface UserForm {
    nom : string;
    nomUtilisateur : string;
    mdp : string;
    imageProfil: string;
    active: boolean;
    id: string;
    commentUser: Commentaire,
    postsUsers: Iposts[],


}