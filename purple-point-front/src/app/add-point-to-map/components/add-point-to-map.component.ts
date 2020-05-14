import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { Router } from '@angular/router';
import { MarkerService } from 'src/app/services/marker/marker.service';
import { UserData } from 'src/app/models/userData.interface';
import { UserService } from 'src/app/services/user/user.service';

var locationIcon = L.icon({
  iconUrl:      '../../../assets/images/location.svg',
  iconSize:     [50, 50],   // size of the icon
  iconAnchor:   [25, 25],   // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -25]    // point from which the popup should open relative to the iconAnchor
});

@Component({
  selector: 'app-add-point-to-map',
  templateUrl: './add-point-to-map.component.html',
  styleUrls: ['./add-point-to-map.component.scss']
})
export class AddPointToMapComponent implements OnInit {
  private map:      L.Map;
  private userInfo: UserData;
  private point:    GeoLocation;

  constructor (
    private markerService:  MarkerService,
    private route:          Router,
    private userService:    UserService
  ) {}

  ngOnInit(): void {
    this.initMap();  
    this.map.on('click', <LeafletMouseEvent>(e) => { 
      this.addPoint(e.latlng);
      this.redirectToMap();
    });
  }

  initMap(): void {
    this.map = L.map('map').fitWorld();
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	    maxZoom:      15,
	    attribution:  '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.locate({
      setView:            true,
      maxZoom:            15,
      watch:              true,
      enableHighAccuracy: true
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
      .on("locationerror", error => { alert(error.message); })
    ;
    this.map.invalidateSize();
  }

  addPoint(latlng: L.LatLng) {
    this.point.latitude   = latlng.lat;
    this.point.longitude  = latlng.lng;
    this.userService.getUserByEmail(localStorage.getItem('userEmail')).subscribe((response: UserData) => { this.userInfo = response; });
    this.markerService.addMark(this.point, this.userInfo);
  }

  redirectToMap() { this.route.navigate(['/map']); }
}
