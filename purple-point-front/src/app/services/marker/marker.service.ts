import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Report } from 'src/app/models/report.interace';

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
    this.httpClient.get<Report[]>(`${environment.API_URL}/map`).subscribe((result: Report[]) => {
      for(const c of result) {
        const lat = c.location.latitude;
        const lon = c.location.longitude;
        L.marker([lat, lon], {icon: pointIcon}).addTo(map).bindPopup('reported by '+ c.user.username);
      }
    });
  }
  
  addMark(report: Report) {
    this.httpClient.post(`${environment.API_URL}/map`, report).subscribe((result) => {});
  }
}
