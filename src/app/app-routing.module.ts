import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MakePosterComponent } from './make-poste/make-poste.component';
import { AccueilComponent } from './accueil/accueil.component';
import { VerifyTokenComponent } from './verify-token/verify-token.component';
import { PublicationComponent } from './publication/publication.component';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PasswordverifComponent } from './passwordverif/passwordverif.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Redirige par défaut vers l'accueil
  { path: 'accueil', component: AccueilComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent,canActivate: [IsLoggedGuard] },
  { path: 'forgetPassword', component: ForgetPasswordComponent},
  { path: 'verif/:token', component: VerifyTokenComponent},
  {path : 'passwordverif/:token', component: PasswordverifComponent},
  {
    path: 'publication',
    component: PublicationComponent,  //  un composant de wrapper pour les sous-routes
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' }, // Redirige par défaut vers les posts
      { path: 'posts', component: PostsComponent },
      { path: 'makePoster', component: MakePosterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
