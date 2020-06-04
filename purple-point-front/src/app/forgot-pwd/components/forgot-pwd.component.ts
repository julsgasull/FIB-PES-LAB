import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';
import { UserData } from 'src/app/models/userdata.interface';
import { MustMatch } from 'src/app/common/must-match.validator';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss']
})
export class ForgotPwdComponent implements OnInit {

  public isSubmitted = false;
  public passwordForm: FormGroup;
  public wrongCredentials = false;
  public internalError = false;
  geolocation: GeoLocation = ({
    latitude: -1, 
    longitude: -1, 
    accuracy: -1,
    timestamp: -1
  });

  constructor (
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: Router,
    private utilsService : UtilsService,
    private translate: TranslateService,
    private geoLocationService: GeoLocationService
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.geolocation = this.geoLocationService.startGeoLocationService(this.geolocation);
  }

  private createUserForm() {
    const userFormValue = JSON.parse(JSON.stringify(this.passwordForm.value));
    const userData: UserData = {
      email:    userFormValue.email,
      password: this.utilsService.encryptSha256(userFormValue.password)
    }
    return userData;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.passwordForm.valid){
      const userInfo = this.createUserForm();
      this.userService.getUserByEmail(userInfo.email).subscribe((userResponse: any) => {
        if (userResponse.status !== 404) {
          userInfo.id = userResponse.id;
          userInfo.username = userResponse.username;
          userInfo.name = userResponse.name;
          userInfo.gender = userResponse.gender;
          userInfo.helpedUsers = userResponse.helpedUsers;
          userInfo.lastLocation = userResponse.lastLocation;
          userInfo.markedSpots = userResponse.markedSpots;
          userInfo.profilePic = userResponse.profilePic;
          userInfo.token = userResponse.token;
          this.userService.editProfile(userInfo).subscribe((response: UserData) => {
            alert(this.translate.instant('alerts.changedPwd'))
            this.redirectToLogin();
          },
          errorrResponse => {
            if (errorrResponse.status == 403 || errorrResponse.status == 404)this.wrongCredentials = true;
            else this.internalError= true;
          });
        }
      })
    }
  }

  get formControls() {
    return this.passwordForm.controls;
  }

  setSubmittedToFalse() { 
    this.isSubmitted = false; 
  }

  redirectToLogin() {
    this.route.navigate(['/login']);
  }

}
