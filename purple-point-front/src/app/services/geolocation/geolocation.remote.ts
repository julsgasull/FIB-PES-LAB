import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GeoLocation } from '../../models/geoLocation.interface';

@Injectable()
export class GeoLocationRemote {

    constructor(private httpClient: HttpClient) {}

    getLocation(loc: GeoLocation): Observable<any> {
        const token: string = localStorage.getItem("deviceToken");
        const enableHighAccuracy = true;
        const maximumAge = 3600000;
        const options = {
           enableHighAccuracy,
           maximumAge
        }

        const location = navigator.geolocation.getCurrentPosition(onSucces, onError, options);

        function onSucces(position): void {
            loc.latitude    = position.coords.latitude;
            loc.longitude   = position.coords.longitude;
            loc.accuracy    = position.coords.accuracy;
            loc.timestamp   = position.timestamp;

            localStorage.setItem('latitude', loc.latitude.toString());
            localStorage.setItem('longitude', loc.longitude.toString());
            localStorage.setItem('accuracy', loc.accuracy.toString());
            localStorage.setItem('timestamp', loc.timestamp.toString());

            //  DEBUG O TREURE PER PANTALLA
            console.log("Latitude: "    + loc.latitude.toString()    + "\n");
            console.log("Longitude: "   + loc.longitude.toString()   + "\n");
            console.log("Accuracy: "    + loc.accuracy.toString()    + "\n");
            console.log("Timpestamp: "  + loc.timestamp.toString()   + "\n");
            console.log("-----------------------------------------------\n");
        }

        function onError(er): void {
            const code = er.code;
            const message = er.message;
            console.log("Error: " + code + " with message: " + message);
        }
        
        //do request here
        return this.httpClient.put<GeoLocation>(`${environment.API_URL}/devices/`+token+`/location`, //endpoint a realizar
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
        }); //return location
    }

    getFirstLocation(loc:GeoLocation): GeoLocation {
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

            //  DEBUG O TREURE PER PANTALLA
            console.log("-----------------------------------------------\n");
            console.log("Latitude: "    + loc.latitude.toString()    + "\n");
            console.log("Longitude: "   + loc.longitude.toString()   + "\n");
            console.log("Accuracy: "    + loc.accuracy.toString()    + "\n");
            console.log("Timpestamp: "  + loc.timestamp.toString()   + "\n");
            console.log("-----------------------------------------------\n");
        }

        function onError(er): void {
            const code = er.code;
            const message = er.message;
            // do an error alert of er.code with message er.message
            console.log("Error: " + code + " with message: " + message);
        }
        return loc;
    }
}