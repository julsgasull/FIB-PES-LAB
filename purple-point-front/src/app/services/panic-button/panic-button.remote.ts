import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PanicAlarm } from 'src/app/models/panicalarm.interface';

@Injectable()
export class PanicButtonRemote {

    constructor(private httpClient: HttpClient) {}

    sendAlert(panicAlarm: PanicAlarm ): Observable<any> {
        const token = localStorage.getItem('deviceToken');
          return this.httpClient.post<any>(`${environment.API_URL}/alarms/create`,
        {   
            'username': panicAlarm.username,
            "deviceToken": token,
            'location': {
                'latitude': panicAlarm.latitude,
                'longitude': panicAlarm.longitude,
                'accuracy': panicAlarm.accuracy,
                'timestamp': panicAlarm.timestamp
            }
        },
        {
            headers:{
                'Content-Type':"application/json"
            }
        });
    }
}