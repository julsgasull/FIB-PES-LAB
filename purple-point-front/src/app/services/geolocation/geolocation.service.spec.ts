import { TestBed } from '@angular/core/testing';

import { GeoLocationService } from './geolocation.service';
import { GeoLocationRemote } from './geolocation.remote';
import { GeolocationMockService } from './geolocation.mock.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GeoLocationService', () => {
  let service: GeoLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: GeoLocationService, useClass: GeolocationMockService },
        GeoLocationRemote
      ]
    });
    service = TestBed.inject(GeoLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
