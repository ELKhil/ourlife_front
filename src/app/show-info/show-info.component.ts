
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

  constructor(public session: SessionService,  private _userService : UserService) { }



  ngOnInit(): void {
    if (!this.session.isLogged) {
      const codeImage = this.session.decodedToken.imageProfil; 
      this._userService.getUserProfileImage(codeImage).subscribe(url => {
        this.profileImageUrl = url;
      });
    }
  }
}
