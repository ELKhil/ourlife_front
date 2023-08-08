
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForm } from '../Models/UserForm';
import { LoginService } from '../Services/login.service';
import { SessionService } from '../Services/session.service';
import { UserService } from '../Services/user.service';

declare var toastr : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  fg!: UntypedFormGroup;

  users : UserForm [] =[];

  constructor(
    private fb: UntypedFormBuilder,
    private loginService: LoginService,
    private session: SessionService,
    private router: Router,
    private _userService : UserService
  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submit() {
    if(this.fg.invalid) 
      return;
    this.loginService.login(this.fg.value).subscribe({
      next: (auth) => {
        this.session.save(auth.token);
        toastr.success("Vous etes bien connecté.e")
        this.router.navigateByUrl('');
      },
      error: () => {
        console.log('La connexion a échoué...');
      }
    })
  }

 
}
