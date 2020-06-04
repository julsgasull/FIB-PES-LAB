import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/services/marker/marker.service';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

var locationIcon = L.icon({
  iconUrl:      '../../../assets/images/location.svg',
  iconSize:     [50, 50],   // size of the icon
  iconAnchor:   [25, 25],   // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -25]    // point from which the popup should open relative to the iconAnchor
});
var victimIcon = L.icon({
  iconUrl: '../../../assets/images/sos.svg',
  iconSize:     [83.88, 105.2], // size of the icon
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor:  [17, -90] // point from which the popup should open relative to the iconAnchor
});


@Component({
  selector: 'app-map-on-panic',
  templateUrl: './map-on-panic.component.html',
  styleUrls: ['./map-on-panic.component.scss']
})
export class MapOnPanicComponent implements OnInit {

  private map: L.Map;
  private lat: number;
  private lng: number;
  private youMarker: [L.Marker, Number]; // marker, accuracy

  constructor (
    private markerService:  MarkerService,
    private route:          Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    console.log("From activated route: ... latitude: ", this.activatedRoute.snapshot.paramMap.get("lat"), "longitude: ", this.activatedRoute.snapshot.paramMap.get("lng"));
    this.lat = Number(this.activatedRoute.snapshot.paramMap.get("lat"));  
    this.lng = Number(this.activatedRoute.snapshot.paramMap.get("lng"));
    localStorage.setItem('disable', null);
    this.translate.use(localStorage.getItem('currentLang'));
    localStorage.setItem('disable', 'notNull');
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map').fitWorld();        
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	    maxZoom:      30,
	    attribution:  '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    var coordsFromVictim = [this.lat, this.lng];
    L.marker(coordsFromVictim, {icon: victimIcon}).addTo(this.map);

    this.map.locate({
      setView:            true,
      maxZoom:            30,
      watch:              false,
      enableHighAccuracy: true,
      timeout:            10000
    }).on("locationfound", e => { 
        const msg = this.translate.instant("map.youPartOne")    + 
                      e.accuracy                                + 
                      this.translate.instant("map.youPartTwo");
        console.log(e.latlng);
        const marker = L.marker(e.latlng,{icon : locationIcon}).addTo(this.map).bindPopup(msg).openPopup();
        this.youMarker = [marker, e.accuracy];
        L.circle(e.latlng, e.accuracy, {
          color:        '#8F4DEC',
          fillColor:    '#8F4DEC',
          fillOpacity:  0.2
        }).addTo(this.map);
        localStorage.setItem("youAccuracy", e.accuracy);
      }).on("locationerror", error => {
        console.log(error);
        alert("could not locate you");
        this.map.invalidateSize();
      })
    ;
  ;
  }

  changePopupLanguage(language: string) {
    // change language
    localStorage.setItem('disable', null);
    this.translate.use(language);
    localStorage.setItem('disable', 'notNull');
    localStorage.setItem('currentLang', language);

    // change you Marker
    const msg = this.translate.instant("map.youPartOne")  + 
                this.youMarker[1]                         + 
                this.translate.instant("map.youPartTwo");
    this.youMarker[0].setPopupContent(msg);

    // //change all other markers
    // this.markerService.changePopupLanguage(language, this.map);
  }

}