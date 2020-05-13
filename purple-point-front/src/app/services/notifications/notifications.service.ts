import { Injectable } from '@angular/core';
import { NotificationsRemote } from './notifications.remote';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  

  constructor(private notificationsRemote: NotificationsRemote) { }

  saveFireBaseToken(token, oldToken) {
    this.notificationsRemote.saveFireBaseToken(token, oldToken);
  }

  increaseHelped() {
    this.notificationsRemote.increaseHelped();
  }

  sendNotificationToVictim(token) {
    this.notificationsRemote.sendNotificationToVictim(token);
  }

}
