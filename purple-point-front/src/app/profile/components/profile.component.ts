declare var require: any
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/userData.interface';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { HttpClient, HttpEventType } from '@angular/common/http';

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
    private userService: UserService,
    private httpClient: HttpClient
  ) {}

  selectedFile:     File;
  retrievedImage:   any;
  base64Data:       any;
  retrieveResonse:  any;
  message:          string;
  imageName:        any;

  
  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');
    this.userService.getUserByEmail(userEmail).subscribe((response: UserData) => {
      this.userInfo = response;
      this.editProfileForm = new FormGroup({
        id:           new FormControl( { value: response.id,          disabled: true }, Validators.required),
        name:         new FormControl( { value: response.name,        disabled: true }, Validators.required),
        email:        new FormControl( { value: response.email,       disabled: true }, Validators.required),
        username:     new FormControl( { value: response.username,    disabled: true }, Validators.required),
        password:     new FormControl( { value: response.password,    disabled: true }, Validators.required),
        gender:       new FormControl( { value: response.gender,      disabled: true }, Validators.required),
        markedSpots:  new FormControl( { value: response.markedSpots, disabled: true }, Validators.required),
        helpedUsers:  new FormControl( { value: response.helpedUsers, disabled: true }, Validators.required)
      });
    });
  }

  public onFileChanged(event) { // Gets called when the user selects an image
    this.selectedFile = event.target.files[0]; //Select File
  }
  
  onUpload() { // Gets called when the user clicks on submit to upload the image
    console.log(this.selectedFile);
  
    // FormData API provides methods and properties to allow us 
    // easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    // endpoint: users/:id/image
    // Make a call to the SERVER to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200)  this.message = 'Image uploaded successfully';
        else                          this.message = 'Image not uploaded successfully';
      });
  }

  getImage() { //Gets called when the user clicks on retieve image button to get the image from back end
    //Make a call to SERVER to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse  = res;
          this.base64Data       = this.retrieveResonse.picByte;
          this.retrievedImage   = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
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
    } else {
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
      id:           this.formControls.id.value,
      email:        this.formControls.email.value,
      name:         this.formControls.name.value,
      username:     this.formControls.username.value,
      password:     this.formControls.password.value,
      gender:       this.formControls.gender.value,
      markedSpots:  this.formControls.markedSpots.value,
      helpedUsers:  this.formControls.helpedUsers.value,
    }
    return userData;
  }

  saveChanges() {
    this.isSubmitted = true;
    if (this.editProfileForm.valid) {
      this.userService.editProfile(this.createUserForm()).subscribe((response: any) => {      
        this.enableSaveButton = false;
        this.disableInputs    = true;
      });
    } else {
      this.disableInputs      = false;
      this.enableSaveButton   = true;
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
