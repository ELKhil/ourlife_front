
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../Services/session.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.scss']
})
export class ShowInfoComponent implements OnInit {

  
  isLogged: boolean = false;

  constructor(public session: SessionService,  private _userService : UserService) { }



  ngOnInit(): void {
   console.log('ngOnInit called', this.session.isLogged);
   this.session.isLogged.subscribe(loggedin => {
    this.isLogged = loggedin
  });
  
}


}
