import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { UserForm } from '../Models/UserForm';
import { SchoolBranch } from '../Models/SchoolBranch';
import { SchoolBranchService } from '../Services/schoolBranch.service';

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
  isLoading: boolean = false;
  branches: SchoolBranch[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public router: Router,
    private branchService: SchoolBranchService,
  ) { }

  ngOnInit(): void {

      this.branchService.get().subscribe((data: SchoolBranch[]) => {
        this.branches = data;
      });


    this.fg = this.fb.group({
      firstname: [null, [Validators.minLength(2), Validators.maxLength(30), Validators.required]],
      lastname: [null, [Validators.minLength(2), Validators.maxLength(30), Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      confirmEmail: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      imageProfil: [null, [this.checkFileSize.bind(this)]],
      branch: [null, Validators.required]
    }, { validators: [this.checkPassword, this.checkEmails] });
  }

  submit(): void {
    this.isLoading = true;
    if (this.fg.valid) {
      if (!this.fg.get('imageProfil')?.value) {
        this.readDefaultImageAsBase64().then(() => {
          this.postUserForm();
        });
      } else {
        this.postUserForm();
      }
    } else {
      toastr.error("L'inscription a échoué..");
      this.fg.markAllAsTouched();
      this.isLoading = false;
    }
  }


  postUserForm(): void {
    this.userService.post(this.fg.value).subscribe((response: any) => {
      this.messageInfo = response.message;
      toastr.success("Veuillez valider votre email ...");
      this.userService.active = true;
      this.isLoading = false;
    }, (error) => {
      toastr.error(error.error.message);
      this.isLoading = false;
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
}
