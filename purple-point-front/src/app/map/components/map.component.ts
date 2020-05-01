import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/services/marker/marker.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map: L.Map;

  constructor(private markerService: MarkerService) { }

  ngOnInit(): void {
    this.initMap();
    this.markerService.getAllMarks(this.map);
    this.map.invalidateSize();
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [ 51.5, -0.09 ],
      zoom: 3
    });
    var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	    maxZoom: 20,
	    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    Stadia_AlidadeSmoothDark.addTo(this.map);
  }
}