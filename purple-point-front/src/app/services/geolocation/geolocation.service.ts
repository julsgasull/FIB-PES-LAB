import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { GeoLocationRemote } from 'src/app/services/geolocation/geolocation.remote';
import { GeoLocation } from 'src/app/models/geoLocation.interface';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor(private geolocationRemote: GeoLocationRemote) {}

  getLocation(loc: GeoLocation): Observable<GeoLocation> {
    return this.geolocationRemote.getLocation(loc);
  }

  mockGetPosition(loc: GeoLocation): void {
    this.geolocationRemote.mockGetPosition(loc);
  }

}
