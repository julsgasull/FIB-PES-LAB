declare var require: any
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/userData.interface';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';
import { GeoLocation } from 'src/app/models/geoLocation.interface';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  profileImage: any;
  public userInfo: UserData;
  geolocation: GeoLocation = ({
    latitude: -1, 
    longitude: -1, 
    accuracy: -1,
    timestamp: -1
  });

  constructor(
    private route: Router,
    private userService: UserService,
    private geoLocationService: GeoLocationService
  ) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');
    this.userService.getUserByEmail(userEmail).subscribe((response: UserData) => {
      this.userInfo = response;
      this.profileImage = 'data:'+this.userInfo.profilePic.type +';base64,' + this.userInfo.profilePic.picByteB64;
    });

    this.geolocation = this.geoLocationService.startGeoLocationService(this.geolocation);
  }

  logout() {
    this.route.navigate(['/principal']);
    this.userInfo.token = null;
    localStorage.setItem('token', null); 
  }

  redirectToProfile() {
    this.route.navigate(['/profile']);
  }
  redirectToMap() {
    this.route.navigate(['/map']);
  }
  redirectToWiki() {
    //to-do
  }
}
