import { Injectable, NgZone } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import {HttpClient, HttpParams} from '@angular/common/http';
import { SnackbarService } from '../snackbar/snackbar.service';
import { NotificationsService } from '../notifications/notifications.service';
      
@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
  readonly VAPID_PUBLIC_KEY = "BJM5CDS_biG4eLsDbh5gbZVIJwzUuh9fI-fIALUoOg6wrCREkI02jI62Q9SaAmtDdL2GVHE8aGkmypfiRprTZ5g";

  constructor(
    private httpClient: HttpClient,
    private notificationsService: NotificationsService,
    private snackbarService: SnackbarService,
    private zone: NgZone,
    private angularFireMessaging: AngularFireMessaging) {
      this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.usePublicVapidKey(this.VAPID_PUBLIC_KEY);
        _messaging.onMessage = _messaging.onMessage((payload) => {
            this.zone.run(() => {
              _messaging.getToken().then((refreshedToken) => {
                if (refreshedToken != localStorage.getItem('deviceToken')) console.log("tu mama");
                console.log("Message on foreground: ", payload);
                console.log("Token: ", refreshedToken);
                let omw;
                if (payload.data.onMyWay){
                  omw = payload.data.onMyWay.toString();
                }
                console.log("onMyWay: ", omw);
                if (payload.data.onMyWay === "true") this.snackbarService.openSimpleSnackbar(payload.data);
                
                else this.snackbarService.openSnackbar(payload.data);
                
              });
            });
        }).bind(_messaging);
        _messaging.onMessage =_messaging.onTokenRefresh(() => {
          _messaging.getToken().then((refreshedToken) => {
            console.log("Refreshing token!", refreshedToken);
            this.updateToken(refreshedToken);
          });
        }).bind(_messaging);
      });
    }

  updateToken(refreshedToken): any/*Observable<any>*/ {
    console.log("Estas updateando el token");
    const oldToken: String = localStorage.getItem('deviceToken');
    console.log("oldToken: ", oldToken);
    console.log("refreshedToken: ", refreshedToken);

    if (oldToken === 'null') { // device not registered
      console.log("Quiero registrarme");
      localStorage.setItem('deviceToken', refreshedToken);
      this.notificationsService.registerFirebaseToken(refreshedToken);
    } else { // device registered
      console.log("Quiero updatear mi token existente");
      localStorage.setItem('deviceToken', refreshedToken);
      this.notificationsService.updateFireBaseToken(refreshedToken, oldToken);
    }
  }

  /*
   * request permission for notification from firebase cloud messaging
  */
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token); // Remember to erase to clean up code
        this.updateToken(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /*
   * hook method when new notification received in foreground
  */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        this.currentMessage.next(payload);
      })
  }
}