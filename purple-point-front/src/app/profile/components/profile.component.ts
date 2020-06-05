import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/userdata.interface';
import { ProfilePicData } from 'src/app/models/profilepicdata.interface';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userInfo: UserData;
  public disableInputs: boolean = true;
  public enableSaveButton: boolean = false;
  public editProfileForm: FormGroup = new FormGroup({
    id:           new FormControl( { value: null, disabled: true }, Validators.required),
    name:         new FormControl( { value: null, disabled: true }, Validators.required),
    email:        new FormControl( { value: null, disabled: true }, Validators.required),
    username:     new FormControl( { value: null, disabled: true }, Validators.required),
    password:     new FormControl( { value: null, disabled: true }, Validators.required),
    gender:       new FormControl( { value: null, disabled: true }, Validators.required),
    markedSpots:  new FormControl( { value: null, disabled: true }, Validators.required),
    helpedUsers:  new FormControl( { value: null, disabled: true }, Validators.required),
    profilePic:   new FormControl( { value: null, disabled: true }),
  });
  public isSubmitted: boolean = false;
  public selectedFile: File;
  public message: string;
  public image: ProfilePicData = {imageid:123456789, type:"", picByteB64:null, name:""};
  public retrievedImage: any;
  public timeout = 1 * 1000;
  geolocation: GeoLocation = ({
    latitude: -1, 
    longitude: -1, 
    accuracy: -1,
    timestamp: -1
  });

  constructor(
    private route: Router,
    private userService: UserService,
    private httpClient: HttpClient,
    private translate: TranslateService,
    private geoLocationService: GeoLocationService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');
    this.userService.getUserByEmail(userEmail).subscribe((response: any) => {
      this.userInfo = response;
      this.editProfileForm = new FormGroup({
        id:           new FormControl( { value: response.id,          disabled: true }, Validators.required),
        name:         new FormControl( { value: response.name,        disabled: true }, Validators.required),
        email:        new FormControl( { value: response.email,       disabled: true }, Validators.required),
        username:     new FormControl( { value: response.username,    disabled: true }, Validators.required),
        password:     new FormControl( { value: "",                   disabled: true }, Validators.required),
        gender:       new FormControl( { value: response.gender,      disabled: true }, Validators.required),
        markedSpots:  new FormControl( { value: response.markedSpots, disabled: true }, Validators.required),
        helpedUsers:  new FormControl( { value: response.helpedUsers, disabled: true }, Validators.required),
        profilePic:   new FormControl( { value: response.profilePic,  disabled: true })
      });
      this.retrievedImage = 'data:'+this.userInfo.profilePic.type +';base64,' + this.userInfo.profilePic.picByteB64;
      this.image = response.profilePic;
    });
    this.geolocation = this.geoLocationService.startGeoLocationService(this.geolocation);
  }

  onFileChanged(event) { // Gets called when the user selects an image
    this.selectedFile = event.target.files[0]; //Select File
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile);
    this.httpClient.post<ProfilePicData>(`${environment.API_URL}/images/parser`, uploadImageData, {observe:'response'}).toPromise().then((response:HttpResponse<ProfilePicData>) => {
      this.image.imageid      = response.body.imageid;
      this.image.type         = response.body.type;
      this.image.picByteB64   = response.body.picByteB64;
      this.image.name         = response.body.name;
    })
    // const timeout = 1 * 1000; // in ms
    setInterval(() => {}, this.timeout);
  }

  redirectToPrincipalView() {
    this.route.navigate(['/principal']);
  }
  redirectToProfileView() {
    this.route.navigate(['/profile']);
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
      password:     this.utilsService.encryptSha256(this.formControls.password.value),
      gender:       this.formControls.gender.value,
      markedSpots:  this.formControls.markedSpots.value,
      helpedUsers:  this.formControls.helpedUsers.value,
      profilePic:   this.image
    }
    if (userData.password === "") userData.password = this.userInfo.password;
    console.log("pwd",  userData.password)
    return userData;
  }

  saveChanges() {
    this.isSubmitted = true;
    if (this.editProfileForm.valid) {
      this.userService.editProfile(this.createUserForm()).subscribe(() => {      
        this.enableSaveButton = false;
        this.disableInputs = true;
        this.formControls.name.disable();
        this.formControls.username.disable();
        this.formControls.password.disable();
        this.formControls.gender.disable();
        alert(this.translate.instant('alerts.savedChanges'));
        location.reload();
      });
    } else {
      this.disableInputs = false;
      this.enableSaveButton = true;
      alert(this.translate.instant('alerts.tryLater'));
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

  refreshGeolocation() { /* no se para que era esto y me da miedo borrarlo */}

}