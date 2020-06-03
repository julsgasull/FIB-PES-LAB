import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { UserRemote } from 'src/app/services/user/user.remote';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { UserData } from 'src/app/models/userData.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { LanguageButtonModule } from 'src/app/common/components/language-button/language-button.module';
import { GeoLocationRemote } from 'src/app/services/geolocation/geolocation.remote';


describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let userService: UserService;
  let spies;
  const formBuilder: FormBuilder = new FormBuilder();

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
      declarations: [ SignUpComponent ],
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
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let userRemote;
    userService = new UserService(userRemote);
    loadSpies();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isSubmitted to false when setSubmittedToFalse is called', () => {
    component.setSubmittedToFalse();
    expect(component.isSubmitted).toBeFalsy();
  });

  it('should create user when onSubmit is called', () => {
    component.userForm = formBuilder.group({
      email:'email@gmail.com',
      name:'name',
      username:'username',
      password:'1234',
      confirmPassword:'1234',
      gender:'female'
    });

    let user: UserData = {email: 'email@gmail.com', name: 'name', 
                          username:'username', password:'1234', gender: 'female'};
    spies.userService.createUser.and.returnValue(user);
    component.onSubmit();
    expect(component.userForm.valid).toBeTruthy();
    expect(component.isSubmitted).toBeTruthy();
  });

  function loadSpies() {
    spies = {
      userService: {
      createUser: spyOn(userService,'createUser').and.callThrough(),
      },
      component: {
        redirectToLogin: spyOn(component, 'redirectToLogin').and.callThrough(),
      }
    };
  }
   
});
