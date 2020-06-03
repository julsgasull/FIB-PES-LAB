import { TestBed } from '@angular/core/testing';

import { SocialOauthService } from './social-oauth.service';

describe('SocialOauthService', () => {
  let service: SocialOauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialOauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
