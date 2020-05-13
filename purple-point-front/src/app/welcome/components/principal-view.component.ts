import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'principal-view',
  templateUrl: './principal-view.component.html',
  styleUrls: ['./principal-view.component.scss']
})
export class PrincipalViewComponent implements OnInit {

  message;
  readonly VAPID_PUBLIC_KEY = "BEgN4WXXXJDXda6Kume2gWGGT4-aCDjvhUFWIhfCHfoUMeCnwOCf8bI2Ir0jU3bXF1tlJ2uWsglCV_0VuU21hfk";

  constructor(
    private route: Router,
    private messagingService: MessagingService
  ) { }

  ngOnInit(): void {
    localStorage.setItem('token', null);
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  redirectToLogin() {
    this.route.navigate(['/login']);
  }
  redirectToSignUp() {
    this.route.navigate(['/signup']);
  }
  redirectToProfile() {
    this.route.navigate(['/profile']);
  }

}
