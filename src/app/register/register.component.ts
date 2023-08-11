import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service'
import { UserForm } from '../Models/UserForm';
import { Router } from '@angular/router';


declare var toastr : any;



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
  
})


export class RegisterComponent implements OnInit {

  users : UserForm [] =[];
  fg! : UntypedFormGroup;
  inputClicked : boolean = false;
  fileSize : number = 0;
  fileType : string = "";
  
  constructor(
    private _userService : UserService, private fb: UntypedFormBuilder, public _router: Router
  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      nom: [null, [Validators.minLength(2), Validators.maxLength(30), Validators.required]],
      nomUtilisateur: [null,  Validators.required],
      mdp: [null, Validators.required],
      confirmMdp: [null, Validators.required],

      imageProfil: new UntypedFormControl(null, {
      validators: [Validators.required, this.checkFileSize]
         // <-------
      })
      
    }, {validators: this.checkPassword});

    //this.userService.get().subscribe(data=>this.users = data);
  }

 

  submit(){

    if(this.fg.valid){
        
        this._userService.post(this.fg.value).subscribe(()=>{
        toastr.success("Vous etes bien enregistré.e");
        this._userService.active = true;
        this._router.navigateByUrl('login');
     
    });
    }else{
      toastr.error("L'inscription a échoué..")
      this.fg.markAllAsTouched();
    }

  }
  
  onChange($event: any) {
    let file = $event.target.files[0];
    //Récupérer la taille et le type de fichier
    this.fileSize = file.size;
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e: any) => {
      this.fg.get('imageProfil')?.setValue(e.target.result);
    }
  }
  onClick(){
      this.inputClicked = true;
  }

  checkPassword(c : UntypedFormGroup) {
    console.log("je suis dans le checkpassword");
    if(c.get('mdp')?.value !== '' && c.get('confirmMdp')?.value !== ''){
      if(c.get('mdp')?.value !== c.get('confirmMdp')?.value){
        console.log("pas le meme mot de psasse");
        return { notsamepassword : true}
      }
      else return null;

    }
    return null;
  }

  checkFileSize (){
    return (c : AbstractControl)=>{
          console.log(this.fileSize);
          if( this.fileSize > 1024 * 1024){

            return {imageBig : true};
          }else{
            return null;
          }
  }
  }


  


}
