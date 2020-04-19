import { Injectable } from '@angular/core';
import { PanicButtonRemote } from './panic-button.remote';
import { UserData } from 'src/app/models/userData.interface';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanicButtonService {

  constructor (
    private panicButtonRemote: PanicButtonRemote
  ) { }

  sendAlert(user: UserData, location: GeoLocation): Observable<any> {
    return this.panicButtonRemote.sendAlert(user, location);
  }
}
