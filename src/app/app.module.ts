import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ShowUsersComponent } from './show-users/show-users.component';
import { ShowInfoComponent } from './show-info/show-info.component';
import { PostsComponent } from './posts/posts.component';
import { MakePosterComponent } from './make-poste/make-poste.component';
import { CalculeTimePipe } from './pipe/calcule-time.pipe';
import { ToImagePipe } from './pipe/to-image.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccueilComponent } from './accueil/accueil.component';
import { VerifyTokenComponent } from './verify-token/verify-token.component';
import { PublicationComponent } from './publication/publication.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PasswordverifComponent } from './passwordverif/passwordverif.component';
import { SoutenirComponent } from './soutenir/soutenir.component';
import { SucessDonationComponent } from './sucess-donation/sucess-donation.component';
import { ToVideoPipe } from './pipe/to-video.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    ShowUsersComponent,
    ShowInfoComponent,
    PostsComponent,
    MakePosterComponent,
    CalculeTimePipe,
    ToImagePipe,
    ToVideoPipe,
    ConfirmDialogComponent,
    RegisterComponent,
    AccueilComponent,
    VerifyTokenComponent,
    PublicationComponent,
    ForgetPasswordComponent,
    PasswordverifComponent,
    SoutenirComponent,
    SucessDonationComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
