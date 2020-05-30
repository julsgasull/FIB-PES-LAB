import { Component, OnInit, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/services/marker/marker.service';
import { Router } from '@angular/router';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';
import { TranslateService } from '@ngx-translate/core';

var locationIcon = L.icon({
  iconUrl:      '../../../assets/images/location.svg',
  iconSize:     [50, 50],   // size of the icon
  iconAnchor:   [25, 25],   // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -25]    // point from which the popup should open relative to the iconAnchor
});


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  
  private map: L.Map;
  geolocation: GeoLocation = ({
    latitude: -1, 
    longitude: -1, 
    accuracy: -1,
    timestamp: -1
  });

  constructor (
    private markerService:      MarkerService,
    private route:              Router,
    private geoLocationService: GeoLocationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initMap();
    this.markerService.getAllMarks(this.map);
    this.geolocation = this.geoLocationService.startGeoLocationService(this.geolocation);
  }
  
  initMap(): void {
    console.log("I'm iniziating the map");
    this.map = L.map('map').fitWorld();
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	    maxZoom:      20,
	    attribution:  '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.locate();
  }

  locate() {
    console.log("locating...");
    this.map.locate({
      setView:            true,
      maxZoom:            15,
      watch:              false,
      enableHighAccuracy: true,
      timeout:            10000
    })
      .on("locationfound", e => { 
        const msg = this.translate.instant("map.youPartOne") + e.accuracy + this.translate.instant("map.youPartTwo");
        const marker = L.marker(e.latlng,{icon : locationIcon}).addTo(this.map)
          .bindPopup(msg).openPopup();
        ;
        L.circle(e.latlng, e.accuracy, {
          color:        '#8F4DEC',
          fillColor:    '#8F4DEC',
          fillOpacity:  0.2
        }).addTo(this.map);
        localStorage.setItem("youMarker", marker._leaflet_id);
        localStorage.setItem("youAccuracy", e.accuracy);        
      })
      .on("locationerror", error => {
        console.log(error);
        alert("could not locate you");
        this.map.invalidateSize();
      })
    ;
  }

  changePopupLanguage(language: string) {
    this.markerService.changePopupLanguage(language, this.map);
  }

  redirectToAddPointToMap() { this.route.navigate(['/addpointtotmap']); }
  redirectToMainMenu()      { this.route.navigate(['/mainmenu']);       }
}