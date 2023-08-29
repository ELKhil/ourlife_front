import { Component, OnInit } from '@angular/core';
import { SessionService } from '../Services/session.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLogged: boolean = false;
  messageNotification : number = 0

  constructor(public session: SessionService, private _userService : UserService,) { }

  ngOnInit(): void {
    this.session.isLogged.subscribe(loggedIn => {
      this.isLogged = loggedIn;
    });

    this._userService.getMessageNotification().subscribe(
      data => this.messageNotification = data
    )


  }

  deconnecter(){
    this.session.clear();
  }

  toggleNavbar() {
    const navbar = document.getElementById('navbarText');
    if (navbar) {
      navbar.classList.toggle('show');
    }
  }

}
