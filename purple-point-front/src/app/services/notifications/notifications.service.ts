import { Injectable } from '@angular/core';
import { NotificationsRemote } from './notifications.remote';
import { Observable } from 'rxjs';
import { Device } from 'src/app/models/device.interface';
import { UserData } from 'src/app/models/userdata.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  

  constructor(private notificationsRemote: NotificationsRemote) { }

  updateFireBaseToken(refreshedToken, oldToken): Observable<Device> {
    return this.notificationsRemote.updateFireBaseToken(refreshedToken, oldToken);
  }

  registerFirebaseToken(token): Observable<Device> {
    return this.notificationsRemote.registerFirebaseToken(token);
  }

  increaseHelped(): Observable<UserData> {
    return this.notificationsRemote.increaseHelped();
  }

  sendNotificationToVictim(token): Observable<string> {
    return this.notificationsRemote.sendNotificationToVictim(token);
  }

}
