import { Component, OnInit } from '@angular/core';
import { SessionService } from '../Services/session.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public session: SessionService) { }

  ngOnInit(): void {

  }

  deconnecter(){
    this.session.clear();
  }

}
