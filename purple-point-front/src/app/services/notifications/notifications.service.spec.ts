import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';
import { NotificationsRemote } from './notifications.remote';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserRemote } from './../user/user.remote';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ],
      providers: [
        NotificationsRemote,
        UserRemote
      ]
    });
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
