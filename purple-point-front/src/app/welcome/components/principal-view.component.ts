import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { SocialOauthService } from '../../services/social-oauth/social-oauth.service'


@Component({
  selector: 'principal-view',
  templateUrl: './principal-view.component.html',
  styleUrls: ['./principal-view.component.scss']
})
export class PrincipalViewComponent implements OnInit {

  message;  
  geolocation: GeoLocation = ({
    latitude: -1, 
    longitude: -1, 
    accuracy: -1,
    timestamp: -1
  });

  constructor(
    private route: Router,
    private messagingService: MessagingService,
    private geoLocationService: GeoLocationService,
    private socialOauthService: SocialOauthService
  ) { }

  ngOnInit(): void {
    localStorage.setItem('token', null);
    
    this.geolocation = this.geoLocationService.getFirstLocation(this.geolocation);
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

    this.geolocation = this.geoLocationService.startGeoLocationService(this.geolocation);
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

  googleLogin() {
    this.socialOauthService.socialLogin();
  }
}
