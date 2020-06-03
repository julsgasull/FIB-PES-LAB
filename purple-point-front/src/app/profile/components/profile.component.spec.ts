import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { UserRemote } from 'src/app/services/user/user.remote';
import { UserData } from 'src/app/models/userData.interface';
import { LanguageButtonModule } from 'src/app/common/components/language-button/language-button.module';
import { GeoLocationRemote } from 'src/app/services/geolocation/geolocation.remote';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let spies;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        HttpClientTestingModule,
        CommonModule,
        ReactiveFormsModule,
        LanguageButtonModule
      ],
      declarations: [ ProfileComponent ],
      providers: [
        UserService,
        UserRemote,
        { provide: FormBuilder, useValue: formBuilder },
        GeoLocationRemote
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let userRemote;
    userService = new UserService(userRemote);

    loadSpies();
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
    
    clearInterval(component.timeout);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    clearInterval(component.timeout);
  });

  it('should set isSubmitted to false and enable form fields if disableInputs is true'+
    ' when editarPerfil is called', () => {
      component.disableInputs = true;
      component.editarPerfil();
      expect(component.disableInputs).toBeFalsy();
      expect(component.enableSaveButton).toBeTruthy();
      expect(component.formControls.name.enabled).toBeTruthy();
      expect(component.formControls.username.enabled).toBeTruthy();
      expect(component.formControls.password.enabled).toBeTruthy();
      expect(component.formControls.gender.enabled).toBeTruthy();
      expect(component.formControls.profilePic.enabled).toBeTruthy();
  });

  it('should set isSubmitted to false and disable form fields if disableInputs is false'+
    ' when editarPerfil is called', () => {
      component.disableInputs = false;
      component.editarPerfil();
      expect(component.disableInputs).toBeFalsy();
      expect(component.enableSaveButton).toBeTruthy();
      expect(component.formControls.name.enabled).toBeFalsy();
      expect(component.formControls.username.enabled).toBeFalsy();
      expect(component.formControls.password.enabled).toBeFalsy();
      expect(component.formControls.gender.enabled).toBeFalsy();
      expect(component.formControls.profilePic.enabled).toBeFalsy();
  });

  it('should set isSubmitted to true and save profile changes when saveChanges is called', () => {
    component.editProfileForm = formBuilder.group({
      id: 1,
      email: 'email@gmail.com',
      name:'name',
      username:'username',
      password:'1234',
      gender:'female',
      markedSpots:  0,
      helpedUsers: 0,
      profilePic: null
    });

    let user: UserData = {email: 'email@gmail.com', name: 'name', 
                          username:'username', password:'1234', gender: 'female'};
    spies.userService.editProfile.and.returnValue(user);
    component.saveChanges();
    expect(component.editProfileForm.valid).toBeTruthy();
    expect(component.isSubmitted).toBeTruthy();
    expect(component.enableSaveButton).toBeFalsy();
    expect(component.disableInputs).toBeTruthy();
  });

  it('should redirect to principal view when logout is called', () => {
    component.userInfo = {id: 1, email: 'email@gmail.com', password: '1234', token: 'fgredas'};
    component.logout();
    expect(component.redirectToPrincipalView).toHaveBeenCalled();
    expect(component.userInfo.token).toBeNull();
  });

  it('should set isSubmitted to false when  setSubmittedToFalse is called', () => {
    component. setSubmittedToFalse();
    expect(component.isSubmitted).toBeFalsy();
  });

  function loadSpies() {
    spies = {
      userService: {
        editProfile: spyOn(userService,'editProfile').and.callThrough()
      },
      component: {
        redirectToPrincipalView: spyOn(component, 'redirectToPrincipalView').and.callThrough(),
        redirectToProfileView: spyOn(component, 'redirectToProfileView').and.callThrough(),
      }
    };
  }
});
