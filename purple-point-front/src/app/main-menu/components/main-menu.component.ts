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

  profileImage: any;

  public userInfo: UserData;

  constructor(
    private route: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');
    this.userService.getUserByEmail(userEmail).subscribe((response: UserData) => {
      this.userInfo = response;
      //console.log("userinfo image", this.userInfo.profilePic.picByte);
      this.profileImage = 'data:'+this.userInfo.profilePic.type +';base64,' + this.userInfo.profilePic.picByte;
      //console.log("profile image", this.profileImage);
    });
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
