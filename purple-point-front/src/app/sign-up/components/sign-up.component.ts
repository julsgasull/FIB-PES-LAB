import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './../../common/must-match.validator';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/userdata.interface';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';
import { MatDialog } from '@angular/material/dialog';
import { TermsOfUseComponent } from 'src/app/common/components/terms-of-use/components/terms-of-use.component';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isSubmitted = false;
  userForm: FormGroup;
  agreed = false;
  geolocation: GeoLocation = ({
    latitude: -1, 
    longitude: -1, 
    accuracy: -1,
    timestamp: -1
  });


	constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private route: Router,
    private utilsService : UtilsService,
    private translate: TranslateService,
    private geoLocationService: GeoLocationService,
    private termsOfUse: MatDialog)
     {}
    
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
			username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      gender: [null, [Validators.required]],
      agree: ['', [Validators.required]]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
    this.geolocation = this.geoLocationService.startGeoLocationService(this.geolocation);
  }


  private createUserForm() {
    const userFormValue = JSON.parse(JSON.stringify(this.userForm.value));
    const userData: UserData = {
      email: userFormValue.email,
      name: userFormValue.name,
      username: userFormValue.username,
      password: this.utilsService.encryptSha256(userFormValue.password),
      gender: userFormValue.gender
    }
    return userData;
  }

  showUseOfTerms() {
    this.termsOfUse.open(TermsOfUseComponent, 
      {
        disableClose: true,
        autoFocus: false,
        panelClass: ['termsOfUse'],
        position: {
          'top': '7%'
        },
        // width: '450px',
        height: '90%'
      });
  }

  setCheckboxToFalse(checked: any) {
    this.agreed = checked;
    if (!checked) {
      this.isSubmitted = false;
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.userForm.valid && this.agreed) {
      this.userService.createUser(this.createUserForm()).subscribe((response: any) => {
        if (response.status !== 400 && response.status !== 500 && response.status !== 501) {
          alert(this.translate.instant('alerts.createdUser'));
          this.redirectToLogin();
        }
      });
    }
  }

  setSubmittedToFalse() {
    this.isSubmitted = false;
  }

  get formControls() { return this.userForm.controls; }

  redirectToLogin() { this.route.navigate(['/login']); }

}
