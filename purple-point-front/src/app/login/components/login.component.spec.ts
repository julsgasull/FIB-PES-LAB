import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { UserRemote } from 'src/app/services/user/user.remote';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { UtilsRemote } from 'src/app/services/utils/utils.remote';
import { LanguageButtonModule } from 'src/app/common/components/language-button/language-button.module';
import { GeoLocationRemote } from 'src/app/services/geolocation/geolocation.remote';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let spies;
  let userService: UserService;
  let utilsService: UtilsService;

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
      declarations: [ LoginComponent ],
      providers: [
        UserService,
        UserRemote,
        { provide: FormBuilder, useValue: formBuilder },
        UtilsService,
        UtilsRemote,
        GeoLocationRemote
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let userRemote;
    userService = new UserService(userRemote);
    let utilsRemote;
    utilsService = new UtilsService(utilsRemote);

    loadSpies();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isSubmitted to true when onSubmit is called', () => {
    component.loginForm = formBuilder.group({
      email: 'email@gmail.com',
      password: '1234'
    });
    component.onSubmit();
    expect(component.isSubmitted).toBeTruthy();
  });

  it('should set isSubmitted to false when setSubmittedToFalse is called', () => {
    component.setSubmittedToFalse();
    expect(component.isSubmitted).toBeFalsy();
  });

  function loadSpies() {
    spies = {
      component: {
        redirectToMainMenu: spyOn(component, 'redirectToMainMenu').and.callThrough()
      },
      userService: {
        loginUser: spyOn(userService,'loginUser').and.callThrough()
      },
      utilsService: {
        encryptSha256: spyOn(utilsService, 'encryptSha256').and.callThrough()
      }
    };
  }
});
