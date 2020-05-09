import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/shared/messaging.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'principal-view',
  templateUrl: './principal-view.component.html',
  styleUrls: ['./principal-view.component.scss']
})
export class PrincipalViewComponent implements OnInit {

  message;

  constructor(
    private route: Router,
    private messagingService: MessagingService
  ) { }

  ngOnInit(): void {
    this.messagingService.requestPermission();
    console.log("Recieve");
    this.messagingService.receiveMessage();
    console.log("recieving");
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
