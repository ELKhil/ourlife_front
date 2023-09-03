import { NotificationService } from './../Services/notificationService';
import { Component, OnInit } from '@angular/core';
import { UserForm } from '../Models/UserForm';
import { SessionService } from '../Services/session.service';
import { UserService } from '../Services/user.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.css']
})
export class NotificationMessageComponent implements OnInit {

  selectedUserId: number | null = null;
  users : UserForm [] =[];
  isLogged: boolean = false;
  private sub!: Subscription;

  constructor(private _userService : UserService, public session: SessionService,
    private notificationService: NotificationService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {

      this.sub = this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.selectUser(parseInt(id));
        }
      });

      this.session.isLogged.pipe(
        switchMap(loggedIn => {
          this.isLogged = loggedIn;
          if (loggedIn) {
            return this._userService.getUsersWithMessage();
          }
          return [];
        })
      ).subscribe(data => {
        this.users = data;
    
        // Mettez à jour le service de notification avec les comptes de messages non lus
        const counts = data.reduce<{ [key: number]: number }>((acc, user) => {
          acc[user.id] = user.unreadCount;
          return acc;
        }, {});
        this.notificationService.setAllUserUnreadCounts(counts);
      });
    
      // Subscribe to user notification updates
      this.notificationService.userNotification$.subscribe(update => {
        const user = this.users.find(u => u.id === update.userId);
        if (user) {
          user.unreadCount = update.unreadCount;
        }
      });
    }

    selectUser(id: number): void {
      this.selectedUserId = id;
    }
    
}
