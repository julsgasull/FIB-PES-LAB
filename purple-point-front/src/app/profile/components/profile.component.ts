declare var require: any
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/userData.interface';
import { FormGroup, Validators, FormControl } from '@angular/forms';


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
  public editProfileForm: FormGroup;
  public isSubmitted: boolean = false;

  constructor(
    private route: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');
    this.userService.getUserByEmail(userEmail).subscribe((response: UserData) => {
      this.userInfo = response;
      this.editProfileForm = new FormGroup({
        id: new FormControl({ value: response.id, disabled: true}, Validators.required),
        name: new FormControl({ value: response.name, disabled: true}, Validators.required),
        email: new FormControl({ value: response.email, disabled: true}, Validators.required),
        username: new FormControl({ value: response.username, disabled: true}, Validators.required),
        password: new FormControl({ value: response.password, disabled: true}, Validators.required),
        gender: new FormControl({ value: response.gender, disabled: true}, Validators.required),
        markedSpots: new FormControl( {value: response.markedSpots, disabled: true}, Validators.required),
        helpedUsers: new FormControl( {value: response.helpedUsers, disabled: true}, Validators.required)
      });
    });
  }

  redirectToPrincipalView() {
    this.route.navigate(['']);
  }

  editarPerfil() {
    this.isSubmitted = false;
    if (this.disableInputs) {
      this.formControls.name.enable();
      this.formControls.username.enable();
      this.formControls.password.enable();
      this.formControls.gender.enable();
    }
    else {
      this.formControls.name.disable();
      this.formControls.username.disable();
      this.formControls.password.disable();
      this.formControls.gender.disable();
    }
    this.disableInputs = false;
    this.enableSaveButton = true;
  }

  private createUserForm() {
    const userData: UserData = {
      id: this.formControls.id.value,
      email: this.formControls.email.value,
      name: this.formControls.name.value,
      username: this.formControls.username.value,
      password: this.formControls.password.value,
      gender: this.formControls.gender.value,
      markedSpots: this.formControls.markedSpots.value,
      helpedUsers: this.formControls.helpedUsers.value,
    }
    return userData;
  }

  saveChanges() {
    this.isSubmitted = true;
    if (this.editProfileForm.valid) {
      this.userService.editProfile(this.createUserForm()).subscribe((response: any) => {      
        this.enableSaveButton = false;
        this.disableInputs = true;
        this.formControls.name.disable();
        this.formControls.username.disable();
        this.formControls.password.disable();
        this.formControls.gender.disable();
      });
    }
    else {
      this.disableInputs = false;
      this.enableSaveButton = true;
    }
  }

  logout() {
    this.redirectToPrincipalView();
    this.userInfo.token = null;
    localStorage.setItem('token', null); 
  }

  setSubmittedToFalse() {
    this.isSubmitted = false;
  }

  get formControls() {
    return this.editProfileForm.controls;
  }


}
