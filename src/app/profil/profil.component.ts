import { Component, OnInit } from '@angular/core';
import { SessionService } from '../Services/session.service';
import { UserService } from '../Services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

declare var toastr : any;

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  isLogged: boolean = false;
  result: string = "";
  fg!: FormGroup;
  inputClicked: boolean = false;
  fileSize: number = 0;
  showForm: boolean = false;

  constructor(public session: SessionService,
              private _userService : UserService,
              public dialog: MatDialog,
              private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.session.isLogged.subscribe(loggedin => {
      this.isLogged = loggedin
    }); 

    this.fg = this.fb.group({
 
      imageProfil: [null, [this.checkFileSize.bind(this)]],
      
    });
  }

  submit(): void {
    if (this.fg.valid) {
      if (!this.fg.get('imageProfil')?.value) {
        this.readDefaultImageAsBase64().then(() => {
          this.ChangeImageProfil();
        });
      } else {
        this.ChangeImageProfil();
      }
    } else {
      toastr.error("L'inscription a échoué..");
      this.fg.markAllAsTouched();

    }
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
    const message = `Voulez-vous vraiment supprimer votre compte?`;

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


  onChange($event: any): void {
    const file = $event.target.files[0];
    this.fileSize = file.size;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e: any) => {
      this.fg.get('imageProfil')?.setValue(e.target.result);
    }
  }

  onClick(): void {
    this.inputClicked = true;
  }

  checkFileSize(c: AbstractControl): { [key: string]: boolean } | null {
    if (this.fileSize > 1024 * 1024) {
      return { imageBig: true };
    }
    return null;
  }


  readDefaultImageAsBase64(): Promise<any> {
    return new Promise((resolve, reject) => {
      const imgPath = 'assets/images/utilisateur.png';
      fetch(imgPath)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result;
            this.fg.get('imageProfil')?.setValue(base64data);
            resolve(true);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  ChangeImageProfil(): void {
    this._userService.postChangeImage(this.fg.value).subscribe((response: any) => {
      toastr.success("L'image de votre profil a bien été modifiée");
      this._userService.active = true;
    }, (error) => {
      toastr.error(error.error.message);
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }


}
