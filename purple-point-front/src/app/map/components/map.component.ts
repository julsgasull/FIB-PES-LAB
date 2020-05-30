import { Component, OnInit, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/services/marker/marker.service';
import { Router } from '@angular/router';

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

  constructor (
    private markerService:  MarkerService,
    private route:          Router
  ) {}

  ngOnInit(): void {
    this.initMap();
    this.markerService.getAllMarks(this.map);
  }
  
  initMap(): void {
    console.log("i'm iniziating the map");
    this.map = L.map('map').fitWorld();
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	    maxZoom:      15,
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
        L.marker(e.latlng,{icon : locationIcon}).addTo(this.map)
          .bindPopup("You are within " + e.accuracy + " meters from this point").openPopup();
        ;
        L.circle(e.latlng, e.accuracy, {
          color:        '#8F4DEC',
          fillColor:    '#8F4DEC',
          fillOpacity:  0.2
        }).addTo(this.map);
      })
      .on("locationerror", error => {
        console.log(error);
        alert("could not locate you");
        this.map.invalidateSize();
      })
    ;
  }

  redirectToAddPointToMap() { this.route.navigate(['/addpointtotmap']); }
  redirectToMainMenu()      { this.route.navigate(['/mainmenu']);       }
}