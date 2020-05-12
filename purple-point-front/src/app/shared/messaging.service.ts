import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SnackbarService } from '../services/snackbar/snackbar.service';
      
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
            this.snackbarService.openSnackbar(payload.notification.title, payload.notification.body);
          });
        }).bind(_messaging);
        _messaging.onMessage =_messaging.onTokenRefresh(() => {
          _messaging.getToken().then((refreshedToken) => {
            console.log("TokenRefreshed");
            this.updateToken(refreshedToken);
          });
        }).bind(_messaging);
      });
    }

  /*
   * update token in backend database
  */
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
        console.log(token);
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
    console.log("you are now inside the recieving method");
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
    console.log("you will now return");
  }
}