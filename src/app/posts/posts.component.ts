import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Iposts } from '../Models/Iposts';
import { ComentService } from '../Services/coment.service';
import { PostsService } from '../Services/posts.service';
import { SessionService } from '../Services/session.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';


declare var toastr: any;


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts!: Iposts[];
  nextPosts!: Iposts[];
  notEmptyPost = true;
  notScrolly = true;
  nbPage = 1;
  fileType: string = "";
  showCommentaire: boolean = false;
  loadComents: any[] = [];
  loadPostId: string = "0";
  getPageUserScroll: boolean = false;
  userName!: string;


  fg!: UntypedFormGroup;
  ajoutComment: { [key: string]: string } = {};
  result: string = "";

  isLogged: boolean = false;
  isLoading: boolean = false;





  constructor(
    private postsService: PostsService,
    private spinner: NgxSpinnerService,
    public session: SessionService,
    private comentService: ComentService,
    public dialog: MatDialog,
  ) { this.loadComents = []; }


  ngOnInit(): void {
    //Une méthode qui charge page par page
    this.getAllPublications();
    this.session.isLogged.subscribe(loggedIn => {
      this.isLogged = loggedIn;

    });

  }

  getAllPublications() {
    this.postsService.getPage(this.nbPage).subscribe(data => this.posts = data);
  }

  //déclencheur de scroll
  onScroll() {
    if (this.getPageUserScroll == false) {
      if (this.notScrolly && this.notEmptyPost) {
        this.spinner.show();
        this.notScrolly = false;
        this.loadNextPage();

      }
    }

  }
  loadNextPage() {
    this.postsService.getPage(++this.nbPage).subscribe((data: any) => {
      this.nextPosts = data;
      if (this.nextPosts.length !== 0) {
        //add the nextPots to the liste posts
        this.posts = this.posts.concat(this.nextPosts);
        this.notScrolly = true;
        this.spinner.hide();

      } else {
        this.notEmptyPost = false;
        this.spinner.hide();
      }

    });
  };


  //montrer les commentaires
  showComment(postId: string) {
    this.showCommentaire = !this.showCommentaire;

    if (!this.ajoutComment[postId]) {
      this.ajoutComment[postId] = '';
    }

    // Demandez les commentaires pour le post spécifié
    this.comentService.getMessages(Number(postId)).subscribe(data => {
      // Une fois que vous recevez les données, mettez à jour loadComents et loadPostId
      this.loadComents = data;
      this.loadPostId = postId;
    });
  }




  //l'enregistrement d'un  nouveau commentaire
  submit(postId: string) {
    this.isLoading = true;
    // Ceci vérifie que ajoutComment[postId] n'est pas null, undefined ou une chaîne vide
    if (this.ajoutComment[postId]) {  
      let commentaire: any = {
        userComImage: "",
        userComNom: "",
        contenu: this.ajoutComment[postId],  // mise à jour ici
        postId: Number(postId),
        active: false,
      }

      // Envoie de message
     
        this.comentService.post(commentaire).subscribe({
              next: (p) => { 
                this.comentService.getMessages(Number(postId)).subscribe(data => this.loadComents = data);
                toastr.success("Commentaire ajouté ...");
                this.isLoading = false;

              },error: () => {
                toastr.error("Something wrong");
                this.isLoading = false;
              }
              });
    } else {
      toastr.error("Erreur commentaire..");
      this.isLoading = false;
    }
     
    this.showCommentaire = true;
    this.loadPostId = postId;
    this.ajoutComment[postId] = "";  // mise à jour ici
    
}



  postDelet(postId: string) {
    console.log("supprimer ", postId);
    this.postsService.delet(Number(postId)).subscribe({
      next: (p) => {
        toastr.success("Votre poste a bien été supprimé");
        location.reload();
      }, error: () => {
        toastr.error("Something wrong");
      }
    });
  }

  commentDelet(messageId: string, postId: string) {
    this.comentService.delet(Number(messageId)).subscribe({
      next: (p) => {
        this.comentService.getMessages(Number(postId)).subscribe(data => this.loadComents = data);
        toastr.success("Votre commentaire a bien été supprimé");
      }, error: () => {
        toastr.error("Something wrong");
      }
    });
  }


  postsUser(username: string) {

    this.userName = username;
    this.getPageUserScroll = true;
    this.postsService.getPageUser(username).subscribe(data => this.posts = data);
  }


  confirmDialog(postId: string): void {
    const message = `Voulez-vous vraiment supprimer ce poste?`;

    const dialogData = new ConfirmDialogModel("Our Life Message", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      console.log(this.result);
      if (this.result) {
        this.postDelet(postId);
      }
    });
  }



  confirmDialogMessage(messageId: string, postId: string): void {
    const message = `Voulez-vous vraiment supprimer ce message?`;

    const dialogData = new ConfirmDialogModel("Our Life Message", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      console.log(this.result);
      if (this.result) {
        this.commentDelet(messageId, postId);
      }
    });


  }
}
