import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { GeoLocationRemote } from 'src/app/services/geolocation/geolocation.remote';
import { GeoLocation } from '../../models/geolocation.interface';
import { Device } from 'src/app/models/device.interface';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor(private geolocationRemote: GeoLocationRemote) {}

  startGeoLocationService(loc: GeoLocation): GeoLocation {
    return this.geolocationRemote.startGeoLocationService(loc);
  }

  getLocation(loc: GeoLocation): Observable<Device> {
    return this.geolocationRemote.getLocation(loc);
  }

  getFirstLocation(loc: GeoLocation) {
    return this.geolocationRemote.getFirstLocation(loc);
  }
}
