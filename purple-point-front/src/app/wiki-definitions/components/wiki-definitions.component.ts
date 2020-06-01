import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Definition } from 'src/app/models/definition.interface';
import { WikiService } from 'src/app/services/wiki/wiki.service';
import { UserService } from 'src/app/services/user/user.service';
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
    private userService:      UserService,
    private translateService: TranslateService,
    private geoLocationService: GeoLocationService
  ) { }

  ngOnInit(): void {
    this.geolocation = this.geoLocationService.startGeoLocationService(this.geolocation);
    const language    = this.translateService.getDefaultLang();
    this.wikiService.getDefinitions(language).subscribe((response: Definition[])=>{
      this.definitions     = response;
    });

    this.definitions = [
      {
        id: 1,
        word: 'harrassment',
        definition: 'aggressive pressure or intimidation.',
        kind: '[U]',
        example: 'they face daily harassment and assault on the streets'
      },
      {
        id: 2,
        word: 'harrassment',
        definition: 'aggressive pressure or intimidation.',
        kind: '[noun]',
        example: 'they face daily harassment and assault on the streets'
      },
      {
        id: 3,
        word: 'harrassment',
        definition: 'aggressive pressure or intimidation.',
        kind: '[adj]',
        example: 'they face daily harassment and assault on the streets'
      },
    ]
  }

  redirectToFAQs() {
    this.route.navigate(['wikifaq']);
  }
  redirectToPhones() {
    this.route.navigate(['wikiphones']);
  }
  redirectToDefinitions() {
    this.route.navigate(['wikidefinitions']);
  }

}
