import { Component, OnInit } from '@angular/core';
import { UserForm } from '../Models/UserForm';
import { SessionService } from '../Services/session.service';
import { UserService } from '../Services/user.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  users : UserForm [] =[];
  isLogged: boolean = false;

  constructor(private _userService : UserService, public session: SessionService) { }

  ngOnInit(): void {
      
    this.session.isLogged.pipe(
      switchMap(loggedIn => {
        this.isLogged = loggedIn;
        if (loggedIn) {
          return this._userService.getUsersWithMessage();
        }
        return []; 
      })
    ).subscribe(data => this.users = data);

  }

}
