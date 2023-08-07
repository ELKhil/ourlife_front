
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../Services/session.service';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.scss']
})
export class ShowInfoComponent implements OnInit {

  constructor(public session: SessionService) { }



  ngOnInit(): void {
  }



}
