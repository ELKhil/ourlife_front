import { MessagesService } from './../Services/messages.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Message } from '../Models/Message';
import { SessionService } from '../Services/session.service';
import { NotificationService } from '../Services/notificationService';
import { ChangeDetectorRef } from '@angular/core';

declare var toastr: any;

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {

 messageId!: number;
 private sub!: Subscription;
 allMessages!: Message [];
 messageNotification: number = 0;
 envoyerMessage: string = " ";
  
 constructor(private route: ActivatedRoute ,
             private _messageService : MessagesService,
             public session: SessionService,
             private notificationService : NotificationService,
             private cd: ChangeDetectorRef) {}

 

  ngOnInit(): void {


    this.sub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.messageId = +id;
        this._messageService.get(this.messageId).subscribe(
          data => {
            this.allMessages = data.messages;
            const readCount = data.readCount;
          // Récupérez le count actuel depuis le service
          const currentCount = this.notificationService.getCurrentCount();

          // Soustrayez readCount de currentCount et assurez-vous que le résultat n'est pas négatif
          const newCount = Math.max(0, currentCount - readCount);

          // Mettez à jour le service avec la nouvelle valeur
          this.notificationService.updateNotificationCount(newCount);

          this.notificationService.updateUserUnreadCount(this.messageId, 0);
          this.cd.detectChanges();

          });
        console.log("allMessages ; ", this.allMessages)
      } 
    });
  }
  
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe(); // Important ! N'oubliez pas de vous désabonner
    }
  }


  submit(){
    if(this.envoyerMessage){
      console.log("contenuMessage , " , this.envoyerMessage)

      let message: any = {
        contenu: this.envoyerMessage,
        sentToId : this.messageId,
      }
      // Envoie de message
     
      this._messageService.post(message).subscribe({
        next: (p) => { 
          this._messageService.get(this.messageId).subscribe(data => {
            this.allMessages = data.messages;
            this.envoyerMessage = " ";
            toastr.success("Message envoyé ...");
            
            //this.isLoading = false;
            });
            },
            error: () => {
                toastr.error("Something wrong");
                //this.isLoading = false;
            }
        });
        } else {
        toastr.error("Erreur message..");
        //this.isLoading = false;
        }

    }
  }


