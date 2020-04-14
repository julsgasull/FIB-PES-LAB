import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { GeoLocationRemote } from 'src/app/services/geolocation/geolocation.remote';
import { GeoLocation } from 'src/app/models/geoLocation.interface';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor(private locationRemote: GeoLocationRemote) {}

  getLocation(loc: GeoLocation): Observable<GeoLocation> {
    return this.locationRemote.getLocation(loc);
  }

  watchLocation(loc: GeoLocation): Observable<GeoLocation> {
    return this.locationRemote.watchLocation(loc);
  }

  mockGetPosition(loc: GeoLocation): void {
    this.locationRemote.mockGetPosition(loc);
  }

}
