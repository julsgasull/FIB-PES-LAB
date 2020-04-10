declare var require: any
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/userData.interface';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  // images
  profileImage/* = require(agafar foto de perfil de la bd)*/;

  genders = ['Male', 'Female', 'Non binary', 'Other'];
  public userInfo: UserData;
  public disableInputs: boolean = true;
  public enableSaveButton: boolean = false;

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
  redirectToPrincipalView() {
    this.route.navigate(['']);
  }

  editarPerfil() {
    this.disableInputs = false;
    this.enableSaveButton = true;
  }

  saveChanges() {
    this.enableSaveButton = false;
    this.disableInputs = true;
  }

  logout() {
    this.redirectToPrincipalView();
    this.userInfo.token = null;
    localStorage.setItem('token', null); 
  }

}
