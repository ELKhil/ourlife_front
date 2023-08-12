import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { UserForm } from '../Models/UserForm';

declare var toastr: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  fg!: FormGroup;
  inputClicked: boolean = false;
  fileSize: number = 0;
  messageInfo!: string;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      firstname: [null, [Validators.minLength(2), Validators.maxLength(30), Validators.required]],
      lastname: [null, [Validators.minLength(2), Validators.maxLength(30), Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      confirmEmail: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      imageProfil: [null, [Validators.required, this.checkFileSize.bind(this)]]
    }, { validators: [this.checkPassword, this.checkEmails] });
  }

  submit(): void {
    if (this.fg.valid) {
      this.userService.post(this.fg.value).subscribe((response: any) => {
        this.messageInfo = response.message;
        toastr.success("Veuiilez valider votre email ...");
        this.userService.active = true;
        
      },
      (error) => {
        toastr.error("L'inscription a échoué..!!");
      });
    } else {
      toastr.error("L'inscription a échoué..");
      this.fg.markAllAsTouched();
    }
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

  checkPassword(c: FormGroup): { [key: string]: boolean } | null {
    if (c.get('password')?.value !== c.get('confirmPassword')?.value) {
      return { notSamePassword: true };
    }
    return null;
  }

  checkEmails(c: FormGroup): { [key: string]: boolean } | null {
    if (c.get('email')?.value !== c.get('confirmEmail')?.value) {
      return { emailsNotMatching: true };
    }
    return null;
  }

  checkFileSize(c: AbstractControl): { [key: string]: boolean } | null {
    if (this.fileSize > 1024 * 1024) {
      return { imageBig: true };
    }
    return null;
  }
}
