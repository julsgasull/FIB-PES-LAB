import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserData } from 'src/app/models/userData.interface';
import { GeoLocation } from 'src/app/models/geoLocation.interface';

var pointIcon = L.icon({
  iconUrl: '../../../assets/images/pin.svg',
  shadowUrl: '../../../assets/images/pin-shadow.svg',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4,  62], // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private httpClient: HttpClient) {}

  getMark(map: L.Map) {
    L.marker([51.5, -0.09], {icon: pointIcon}).addTo(map)
      .bindPopup('this is a test mark')
    ;
  }

  getAllMarks(map: L.Map) {
    this.httpClient.get<GeoLocation[]>(`${environment.API_URL}/map`).subscribe((result: GeoLocation[]) => {
      for(const c of result) {
        const lat = c.latitude;
        const lon = c.longitude;
        L.marker([lon, lat], {icon: pointIcon}).addTo(map);
      }
    });
  }
  
  addMark(location: GeoLocation, user: UserData) {
    return this.httpClient.post(`${environment.API_URL}/map`,
    {   
      'user':     user,
      'location': location
    });
  }
}
