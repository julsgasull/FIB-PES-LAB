import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { UserRemote } from './../user/user.remote';
import { UserService } from './../user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { LanguageButtonModule } from 'src/app/common/components/language-button/language-button.module';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

describe('AuthService', () => {
  let service: AuthService;
  let messagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        }),
        HttpClientTestingModule,
        CommonModule,
        AngularFireMessagingModule,
        AngularFireModule.initializeApp(environment.firebase),
        LanguageButtonModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ],
      providers: [
        JwtHelperService,
        UserService,
        UserRemote
      ]
    });
    service = TestBed.inject(AuthService);
    messagingService = TestBed.inject(AngularFireMessagingModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
