import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/userData.interface';
import { GeoLocation } from 'src/app/models/geoLocation.interface';

@Injectable()
export class PanicButtonRemote {

    constructor(private httpClient: HttpClient) {}

    sendAlert(user: UserData,location: GeoLocation): Observable<any> {
        //return this.httpClient.post<any>(`${environment.API_URL}/panic/`,
        console.log("M'HAS CLICAAAAT BRO")
        return this.httpClient.post<any>(`${environment.API_URL}/users/email/`+user.email,
        {   
            'username': user.username,
            'latitude': location.latitude,
            'longitude': location.longitude,
            'accuracy': location.accuracy,
            'timestamp': location.timestamp
        });
    }
}