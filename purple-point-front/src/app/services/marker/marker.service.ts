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
  private message: string;
  //private markers[] = 
 
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
    ) {
      this.message = this.translate.instant("map.dragPosition");
      console.log("msg", this.message)
    }

  getMark(map: L.Map) {
    L.marker([51.5, -0.09], {icon: pointIcon}).addTo(map)
      .bindPopup('this is a test mark')
    ;
  }
  
  manageDeleteButton(map, marker, locationId) {
    map.removeLayer(marker);
    this.httpClient.delete<Report[]>(`${environment.API_URL}/map/`+locationId).subscribe((result: Report[]) => {});
  }

  manageEditButton(map, marker, locationID, pos) {
    // popup for definition
  }

  updatePointCoordinates(marker, map) {
    let pos = marker.getLatLng();
    marker.setLatLng(pos);
    console.log("msg", this.translate.instant("map.dragPosition"))
    this.message = this.translate.instant("map.dragPosition")
    localStorage.setItem("dragPosition", this.message)
    console.log("Here we would update the marker's position at backend!")
  }

  getAllMarks(map: L.Map) {
    this.message = this.translate.instant("map.dragPosition");
    console.log("msg", this.message)

    this.httpClient.get<Report[]>(`${environment.API_URL}/map`).subscribe((result: Report[]) => {
      for(const c of result) {
        const lat = c.location.latitude;
        const lon = c.location.longitude;
        // if (c.user.email !== localStorage.getItem('userEmail')) {
        //   L.marker([lat, lon], {icon: pointIcon}).addTo(map).bindPopup('reported by '+ c.user.username);
        // }
        // else if (c.user.email === localStorage.getItem('userEmail')) {
          const marker = new L.marker([lat, lon], {icon: pointIcon, draggable: true}).addTo(map);
          marker.bindPopup(this.template)
          .on("popupopen", () => {
            let buttonSubmit = L.DomUtil.get('button-delete');
            buttonSubmit.addEventListener("click", e => {
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
          });
          marker.on("drag", () => {
            var pos = marker.getLatLng();
            map.panTo(pos);
            // console.log("position:", pos)
          })
        // }
      }
    });
  }
  
  addMark(report: Report) {
    this.httpClient.post(`${environment.API_URL}/map`, report).subscribe((result) => {
      console.log(result)
    },
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
    localStorage.setItem('disable', null);
    this.translate.use(language);
    localStorage.setItem('disable', 'notNull');

    var msg = this.translate.instant("map.dragPosition");
    const youMarkerId = Number(localStorage.getItem("youMarker"));
    const accuracy = Number(localStorage.getItem("youAccuracy"));
    const youMsg = this.translate.instant("map.youPartOne") + accuracy + this.translate.instant("map.youPartTwo");
    console.log(youMarkerId)
    console.log(msg)
    // if (c.user.email === localStorage.getItem('userEmail')) {

    // }
    // else {
      map.eachLayer((marker) => {
        if (marker._leaflet_id === youMarkerId) marker.setPopupContent(youMsg);
        else {
          // if (c.user.email === localStorage.getItem('userEmail')) {

          // }
          // else {
            marker.setPopupContent(this.updateTemplate(msg))
          // }
        }
      })
  }
}
