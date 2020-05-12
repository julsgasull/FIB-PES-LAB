import { Injectable } from '@angular/core';
import { NotificationsRemote } from './notifications.remote';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  

  constructor(private notificationsRemote: NotificationsRemote) { }

  saveFireBaseToken(token) {
    this.notificationsRemote.saveFireBaseToken(token);
  }

  increaseHelped() {
    this.notificationsRemote.increaseHelped();
  }

  sendNotificationToVictim(token) {
    this.notificationsRemote.sendNotificationToVictim(token);
  }

}
