import { Component, OnInit } from '@angular/core';
import { SessionService } from '../Services/session.service';
import { UserService } from '../Services/user.service';
import { NotificationService } from '../Services/notificationService';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLogged: boolean = false;
  messageNotification: number = 0;

  constructor(public session: SessionService, 
              private _userService : UserService,
              private notificationService : NotificationService) { }

              ngOnInit(): void {
                this.messageNotification = this.notificationService.getCurrentCount();
              
                this.session.isLogged.subscribe(loggedIn => {
                  this.isLogged = loggedIn;
              
                  if (this.isLogged) {
                    this._userService.getMessageNotification().subscribe(data => {
                      this.messageNotification = data - this.notificationService.getCurrentCount();
                      this.notificationService.setCount(this.messageNotification);
                    });
              
                    // S'abonner aux mises à jour
                    this.notificationService.notification$.subscribe(count => {
                      this.messageNotification = count;
                    });
                  }
                });
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
