import { Component, OnInit } from '@angular/core';
import { SessionService } from '../Services/session.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLogged: boolean = false;

  constructor(public session: SessionService) { }

  ngOnInit(): void {
    this.session.isLogged.subscribe(loggedIn => {
      this.isLogged = loggedIn;
    });
  }

  deconnecter(){
    this.session.clear();
  }

}
