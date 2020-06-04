import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Definition } from 'src/app/models/definition.interface';
import { WikiService } from 'src/app/services/wiki/wiki.service';
import { TranslateService } from '@ngx-translate/core';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';

@Component({
  selector: 'wiki-definitions',
  templateUrl: './wiki-definitions.component.html',
  styleUrls: ['./wiki-definitions.component.scss']
})
export class WikiDefinitionsComponent implements OnInit {

  definitions: Definition[];
  geolocation: GeoLocation = ({
    latitude: -1, 
    longitude: -1, 
    accuracy: -1,
    timestamp: -1
  });
  
  constructor(
    private route:            Router,
    private wikiService:      WikiService,
    private translateService: TranslateService,
    private geoLocationService: GeoLocationService
  ) { }

  ngOnInit(): void {
    this.geolocation = this.geoLocationService.startGeoLocationService(this.geolocation);
    this.wikiService.getDefinitions(localStorage.getItem('currentLang')).subscribe((response: Definition[])=>{
      this.definitions     = response;
    });

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

  languageChanged(event: string) {
    this.wikiService.getDefinitions(event).subscribe((response: Definition[])=>{
      this.definitions     = response;
    });
  }

}
