import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private currentCount: number = 0;
  private notificationSubject = new Subject<number>();
  private unreadMessagesPerUser: { [userId: number]: number } = {};
  private userNotificationSubject = new Subject<{ userId: number, unreadCount: number }>();

  userNotification$ = this.userNotificationSubject.asObservable();
  notification$ = this.notificationSubject.asObservable();

  updateNotificationCount(count: number) {
    console.log("Updating notification count to", count);
    this.currentCount = count;
    this.notificationSubject.next(count);
  }
  
  getCurrentCount(): number {
    return this.currentCount;
  }
  
  setCount(count: number) {
    this.currentCount = count;
  }


  //pour les notification d'un utilisateur :
  updateUserUnreadCount(userId: number, unreadCount: number) {
    this.unreadMessagesPerUser[userId] = unreadCount;
    this.userNotificationSubject.next({ userId, unreadCount }); // emit the updated count
  }
  
  getUserUnreadCount(userId: number): number {
    return this.unreadMessagesPerUser[userId] || 0;
  }
  
  // Cette méthode peut être utile pour mettre à jour tous les utilisateurs en même temps, par exemple, après avoir récupéré les données du backend.
  setAllUserUnreadCounts(counts: { [userId: number]: number }) {
    this.unreadMessagesPerUser = { ...counts };
  }
  
}
