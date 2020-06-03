import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FAQ } from 'src/app/models/faq.interface';
import { UserData } from 'src/app/models/userdata.interface';
import { WikiService } from 'src/app/services/wiki/wiki.service';
import { UserService } from 'src/app/services/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { GeoLocation } from 'src/app/models/geolocation.interface';
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
    const language    = this.translateService.getDefaultLang();
    this.userService.getUserByEmail(userEmail).subscribe((response: UserData) => {
      this.userInfo   = response;
      this.wikiService.getFAQs(this.userInfo, language).subscribe((response: FAQ[])=>{
        this.faqs     = response;
      });
    });
  
    // to - remove
    var faq1: FAQ = {
      id: 1,
      question: "Lorem ipsum dolor sit amet, sed aperiri admodum reformidans no?",
      answer: "His in ferri quodsi gloriatur, est ex movet noster gloriatur. Vel ferri labitur perfecto an. Ut malorum vituperatoribus cum, noluisse efficiendi repudiandae has ei, quo eu postea equidem. Sit nusquam accusam liberavisse no.",
      isUpvoted: true,
      isDownvoted: false,
      numUpvotes: 2,
      numDownvotes: 1
    };
    var faq2: FAQ = {
      id: 2,
      question: "Quod ridens latine ne vis. Omnis melius eruditi vix te?",
      answer: "Eos idque doctus invenire at, eu usu vero cibo persequeris. Latine perpetua assueverit te mea. Cu est expetenda erroribus salutatus, feugiat consequuntur at eos. Cum at verear epicuri deterruisset, mazim nostrud ex eum.",      
      isUpvoted: false,
      isDownvoted: true,
      numUpvotes: 5,
      numDownvotes: 1
    };
    var faq3: FAQ = {
      id: 3,
      question:"Iuvaret mediocritatem per eu, in his sale debet ludus?",
      answer: "Diam omnium menandri cu ius, et est nihil noster postulant. Ignota populo sit eu, sea ea melius debitis argumentum. Unum dolorem in vis, te mea eruditi evertitur definitiones.",
      isUpvoted: true,
      isDownvoted: true,
      numUpvotes: 6,
      numDownvotes: 2
    }
    this.faqs = [faq1, faq2, faq3];
  }

  upvote(faq: FAQ) {
    console.log("upvote");
    this.wikiService.upvote(faq);
  } 
  
  downvote(faq: FAQ) {
    console.log("downvote");
    this.wikiService.downvote(faq);
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
