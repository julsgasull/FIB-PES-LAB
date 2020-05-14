import { Injectable } from '@angular/core';
import { NotificationsRemote } from './notifications.remote';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  

  constructor(private notificationsRemote: NotificationsRemote) { }

  updateFireBaseToken(refreshedToken, oldToken) {
    this.notificationsRemote.updateFireBaseToken(refreshedToken, oldToken);
  }

  registerFirebaseToken(token) {
    this.notificationsRemote.registerFirebaseToken(token);
  }

  increaseHelped() {
    this.notificationsRemote.increaseHelped();
  }

  sendNotificationToVictim(token) {
    this.notificationsRemote.sendNotificationToVictim(token);
  }

}
