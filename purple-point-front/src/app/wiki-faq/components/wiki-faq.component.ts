import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FAQ } from 'src/app/models/faq.interface';
import { UserData } from 'src/app/models/userdata.interface';
import { WikiService } from 'src/app/services/wiki/wiki.service';
import { UserService } from 'src/app/services/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';

@Component({
  selector: 'app-wiki-faq',
  templateUrl: './wiki-faq.component.html',
  styleUrls: ['./wiki-faq.component.scss']
})
export class WikiFaqComponent implements OnInit {

  public userInfo: UserData;
  faqs: FAQ[];
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
    const userEmail   = localStorage.getItem('userEmail');
    const language    = localStorage.getItem('currentLang');
    this.userService.getUserByEmail(userEmail).subscribe((response: UserData) => {
      this.userInfo   = response;
      this.wikiService.getFAQs(this.userInfo, language).subscribe((response: FAQ[])=>{
        this.faqs     = response;
      });
    });
  }

  upvote(faq: FAQ) {
    this.wikiService.upvote(this.userInfo, faq);
  } 
  
  downvote(faq: FAQ) {
    this.wikiService.downvote(this.userInfo, faq);
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
    const userEmail   = localStorage.getItem('userEmail');
    this.userService.getUserByEmail(userEmail).subscribe((response: UserData) => {
      this.userInfo   = response;
      this.wikiService.getFAQs(this.userInfo, event).subscribe((response: FAQ[])=>{
        this.faqs     = response;
      });
    });
  }
}
