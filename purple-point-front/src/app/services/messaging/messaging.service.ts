import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SnackbarService } from '../snackbar/snackbar.service';
      
@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(
    private httpClient: HttpClient,
    private snackbarService: SnackbarService,
    private zone: NgZone,
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging) {
      this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage((payload) => {
          this.zone.run(() => {
            this.snackbarService.openSnackbar(payload.notification.title, payload.notification.body, payload.data);
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

  updateToken(token): any/*Observable<any>*/ {
    console.log("Estas updateando el token");
    // we can change this function to request our backend service
    /*return this.httpClient.put<string>(`${environment.API_URL}/device/token/`, //endpoint a realizar
    {   
      'token': token
    },
    {
        headers:{
          'Content-Type':"application/json"
        }
    });*/
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