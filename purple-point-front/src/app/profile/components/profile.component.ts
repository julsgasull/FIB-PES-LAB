declare var require: any
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/userData.interface';
import { ProfilePicData } from 'src/app/models/profilepicdata.interface';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
  message:          string;
  image:            ProfilePicData;
  retrievedImage:   any;

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');
    this.userService.getUserByEmail(userEmail).subscribe((response: UserData) => {
      this.userInfo = response;
      this.userInfo.profilePic.type = 'image/jpg';
      this.retrievedImage = 'data:'+this.userInfo.profilePic.type +';base64,' + btoa(this.userInfo.profilePic.picByte);
      console.log("btoa:", btoa(this.userInfo.profilePic.picByte)); 
      console.log("no btoa:", this.userInfo.profilePic.picByte);          
      //this.retrievedImage = 'data:'+this.userInfo.profilePic.type +';base64,' + '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EX5AoxLSCAXTtRApS2Znplian2WiWqHb3qa1+CinP//SgQDuAXJ/arameeK506y88xcWWlPkZUE7rvLI3DS+5xOGAXFUQZclbqXBN771A2bn5h4U5P7CK8uyeP6Lr9D++H2i0GfSi5mMY0qtcBwH13UwGpKoxpe/+m3mj508MEA4ID8JML90gpOnX6YQIWF9klpcI45CKoGHhUUuQp565ZvMHDmBHnN17n+1YwVdSkmaptTr9X0NLKWk3+2QDbpEnqDstdm68iFbV86TOiGPfenrtBYfpdvZRmvF5NTUvWr9uDU8ad5nNGCMIU0zDC7V5gxRFOLOLRHOLLLRT3ns1IvMn/gMve6Abq9H6If7Djz2oqErmSQJjUZjn5A5FhZB6HM38tJa0e20iesNHNtByoI8lwS+j/AO7j54CGROkqT7gryru37zE6aBceeMwzQ0ab6fm2ZgSF/A4TZdHEiA/rDp0FowiqKg3W6PrTj1UEJmWcrFix+hlDp0yB0NT57nJElCs9kcy4OMMUgp8Tzv0BuhDq2nzLIsfN8/VLi72mW73r2E/XRrKOQ4d9WDMDi7Q1rjXcNOp83Zs2+QZdnYxrx9zvNdJ/DQrKsQHq3W1FgbB7e2bvHuu//Y9Xc7Gh6L8cYllUqFU6eeHeOItz0A7H6sdg7r7pI+xAqCkDCMdo3Mdt47BlSpUepgE9r7URzHLCws7vq7oQekKBR5Lg88cx9Ftzu6FGVZAuaO770Pw+P7giAIxhKh9Hpdzp79M8l9tpSVpWIwSDFGc7sL2mHfraB3LY9tMRaHqbUmS/ORL3b/74Vdh2q1gm3ffqe91GqHJs1pNqBea6I19wZ9kLrdx17geaNdJQwJBiwsy7rjcMsHGrHclSoV3W5/ZBux818mAOvOZ1kqVPngIdMsod/vjLzl/wMd9UXZ8b/VuAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wMy0yOVQwOTo1MToxOSswMDowMOKrlSYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMDMtMjlUMDk6NTE6MTkrMDA6MDCT9i2aAAAARnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjcuOC05IDIwMTQtMDUtMTIgUTE2IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3Jn3IbtAAAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpoZWlnaHQAMTkyDwByhQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAAxOTLTrCEIAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE0NTkyNDUwNzlIisXIAAAAD3RFWHRUaHVtYjo6U2l6ZQAwQkKUoj7sAAAAVnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vbW50bG9nL2Zhdmljb25zLzIwMTYtMDMtMjkvYTNmYjM3YmEzNDNhNjkyM2NmMjMwYmQ1MDEzODBmZjcuaWNvLnBuZypedl0AAAAASUVORK5CYII=';
      console.log("retrieved image:", this.retrievedImage);

      this.editProfileForm = new FormGroup({
        id:           new FormControl( { value: response.id,          disabled: true }, Validators.required),
        name:         new FormControl( { value: response.name,        disabled: true }, Validators.required),
        email:        new FormControl( { value: response.email,       disabled: true }, Validators.required),
        username:     new FormControl( { value: response.username,    disabled: true }, Validators.required),
        password:     new FormControl( { value: response.password,    disabled: true }, Validators.required),
        gender:       new FormControl( { value: response.gender,      disabled: true }, Validators.required),
        markedSpots:  new FormControl( { value: response.markedSpots, disabled: true }, Validators.required),
        helpedUsers:  new FormControl( { value: response.helpedUsers, disabled: true }, Validators.required),
        profilePic:   new FormControl( { value: response.profilePic,  disabled: true }, Validators.required),
      });
    });
  }

  public onFileChanged(event) { // Gets called when the user selects an image
    this.selectedFile = event.target.files[0]; //Select File
  }
  getImage(): ProfilePicData {
    this.image = {imageid:0, type:"", picByte:null, name:""};
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile);
    this.httpClient.post<ProfilePicData>('http://10.4.41.147/api/v1/images', uploadImageData, {observe:'response'}).subscribe((response:HttpResponse<ProfilePicData>) => {
      this.image.imageid  = response.body.imageid;
      this.image.type     = response.body.type;
      this.image.picByte  = response.body.picByte;
      this.image.name     = response.body.name;
    })
    return this.image;
  }

  redirectToPrincipalView() {
    this.route.navigate(['/principal']);
  }

  editarPerfil() {
    this.isSubmitted = false;
    if (this.disableInputs) {
      this.formControls.name.enable();
      this.formControls.username.enable();
      this.formControls.password.enable();
      this.formControls.gender.enable();
      this.formControls.profilePic.enable();
    } else {
      this.formControls.name.disable();
      this.formControls.username.disable();
      this.formControls.password.disable();
      this.formControls.gender.disable();
      this.formControls.profilePic.disable();
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
      profilePic:   this.getImage()
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
        alert("Los cambios se han guardado correctamente");
      });
    } else {
      this.disableInputs = false;
      this.enableSaveButton = true;
      alert("Ha habido un error, pro favor pruébalo más tarde");
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
