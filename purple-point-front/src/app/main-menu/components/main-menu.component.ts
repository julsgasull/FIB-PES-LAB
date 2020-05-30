declare var require: any
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/userData.interface';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

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
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');
    this.userService.getUserByEmail(userEmail).subscribe((response: UserData) => {
      this.userInfo = response;
      this.profileImage = 'data:'+this.userInfo.profilePic.type +';base64,' + this.userInfo.profilePic.picByteB64;
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

  redirectToMapOnPanic() {
    // tot això anirà fora
    let data = {
      title:      "notification.title",
      body:       "notification.body",
      longitude:  2.175,
      latitude:   41.41
    }
    this.snackbarService.openSnackbar(data);
  }
}
