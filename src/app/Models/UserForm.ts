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
    id: number;
    schoolBranchId : string;
    commentUser: Commentaire,
    postsUsers: Iposts[],
    restToken : string;
    lastMessage : string;
    lastMessageDate : Date;
    unreadCount : number;

}