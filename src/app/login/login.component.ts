
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
  isLoading: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private loginService: LoginService,
    private session: SessionService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  submit() {
    this.isLoading = true;

    if (this.fg.invalid) {
        this.isLoading = false;
        return;
    }

    this.loginService.login(this.fg.value).subscribe({
      next: (auth) => {
          this.session.save(auth.token);
          toastr.success("Vous êtes bien connecté.e");
          this.isLoading = false;
          // Redirection vers 'publication/posts'
          this.router.navigate(['publication/posts']);
      },
      error: (err) => {
          this.isLoading = false;
          
          // Utiliser une expression régulière pour extraire le message d'erreur
          const regex = /<!-- (.*?) -->/;
          const matches = err.error.match(regex);
          
          let errorMessage;
          if (matches && matches[1]) {
              errorMessage = matches[1];
          } else {
              errorMessage = 'La connexion a échoué ! Veuillez réessayer';
          }
  
          toastr.error(errorMessage, 'Erreur', { timeOut: 5000 });
      }
  });
  
  
}


 
}
