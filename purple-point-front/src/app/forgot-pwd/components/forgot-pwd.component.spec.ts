import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPwdComponent } from './forgot-pwd.component';

import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { UserService } from '././.././../services/user/user.service';
import { UserRemote } from '././.././../services/user/user.remote';
import { UtilsService } from '././.././../services/utils/utils.service';
import { UtilsRemote } from '././.././../services/utils/utils.remote';
import { LanguageButtonModule } from '././.././../common/components/language-button/language-button.module';
import { GeoLocationRemote } from '././.././../services/geolocation/geolocation.remote';
import { RouterTestingModule } from '@angular/router/testing';

describe('ForgotPwdComponent', () => {
  let component: ForgotPwdComponent;
  let fixture: ComponentFixture<ForgotPwdComponent>;
  
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPwdComponent ],
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
    fixture = TestBed.createComponent(ForgotPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
