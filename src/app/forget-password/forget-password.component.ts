import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service';

declare var toastr: any;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  fg!: FormGroup;
  messageReponse!: string;
  isLoading: boolean = false;

  constructor(  
     private fb: FormBuilder,
     private userService : UserService,) 
     {
      this.fg = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    
    }); 
  }

  ngOnInit(): void {

    
  }

  sendResetLink(): void {
    if (this.fg.valid) {
      const email = this.fg.value.email;
      // Traitez la demande ici, comme l'envoi d'une requête à votre backend
     // On active le chargement  
      this.isLoading = true;
      this.userService.forgetPassword(email).subscribe((response: any) => {
      
        this.messageReponse = response.message;
        this.isLoading = false;
        toastr.success("Email envoyé");
      },
      (error) => {
        this.isLoading = false;
        toastr.error(error.error.message);
      });
    }else {
      this.isLoading = false;
      toastr.error('Form is not valid.');
    }
  }

}
