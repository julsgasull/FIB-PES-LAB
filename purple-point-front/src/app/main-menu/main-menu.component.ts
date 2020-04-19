declare var require: any
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/userData.interface';


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

  constructor(
    private route: Router,
    private userService: UserService
  ) {}


  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');
    this.userService.getUserByEmail(userEmail).subscribe((response: UserData) => {
      this.userInfo = response;
    });
  }

  logout() {
    this.route.navigate(['']);
    this.userInfo.token = null;
    localStorage.setItem('token', null); 
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
