import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GeoLocation } from '../../models/geoLocation.interface';

@Injectable()
export class GeoLocationRemote {

    constructor(private httpClient: HttpClient) {}

    getLocation(loc: GeoLocation): Observable<GeoLocation> {
        const enableHighAccuracy = true;
        const maximumAge = 3600000;
        const options = {
           enableHighAccuracy,
           maximumAge
        }

        const location = navigator.geolocation.getCurrentPosition(onSucces, onError, options);

        function onSucces(location): void {
            loc.latitude    = location.coord.latitude;
            loc.longitude   = location.coord.longitude;
            loc.accuracy    = location.coord.accuracy;
            loc.timestamp   = location.coord.timestamp;

            this.saveToStorage(loc);
        }

        function onError(er): void {
            const code = er.code;
            const message = er.message;
            // do an error alert of er.code with message er.message
        }
        
        //do request here
        return this.httpClient.post<GeoLocation>(`${environment.API_URL}/users/location?`, //endpoint a realizar
        {   
            'latitude':     loc.latitude,
            'longitude':    loc.longitude,
            'accuracy':     loc.accuracy,
            'timestamp':    loc.timestamp
        },
        {
            headers:{
              'Content-Type':"application/json"
            }
        }); //return location*/
    }

    // MOCK TO TEST WITHOUT CALLING BACK
    mockGetPosition(loc:GeoLocation): void {

        const enableHighAccuracy = true;
        const maximumAge = 3600000;
        const options = {
           enableHighAccuracy,
           maximumAge
        }
        if (navigator.geolocation) {
            const location = navigator.geolocation.getCurrentPosition(onSucces, onError, options);
        }
        else console.log("Geolocation not available!");
        
        function onSucces(position): void {
            
            loc.latitude    = position.coords.latitude;
            loc.longitude   = position.coords.longitude;
            loc.accuracy    = position.coords.accuracy;
            loc.timestamp   = position.timestamp;

            // Save to storage
            localStorage.setItem('latitude', loc.latitude.toString());
            localStorage.setItem('longitude', loc.longitude.toString());
            localStorage.setItem('accuracy', loc.accuracy.toString());
            localStorage.setItem('timestamp', loc.timestamp.toString());

            /*  DEBUG O TREURE PER PANTALLA
            console.log("-----------------------------------------------\n");
            console.log("Latitude: "    + loc.latitude.toString()    + "\n");
            console.log("Longitude: "   + loc.longitude.toString()   + "\n");
            console.log("Accuracy: "    + loc.accuracy.toString()    + "\n");
            console.log("Timpestamp: "  + loc.timestamp.toString()   + "\n");
            console.log("-----------------------------------------------\n");
            */ 
        }

        function onError(er): void {
            const code = er.code;
            const message = er.message;
            // do an error alert of er.code with message er.message
        }

    }

    private printLocation(loc:GeoLocation): void {
        console.log("-----------------------------------------------\n");
        console.log("Latitude: "    + loc.latitude.toString()    + "\n");
        console.log("Latitude: "    + loc.longitude.toString()   + "\n");
        console.log("Accuracy: "    + loc.accuracy.toString()    + "\n");
        console.log("Timpestamp: "  + loc.timestamp.toString()   + "\n");
        console.log("-----------------------------------------------\n");
    }

    private saveToStorage(loc: GeoLocation): void {
        localStorage.setItem('latitude', loc.latitude.toString());
        localStorage.setItem('longitude', loc.longitude.toString());
        localStorage.setItem('accuracy', loc.accuracy.toString());
        localStorage.setItem('timestamp', loc.timestamp.toString());
    }

    //creo q no hace falta
    watchLocation(loc: GeoLocation): Observable<GeoLocation> {
        const enableHighAccuracy = true;
        const maximumAge         = 3600000;
        const timeout            = 3000; // in ms
        const options = {
           enableHighAccuracy,
           maximumAge,
           timeout
        }

        const location = navigator.geolocation.getCurrentPosition(onSucces, onError, options);

        function onSucces(location) {
            loc.latitude    = location.coord.latitude;
            loc.longitude   = location.coord.longitude;
            loc.accuracy    = location.coord.accuracy;
            loc.timestamp   = location.coord.timestamp;       
        }

        function onError(er) {
            const code    = er.code;
            const message = er.message;
            // do an error alert of er.code with message er.message
        }
        
        return null; //change for request
    }
}