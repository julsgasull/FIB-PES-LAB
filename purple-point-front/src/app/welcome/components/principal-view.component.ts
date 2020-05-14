import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';
import { GeoLocation } from 'src/app/models/geoLocation.interface';

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
    private geoLocationService: GeoLocationService
  ) { }

  ngOnInit(): void {
    localStorage.setItem('token', null);
    // console.log("FB Token before erasing:", localStorage.getItem('deviceToken'));
    // localStorage.setItem('deviceToken', null);
    console.log("FB Token after delete", localStorage.getItem('deviceToken'));
    
    this.geolocation = this.geoLocationService.getFirstLocation(this.geolocation);
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

    const timeout = 5 * 1000; // in ms

    // this.geoLocationService.getLocation(this.geolocation);
    
    // setInterval(() => {
    //   this.geoLocationService.getLocation(this.geolocation).subscribe((location: GeoLocation) => {
    //     this.geolocation = location;
    //   });
    // }, timeout);
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
