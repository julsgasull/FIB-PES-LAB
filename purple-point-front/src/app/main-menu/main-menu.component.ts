declare var require: any
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/userData.interface';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  // images
  profileImage/* = require(agafar foto de perfil de la bd)*/;
  expandImage   = require("../../../images/expand.svg");
  mapImage      = require("../../../images/map.svg");
  wikiImage     = require("../../../images/wiki.svg");

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
    });

    const timeout = 5 * 1000; // in ms
    
    setInterval(() => {
      this.geoLocationService.getLocation(this.geolocation);
    }, timeout);
  }

  redirectToProfile() {
    this.route.navigate(['/profile']);
  }
  redirectToMap() {
    //to-do
  }
  redirectToWiki() {
    //to-do
  }
}
