import { TestBed } from '@angular/core/testing';

import { SocialOauthService } from './social-oauth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user/user.service';
import { UserRemote } from '../user/user.remote';

describe('SocialOauthService', () => {
  let service: SocialOauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        AngularFireMessagingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        AngularFireAuthModule,
        AngularFireAuth,
        UserService,
        UserRemote
      ]
    });
    service = TestBed.inject(SocialOauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
