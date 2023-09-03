import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessagesService } from '../Services/messages.service';
import { Message } from '../Models/Message';
import { SessionService } from '../Services/session.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {

 messageId!: number;
 private sub!: Subscription;
 allMessages!: Message [];
  
 constructor(private route: ActivatedRoute ,
             private _messageService : MessagesService,
             public session: SessionService) {}

 

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.messageId = +id;
        console.log("messageId =>", this.messageId);
        this._messageService.get(this.messageId).subscribe(
          data => this.allMessages = data
        );

        console.log("allMessages ; ", this.allMessages)

      } else {
        console.log(42);
      }
    });
  }
  
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe(); // Important ! N'oubliez pas de vous désabonner
    }
  }

}
