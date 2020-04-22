import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PanicAlarm } from 'src/app/models/panicAlarm.interface';

@Injectable()
export class PanicButtonRemote {

    constructor(private httpClient: HttpClient) {}

    sendAlert(panicAlarm: PanicAlarm ): Observable<any> {
          return this.httpClient.post<any>(`${environment.API_URL}/alarms/create`,
        {   
            'username': panicAlarm.username,
            'location': {
                'latitude': panicAlarm.latitude,
                'longitude': panicAlarm.longitude,
                'accuracy': panicAlarm.accuracy,
                'timestamp': panicAlarm.timestamp
            },
            'panicbutton': panicAlarm.panicbutton
        });
    }
}