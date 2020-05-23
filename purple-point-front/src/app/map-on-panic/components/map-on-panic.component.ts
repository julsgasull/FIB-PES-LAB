import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/services/marker/marker.service';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { Router } from '@angular/router';

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

  constructor (
    private markerService:  MarkerService,
    private route:          Router
  ) {}

  ngOnInit(): void {
    this.initMap();
    //this.markerService.getAllMarks(this.map);
  }

  private initMap(): void {

    this.map = L.map('map').fitWorld();        
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	    maxZoom:      30,
	    attribution:  '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    var coordsFromVictim = [41.41, 2.175];
    L.marker(coordsFromVictim, {icon: victimIcon}).addTo(this.map).bindPopup('the victim is here');

    this.map.locate({
      setView:            true,
      maxZoom:            30,
      watch:              true,
      enableHighAccuracy: true,
      timeout:            2000
    }).on("locationfound", e => { 
      console.log(e.latlng);
        L.marker(e.latlng,{icon : locationIcon}).addTo(this.map).bindPopup('you are here');
        L.circle(e.latlng, e.accuracy, {
          color:        '#8F4DEC',
          fillColor:    '#8F4DEC',
          fillOpacity:  0.2
        }).addTo(this.map);
      }).on("locationerror", error => {
        location.reload(); 
      })
    ;
  ;
  }
}