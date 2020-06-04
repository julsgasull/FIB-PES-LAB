import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { Router } from '@angular/router';
import { MarkerService } from 'src/app/services/marker/marker.service';
import { UserData } from 'src/app/models/userdata.interface';
import { UserService } from 'src/app/services/user/user.service';
import { Report } from 'src/app/models/report.interace';
import { TranslateService } from '@ngx-translate/core';

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
  private youMarker: [L.Marker, Number]; // marker, accuracy

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
    accuracy:    0,
    timestamp:   0
  });
  private report:   Report = ({
    description:  null,
    location: this.point,
    reporter: this.userInfo
  });


  constructor (
    private markerService:  MarkerService,
    private route:          Router,
    private userService:    UserService,
    private translate:      TranslateService
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
	    maxZoom:      20,
	    attribution:  '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.locate();
  }

  locate() {
    this.map.locate({
      setView:            true,
      maxZoom:            15,
      watch:              false,
      enableHighAccuracy: true,
      timeout:            10000
    })
      .on("locationfound", e => { 
        const msg = this.translate.instant("map.youPartOne")  + 
                    e.accuracy                                + 
                    this.translate.instant("map.youPartTwo");
        const marker = L.marker(e.latlng,{icon : locationIcon}).addTo(this.map)
          .bindPopup(msg).openPopup();
        ;
        this.youMarker = [marker, e.accuracy];
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
    this.report.location.latitude   = latlng.lat;
    this.report.location.longitude  = latlng.lng;
    this.report.location.timestamp  = (new Date).getTime();
    this.report.reporter            = this.userInfo;
    this.markerService.addMark(this.report);
  }

  changePopupLang(language: string) {
    localStorage.setItem('disable', null);
    this.translate.use(language);
    localStorage.setItem('disable', 'notNull');

    // change you Marker
    const msg = this.translate.instant("map.youPartOne")  + 
    this.youMarker[1]                                     + 
    this.translate.instant("map.youPartTwo");
    this.youMarker[0].setPopupContent(msg);
  }

  redirectToMap() { this.route.navigate(['/map']); }
}
