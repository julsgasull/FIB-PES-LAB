import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';
import { GeoLocation } from 'src/app/models/geoLocation.interface';

@Component({
  selector: 'app-wiki-phones',
  templateUrl: './wiki-phones.component.html',
  styleUrls: ['./wiki-phones.component.scss']
})
export class WikiPhonesComponent implements OnInit {

  geolocation: GeoLocation = ({
    latitude: -1, 
    longitude: -1, 
    accuracy: -1,
    timestamp: -1
  });

  constructor(
    private route:            Router,
    private geoLocationService: GeoLocationService,
  ) { }

  ngOnInit(): void {
    this.geolocation = this.geoLocationService.startGeoLocationService(this.geolocation);
  }

  redirectToFAQs() {
    this.route.navigate(['/wikifaq']);
  }
  redirectToPhones() {
    this.route.navigate(['/wikiphones']);
  }
  redirectToDefinitions() {
    this.route.navigate(['/wikidefinitions']);
  }

}
