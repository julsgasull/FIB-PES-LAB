import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { UserData } from '../../models/userData.interface';
import { Router } from '@angular/router';
import { GeoLocation } from '../../models/geolocation.interface';
import { GeoLocationService } from '../../services/geolocation/geolocation.service'
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  isSubmitted = false;
  loginFrom: FormGroup;
  //geolocation: GeoLocation = new GeoLocation();
  

  constructor (
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: Router,
    private geoLocationService: GeoLocationService
  ) {}

  ngOnInit(): void {
    //function location here
    this.loginFrom = this.formBuilder.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  private createUserForm() {
    const userFormValue = JSON.parse(JSON.stringify(this.loginFrom.value));
    const userData: UserData = {
      email:    userFormValue.email,
      password: userFormValue.password
    }
    return userData;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFrom.valid){
      // How to do a request
      this.userService.loginUser(this.createUserForm()).subscribe((response: UserData) => {
        localStorage.setItem('userEmail', response.email);
        localStorage.setItem('token', response.token);
        this.geoLocationService.mockGetPosition(this.geolocation);
        this.redirectToMainMenu();
      });
    } else {
      alert("not authenticated");
    }
  }

  setSubmittedToFalse() { 
    this.isSubmitted = false; 
  }

  get formControls() {
    return this.loginFrom.controls;
  }

  redirectToUserInfo() {
    this.route.navigate(['/profile']);
  }

  redirectToMainMenu() {
    this.route.navigate(['/mainmenu']);
  }

}