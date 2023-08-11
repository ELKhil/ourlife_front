import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MakePosterComponent } from './make-poste/make-poste.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  {path:"", component: AccueilComponent},
  {path:"accueil", component: AccueilComponent},
  {path:"register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "posts", component: PostsComponent, },
  {path: "makePoster", component: MakePosterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
