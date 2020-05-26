import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { GeoLocationRemote } from 'src/app/services/geolocation/geolocation.remote';
import { GeoLocation } from 'src/app/models/geoLocation.interface';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor(private geolocationRemote: GeoLocationRemote) {}

  getLocation(loc: GeoLocation): Observable<any> {
    return this.geolocationRemote.getLocation(loc);
  }

  getFirstLocation(loc: GeoLocation) {
    return this.geolocationRemote.getFirstLocation(loc);
  }
}
