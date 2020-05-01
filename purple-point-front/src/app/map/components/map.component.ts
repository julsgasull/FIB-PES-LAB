import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/services/marker/marker.service';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';
import { GeoLocation } from 'src/app/models/geoLocation.interface';

var locationIcon = L.icon({
  iconUrl:      '../../../assets/images/location.svg',
  iconSize:     [50, 50], // size of the icon
  iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
});


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map: L.Map;
  private userLocation: GeoLocation = ({
    latitude:   -1, 
    longitude:  -1, 
    accuracy:   -1,
    timestamp:  -1
  });

  constructor (
    private markerService: MarkerService,
    private geoLocationService: GeoLocationService
  ) { this.geoLocationService.getLocation(this.userLocation); }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map').fitWorld();
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	    maxZoom: 15,
	    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.locate({
      setView: true,
      maxZoom: 15,
      watch:true,
      enableHighAccuracy:true
    })
      .on("locationfound", e => { 
        L.marker(e.latlng,{icon : locationIcon}).addTo(this.map)
          .bindPopup("You are within " + e.accuracy + " meters from this point").openPopup();
        ;
        L.circle(e.latlng, e.accuracy, {
          color: '#8F4DEC',
          fillColor: '#8F4DEC',
          fillOpacity: 0.2
        }).addTo(this.map);
      })
      .on("locationerror", error => {
        alert(error.message); 
      })
    ;
    
    this.markerService.getAllMarks(this.map); // add marked spots
    this.map.invalidateSize();
  }



}