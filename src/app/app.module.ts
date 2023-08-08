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
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ConfirmDialogComponent,
    RegisterComponent,
    
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
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
