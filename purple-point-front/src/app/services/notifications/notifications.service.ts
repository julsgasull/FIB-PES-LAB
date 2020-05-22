import { Injectable } from '@angular/core';
import { NotificationsRemote } from './notifications.remote';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  

  constructor(private notificationsRemote: NotificationsRemote) { }

  updateFireBaseToken(refreshedToken, oldToken) {
    this.notificationsRemote.updateFireBaseToken(refreshedToken, oldToken).subscribe((response) => {},
    (error) => { console.log("error: ", error); }
    );
  }

  registerFirebaseToken(token) {
    this.notificationsRemote.registerFirebaseToken(token).subscribe((response) => {},
    (error) => { console.log("error: ", error); }
    );
  }

  increaseHelped() {
    this.notificationsRemote.increaseHelped().subscribe((response) => {},
    (error) => { console.log("error: ", error); }
    );
  }

  sendNotificationToVictim(token) {
    this.notificationsRemote.sendNotificationToVictim(token).subscribe((response) => {},
    (error) => { console.log("error: ", error); }
    );
  }

}
