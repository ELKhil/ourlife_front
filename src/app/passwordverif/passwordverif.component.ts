import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { ActivatedRoute } from '@angular/router';

declare var toastr: any;

@Component({
  selector: 'app-passwordverif',
  templateUrl: './passwordverif.component.html',
  styleUrls: ['./passwordverif.component.css']
})
export class PasswordverifComponent implements OnInit {
  isLoading: boolean = false;
  fg!: FormGroup;
  messageInfo!: string;
 

  constructor( private fb: FormBuilder, 
    private userService: UserService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.fg = this.fb.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      restToken: [''],
    }, { validators: [this.checkPassword] });
  }

  submit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    
    this.isLoading = true;
    if (this.fg.valid && token) {
      this.fg.controls['restToken'].setValue(token);
      this.userService.postNewPassword(this.fg.value).subscribe((response: any) => {
        this.messageInfo = response.message;
        toastr.success("Votre mot de passe a bien été réinitialisé");
        this.userService.active = true;
        this.isLoading = false;
      
      },
      (error) => {
        toastr.error("L'inscription a échoué..!!");
        this.isLoading = false;
      });
    } else {
      toastr.error("L'inscription a échoué..");
      this.fg.markAllAsTouched();
      this.isLoading = false;
    }
  }

  checkPassword(c: FormGroup): { [key: string]: boolean } | null {
    if (c.get('password')?.value !== c.get('confirmPassword')?.value) {
      return { notSamePassword: true };
    }
    return null;
  }

}
