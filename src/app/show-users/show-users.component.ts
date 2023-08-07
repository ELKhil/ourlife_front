import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { UserForm } from '../Models/UserForm';
import { PostsService } from '../Services/posts.service';
import { SessionService } from '../Services/session.service';
import { UserService } from '../Services/user.service';

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
 

  constructor(
    private _userService : UserService, public session: SessionService, private _postsService : PostsService, public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
      
         this._userService.get().subscribe(data=> this.users = data );
      }
  


  delet(username : string){
    console.log(username);
    this._userService.deletUser(username).subscribe({
        next : (p) => {
          toastr.success("L'utilisateur a bien été supprimé");
          location.reload();
        }, error: () => {
          toastr.error("Something wrong");
        }
    });
  }

  deletUser(username : string){
    console.log(username);
    this._userService.deletUser(username).subscribe({
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
