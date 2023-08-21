import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Commentaire } from '../Models/Commentaire';
import { Iposts } from '../Models/Iposts';
import { ComentService } from '../Services/coment.service';
import { PostsService } from '../Services/posts.service';
import { SessionService } from '../Services/session.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';

declare var toastr :any;


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts! : Iposts[];
  nextPosts! : Iposts[];
  notEmptyPost = true;
  notScrolly = true;
  nbPage = 1;
  fileType : string = "";
  showCommentaire: boolean = false;
  loadComents : any[] = [];
  loadPostId : string = "0";
  getPageUserScroll : boolean = false;
  userName! :string;
  

  fg! : UntypedFormGroup;
  ajoutComment! : string;
  result: string = "";

  isLogged: boolean = false;
  isLoading: boolean = false;

  

  

  constructor(
    private fb : UntypedFormBuilder,
    private postsService: PostsService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    public session: SessionService,
    private comentService :ComentService,
    private router : Router,
    public dialog: MatDialog,
    
   
   
   
  
  ) {this.loadComents = []; }


  ngOnInit(): void {

      //une méthode qui ne charge pas tous les données
      //this.postsService.getAllPosts().subscribe(data => this.posts = data);

      //Une méthode qui charge page par page
      this.getAllPublications();

      this.session.isLogged.subscribe(loggedIn => {
      this.isLogged = loggedIn;
   
      });
      
  }

  getAllPublications(){
    this.postsService.getPage(this.nbPage).subscribe(data => this.posts = data);
  }

  //déclencheur de scroll
  onScroll(){
    if(this.getPageUserScroll == false){
          if(this.notScrolly && this.notEmptyPost){  
          this.spinner.show();
          this.notScrolly = false; 
          this.loadNextPage();
          
       }
    }
   
  }
  loadNextPage(){
      this.postsService.getPage(++this.nbPage).subscribe((data: any) => {
              this.nextPosts = data;
              if(this.nextPosts.length !== 0){
                //add the nextPots to the liste posts
              this.posts = this.posts.concat(this.nextPosts);
              this.notScrolly= true;
              this.spinner.hide();
              
              }else{
                this.notEmptyPost = false;
                this.spinner.hide();
              }
              
      });
   };


   //montrer les commentaires
   showComment(postId : string){
     this.showCommentaire = !this.showCommentaire;
     this.comentService.getMessages(Number(postId)).subscribe(data => this.loadComents = data);
     this.loadPostId = postId;
   }



   //l'enregistrement d'un  nouveau commentaire
   submit(postId: string) {
    this.isLoading = true;

    if (this.ajoutComment) {  // Ceci vérifie que ajoutComment n'est pas null, undefined ou une chaîne vide
        let commentaire: any = {
            userComImage: "",
            userComNom: "",
            contenu: this.ajoutComment,
            postId: Number(postId),
            active: false,
        }

        // Envoie de message
        this.comentService.post(commentaire).subscribe((response: any) => {
            toastr.success("Commentaire ajouté ...");

            // Mise à jour de la liste des commentaires affichée à l'utilisateur
            /*if (!this.loadComents) {
                this.loadComents = [];
            }
            this.loadComents.push(response);*/

            // Si vous voulez également mettre à jour la liste des commentaires dans this.posts :
            const postToUpdate = this.posts.find(p => p.id === postId);
            if (postToUpdate) {
                if (!postToUpdate.commentaires) {
                    postToUpdate.commentaires = [];
                }
                postToUpdate.commentaires.push(response);
            }

            this.isLoading = false;
        },
        (error) => {
            toastr.error(error.error.message);
            this.isLoading = false;
        });

    } else {
        toastr.error("Message non envoyé..");
        this.isLoading = false;
    }

    this.loadPostId = postId;
    this.ajoutComment = "";
    this.showCommentaire = true;
}


   postDelet(postId :string){
        console.log("supprimer ", postId); 
        this.postsService.delet(Number(postId)).subscribe({
          next : (p) => {
            toastr.success("Votre poste a bien été supprimé");
            location.reload();
          }, error: () => {
            toastr.error("Something wrong");
          }
      });
    }

    commentDelet(messageId : string, postId : string){
      this.comentService.delet(Number(messageId)).subscribe({
          next : (p) => {
              toastr.success("Votre commentaire a bien été supprimé");
  
              // Trouvez le post correspondant dans this.posts
              const postToUpdate = this.posts.find(p => p.id === postId);
              if (postToUpdate && postToUpdate.commentaires) {
                  // Trouvez l'index du commentaire correspondant dans le tableau des commentaires du post
                  const indexToDelete = postToUpdate.commentaires.findIndex(comment => comment.idMessage === messageId);
                  if (indexToDelete !== -1) {
                      // Supprimez ce commentaire du tableau
                      postToUpdate.commentaires.splice(indexToDelete, 1);
                  }
              }
  
              // Vous pouvez également mettre à jour this.loadComents pour refléter les changements
              this.loadComents = postToUpdate ? postToUpdate.commentaires : [];
          }, 
          error: () => {
              toastr.error("Something wrong");
          }
      });
    }
  

    postsUser(username :string){
     
      this.userName = username;
      this.getPageUserScroll =true;
      this.postsService.getPageUser(username).subscribe(data => this.posts = data);
    }


    confirmDialog(postId :string): void {
      const message = `Voulez-vous vraiment supprimer ce poste?`;
  
      const dialogData = new ConfirmDialogModel("Our Life Message", message);

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "600px",
        data: dialogData
      });
  
      dialogRef.afterClosed().subscribe(dialogResult => {
        this.result = dialogResult;
        console.log(this.result);
        if(this.result){
          this.postDelet(postId);
        }
      });  
    }



    confirmDialogMessage(messageId : string,postId :string ): void {
      const message = `Voulez-vous vraiment supprimer ce message?`;
  
      const dialogData = new ConfirmDialogModel("Our Life Message", message);

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "600px",
        data: dialogData
      });
  
      dialogRef.afterClosed().subscribe(dialogResult => {
        this.result = dialogResult;
        console.log(this.result);
        if(this.result){
          this.commentDelet(messageId, postId);
        }
      });


  }
}
