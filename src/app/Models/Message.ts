export interface Message{
    id: number,
    contenu: string,
    createdAt : Date,

    sentFromId : number,
    sentFromFullName : string,
    sentFromImage : string,

    sentToId : number,
    sentToFullName : string,
    sentToImage : string,
 
}
