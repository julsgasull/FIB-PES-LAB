import { Injectable } from '@angular/core';
import { NotificationsRemote } from './notifications.remote';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  

  constructor(private notificationsRemote: NotificationsRemote) { }

  updateFireBaseToken(refreshedToken, oldToken) {
    this.notificationsRemote.updateFireBaseToken(refreshedToken, oldToken).subscribe((response) => {
      console.log("ESTA ES MI RESPONSE PEDAZO DE MIERDA: ", response);
    },
    (error) => {
      console.log("HE FALLADO PEDAZO DE GUARRA: ", error);
    });
  }

  registerFirebaseToken(token) {
    this.notificationsRemote.registerFirebaseToken(token).subscribe((response) => {
      console.log("ESTA ES MI RESPONSE PEDAZO DE MIERDA: ", response);
    },
    (error) => {
      console.log("HE FALLADO PEDAZO DE GUARRA: ", error);
    });
  }

  increaseHelped() {
    this.notificationsRemote.increaseHelped().subscribe((response) => {
      console.log("ESTA ES MI RESPONSE: ", response);
    },
    (error) => {
      console.log("ALERTA POR SUBNORMAL: ", error);
    });
  }

  sendNotificationToVictim(token) {
    this.notificationsRemote.sendNotificationToVictim(token);
  }

}
