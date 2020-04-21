import { Injectable } from '@angular/core';
import { PanicButtonRemote } from './panic-button.remote';
import { Observable } from 'rxjs';
import { PanicAlarm } from 'src/app/models/panicAlarm.interface'

@Injectable({
  providedIn: 'root'
})
export class PanicButtonService {

  constructor (
    private panicButtonRemote: PanicButtonRemote
  ) { }

  sendAlert(panicAlarm: PanicAlarm): Observable<any> {
    return this.panicButtonRemote.sendAlert(panicAlarm);
  }
}
