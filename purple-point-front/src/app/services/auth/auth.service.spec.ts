import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { UserRemote } from '../user/user.remote';
import { UserService } from '../user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { componentFactoryName } from '@angular/compiler';

describe('AuthService', () => {
  let service: AuthService;

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
      ],
      providers: [
        JwtHelperService,
        UserService,
        UserRemote
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the token if it is not null or expired when getToken is called', () => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjQ0ZDkyMDI3LWM0OTMtNDA0Yi05YjdhLWI3NGYyMTZhZWIyMCIsImlhdCI6MTU4ODkzMjU4MSwiZXhwIjoxNTg4OTM2MTgxfQ.Xt4dphRzx7YLz00JPIBWPq93QYhcmuqDhCph6yGJvHs';
    localStorage.setItem('token',token);
    expect(service.getToken()).toEqual(token);
  });
});
