import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Location } from 'src/app/models/location.interface';
import { LocationRemote } from './location.remote';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private locationRemote: LocationRemote) {}

  getLocation(loc: Location): Observable<Location> {
    return this.locationRemote.getLocation(loc);
  }

  watchLocation(loc: Location): Observable<Location> {
    return this.locationRemote.watchLocation(loc);
  }

}
