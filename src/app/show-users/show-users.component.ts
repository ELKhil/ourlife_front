import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { UserForm } from '../Models/UserForm';
import { PostsService } from '../Services/posts.service';
import { SessionService } from '../Services/session.service';
import { UserService } from '../Services/user.service';
import { switchMap } from 'rxjs/operators';

declare var toastr : any;

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {

  users : UserForm [] =[];
  active :boolean = false;
  result: string = "";
  isLogged: boolean = false;
 

  constructor(
    private _userService : UserService, public session: SessionService, private _postsService : PostsService, public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
      
    this.session.isLogged.pipe(
      switchMap(loggedIn => {
        this.isLogged = loggedIn;
        if (loggedIn) {
          return this._userService.get();
        }
        return []; 
      })
    ).subscribe(data => this.users = data);

      }
  


  delet(email : string){
    console.log(email);
    this._userService.deletUser(email).subscribe({
        next : (p) => {
          toastr.success("L'utilisateur a bien été supprimé");
          location.reload();
        }, error: () => {
          toastr.error("Something wrong");
        }
    });
  }

  deletUser(email : string){
    console.log(email);
    this._userService.deletUser(email).subscribe({
        next : (p) => {
          toastr.success("L'utilisateur a bien été supprimé");
          this.session.clear();
          location.reload();
        }, error: () => {
          toastr.error("Something wrong");
        }
    });
  }



  confirmDialogUser(username : string): void {
    const message = `Voulez-vous vraiment supprimer ce compte?`;

    const dialogData = new ConfirmDialogModel("Our Life Message", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      console.log(this.result);
      if(this.result){
        this.delet(username);
      }
    });
}



confirmDialogUser2(username : string): void {
  const message = `Voulez-vous vraiment supprimer votre compte?`;

  const dialogData = new ConfirmDialogModel("Our Life Message", message);

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "800px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    this.result = dialogResult;
    console.log(this.result);
    if(this.result){
      this.deletUser(username);
    }
  });
}

  
}