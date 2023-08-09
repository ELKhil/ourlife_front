
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../Services/session.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.scss']
})
export class ShowInfoComponent implements OnInit {

  profileImageUrl?: string;
  isLogged: boolean = false;

  constructor(public session: SessionService,  private _userService : UserService) { }



  ngOnInit(): void {
   console.log('ngOnInit called', this.session.isLogged);
   this.session.isLogged.subscribe(loggedin => {
    this.isLogged = loggedin
    if(this.isLogged) {
      const codeImage = this.session.decodedToken.imageProfil;
      console.log('Fetching image with code:', codeImage); 
      this._userService.getUserProfileImage(codeImage).subscribe(url => {
         console.log('Image URL:', url);
        this.profileImageUrl = url;
      });
    }
  });
  
}


}
