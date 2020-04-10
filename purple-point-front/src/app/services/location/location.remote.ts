import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Location } from 'src/app/models/location.interface';
//import { Location } from '@angular/common';

@Injectable()
export class LocationRemote {

    constructor(private httpClient: HttpClient) {}
    /*
    createUser(user: UserData): Observable<UserData> {
        return this.httpClient.post<UserData>(`${environment.API_URL}/users/register`, 
        {   
            'email':    user.email,
            'name':     user.name,
            'username': user.username,
            'password': user.password,
            'gender':   user.gender
        },
        {
            headers:{
              'Content-Type':"application/json"
            }
        });
    }
    */

    getLocation(loc: Location): Observable<Location> {
        const enableHighAccuracy = true;
        const maximumAge = 3600000;
        const options = {
           enableHighAccuracy,
           maximumAge
        }

        const location = navigator.geolocation.getCurrentPosition(onSucces, onError, options);

        function onSucces(location): void {
            loc.latitude = location.coord.latitude;
            // localStorage.setItem('latitude', loc.latitude);
            loc.longitude = location.coord.longitude;
            // localStorage.setItem('longitude', loc.longitude);
            loc.altitude = location.coord.altitude;
            // localStorage.setItem('altitude', loc.altitude);
            loc.accuracy = location.coord.accuracy;
            // localStorage.setItem('accuracy', loc.accuracy);
            loc.altAccuracy = location.coord.altAccuracy;
            // localStorage.setItem('altAccuracy', loc.altAccuracy);
            loc.heading = location.coord.heading;
            // localStorage.setItem('heading', loc.heading);
            loc.speed = location.coord.speed;
            // localStorage.setItem('speed', loc.speed);
            loc.timestamp = location.coord.timestamp;
            // localStorage.setItem('timestamp', loc.timestamp);          
        }

        function onError(er): void {
            const code = er.code;
            const message = er.message;
            // do an error alert of er.code with message er.message
        }

        //do request here

        return this.httpClient.post<Location>(`${environment.API_URL}/users/location?`, //endpoint a realizar
        {   
            'latitude':     loc.latitude,
            'longitude':    loc.longitude,
            'altitude':     loc.altitude,
            'accuracy':     loc.accuracy,
            'altAccuracy':  loc.altAccuracy,
            'heading':      loc.heading,
            'speed':        loc.speed,
            'timestamp':    loc.timestamp
        },
        {
            headers:{
              'Content-Type':"application/json"
            }
        }); //return location
    }

    //creo q no hace falta
    watchLocation(loc: Location): Observable<Location> {
        const enableHighAccuracy = true;
        const maximumAge = 3600000;
        const timeout = 3000; // in ms
        const options = {
           enableHighAccuracy,
           maximumAge,
           timeout
        }

        const location = navigator.geolocation.getCurrentPosition(onSucces, onError, options);

        function onSucces(location) {
            loc.latitude = location.coord.latitude;
            // localStorage.setItem('latitude', loc.latitude);
            loc.longitude = location.coord.longitude;
            // localStorage.setItem('longitude', loc.longitude);
            loc.altitude = location.coord.altitude;
            // localStorage.setItem('altitude', loc.altitude);
            loc.accuracy = location.coord.accuracy;
            // localStorage.setItem('accuracy', loc.accuracy);
            loc.altAccuracy = location.coord.altAccuracy;
            // localStorage.setItem('altAccuracy', loc.altAccuracy);
            loc.heading = location.coord.heading;
            // localStorage.setItem('heading', loc.heading);
            loc.speed = location.coord.speed;
            // localStorage.setItem('speed', loc.speed);
            loc.timestamp = location.coord.timestamp;
            // localStorage.setItem('timestamp', loc.timestamp);          
        }

        function onError(er) {
            const code = er.code;
            const message = er.message;
            // do an error alert of er.code with message er.message
        }
        
        return null; //change for request
    }
}