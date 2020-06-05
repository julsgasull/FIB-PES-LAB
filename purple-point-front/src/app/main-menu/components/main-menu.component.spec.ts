import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuComponent } from './main-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user/user.service';
import { UserRemote } from 'src/app/services/user/user.remote';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';
import { GeoLocationRemote } from 'src/app/services/geolocation/geolocation.remote';
import { GeolocationMockService } from 'src/app/services/geolocation/geolocation.mock.service';
import { LanguageButtonModule } from 'src/app/common/components/language-button/language-button.module';
import { PanicbuttonModule } from 'src/app/common/components/panicbutton/panicbutton.module';
import { PanicButtonRemote } from 'src/app/services/panic-button/panic-button.remote';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

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
        LanguageButtonModule,
        PanicbuttonModule
      ],
      declarations: [ MainMenuComponent ],
      providers: [
        UserService,
        UserRemote,
        GeolocationMockService,
        GeoLocationRemote,
        PanicButtonRemote
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user token to null when logout is called', () => {
    component.userInfo = {email: 'email@gmail.com', name: 'name', password:'1234', token: 'sdfisdgres'};
    component.logout()
    expect(component.userInfo.token).toBeNull();
  });
});
