import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { Router } from '@angular/router';
import { MarkerService } from 'src/app/services/marker/marker.service';
import { UserData } from 'src/app/models/userData.interface';
import { UserService } from 'src/app/services/user/user.service';
import { Report } from 'src/app/models/report.interace';

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

  private userInfo: UserData = ({
    email: localStorage.getItem('userEmail'),
    id: Number(localStorage.getItem('userId')),
    token: localStorage.getItem('token'),
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
    gender: localStorage.getItem('gender'),
    markedSpots:  Number(localStorage.getItem('markedSpots')),
    helpedUsers: Number(localStorage.getItem('helpedUsers')),
    profilePic: null
  });
  private point:    GeoLocation = ({
    latitude:   -1, 
    longitude:  -1, 
    accuracy:   0,
    timestamp:  0
  });
  private report:   Report = ({
    description:  null,
    location: this.point,
    user: this.userInfo
  });


  constructor (
    private markerService:  MarkerService,
    private route:          Router,
    private userService:    UserService
  ) {}

  ngOnInit(): void {
    this.initMap(); 
    this.map.on('click', <LeafletMouseEvent>(e) => { 
      console.log(e.latlng);
      this.addPoint(e.latlng);
      this.redirectToMap();
    });
  }
  initMap(): void {
    console.log("I'm iniziating the map");
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

  addPoint(latlng: L.LatLng) {
    console.log("id", this.report.user.id)
    this.report.location.latitude   = latlng.lat;
    this.report.location.longitude  = latlng.lng;
    this.report.location.timestamp  = (new Date).getTime();
    this.report.user                = this.userInfo;
    this.markerService.addMark(this.report);
  }

  redirectToMap() { this.route.navigate(['/map']); }
}
