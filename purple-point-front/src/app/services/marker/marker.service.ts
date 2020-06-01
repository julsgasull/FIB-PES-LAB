import { Injectable, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Report } from 'src/app/models/report.interace';
import { TranslateService } from '@ngx-translate/core';

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
  private markers: [Number, L.Marker, string, string][] = []; // ID from back, marker, email, username

  template = '\
  <html>\
    <div style="text-align: center;">\
      <button class="principalButton delete" id="button-delete" type="button" (click)="manageDeleteButton()">\
        <img src="../../../assets/images/paperbin.png" style="height:50px; width:50px">\
      </button>\
      <button class="principalButton edit" id="button-edit" type="button">\
        <img src="../../../assets/images/edit.png" style="height:50px; width:50px">\
      </button>\
    </div>\
    <br>\
    <div style="text-align: center;">'+
    localStorage.getItem("dragPosition") +
    '</div>\
  </html>';

  constructor(
    private httpClient: HttpClient,
    private translate: TranslateService
    ) {}

  getMark(map: L.Map) {
    L.marker([51.5, -0.09], {icon: pointIcon}).addTo(map)
      .bindPopup('this is a test mark')
    ;
  }
  
  manageDeleteButton(map, marker, reportID) {
    map.removeLayer(marker);
    console.log("ID", reportID, "type", typeof reportID);
    this.httpClient.get<Report>(`${environment.API_URL}/map/`+reportID).subscribe((result: Report) => {console.log("report en delete", result)});
    this.httpClient.delete<Report[]>(`${environment.API_URL}/map/`+reportID).subscribe((result: Report[]) => {});
  }

  manageEditButton(map, marker, reportID, pos) {
    // popup for definition
  }

  updatePointCoordinates(marker, map) {
    let pos = marker.getLatLng();
    marker.setLatLng(pos);
    console.log("Here we would update the marker's position at backend!")
  }

  getAllMarks(map: L.Map) {
    localStorage.setItem('disable', null);
    this.translate.use(localStorage.getItem('currentLang'));
    localStorage.setItem('disable', 'notNull');

    const message = this.translate.instant("map.dragPosition");

    this.httpClient.get<Report[]>(`${environment.API_URL}/map`).subscribe((result: Report[]) => {
      for(const c of result) {

        const lat = c.location.latitude;
        const lon = c.location.longitude;
        if (c.user.email !== localStorage.getItem('userEmail')) {
          const repByMsg = this.translate.instant("map.reportedBy") + c.user.username;
          const marker = new L.marker([lat, lon], {icon: pointIcon}).addTo(map).bindPopup(repByMsg);
          
          this.markers.push([c.id, marker, c.user.email, c.user.username]);
        }
        else if (c.user.email === localStorage.getItem('userEmail')) {
          const marker = new L.marker([lat, lon], {icon: pointIcon, draggable: true}).addTo(map);
          marker.bindPopup(this.updateTemplate(message))
          .on("popupopen", () => {
            let buttonSubmit = L.DomUtil.get('button-delete');
            buttonSubmit.addEventListener("click", e => {
                console.log("ID", c.id, "type", typeof c.id);
                console.log("report", c);
                this.manageDeleteButton(map, marker, c.id);
              });
            })
            .on("popupopen", () => {
              let buttonEdit = L.DomUtil.get('button-edit');
              buttonEdit.addEventListener("click", e => {
                  // TODO: editar punto
                  // .marker([lat, lon], {icon: pointIcon, draggable: true} 
                  // con el draggable se puede arrastrar
              });
            });

          marker.on("dragend", () => {
            this.updatePointCoordinates(marker, map);
            // var pos = marker.getLatLng();
            // map.panTo(pos);
          });
          marker.on("drag", () => {
            var pos = marker.getLatLng();
            map.panTo(pos);
            // console.log("position:", pos)
          })

          this.markers.push([c.id, marker, c.user.email, c.user.username]);
        }
      }
    });
    console.log("map", this.markers)
  }
  
  addMark(report: Report) {
    this.httpClient.post(`${environment.API_URL}/map`, report).subscribe((result) => {},
    (error) => {
      console.log(error)
    });
  }

  updateTemplate(msg) {
    this.template = '\
    <html>\
      <div style="text-align: center;">\
        <button class="principalButton delete" id="button-delete" type="button" (click)="manageDeleteButton()">\
          <img src="../../../assets/images/paperbin.png" style="height:50px; width:50px">\
        </button>\
        <button class="principalButton edit" id="button-edit" type="button">\
          <img src="../../../assets/images/edit.png" style="height:50px; width:50px">\
        </button>\
      </div>\
      <br>\
      <div style="text-align: center;">'+
      msg +
      '</div>\
    </html>';
    return this.template;
  }

  changePopupLanguage(language: string, map: L.Map) {
    var msg = this.translate.instant("map.dragPosition");
    console.log(msg)

    console.log("map", this.markers) 
    for (const index in this.markers) {
      console.log("id:", this.markers[index][0])

      let markerInfo = this.markers[index]
      if (markerInfo[2] === localStorage.getItem('userEmail'))
        markerInfo[1].setPopupContent(this.updateTemplate(msg));
      else {
        const repByMsg = this.translate.instant("map.reportedBy") + markerInfo[3];
        markerInfo[1].setPopupContent(repByMsg);
      }
    }
  }
}
