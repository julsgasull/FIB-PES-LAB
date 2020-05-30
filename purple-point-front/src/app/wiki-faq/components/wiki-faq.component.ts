import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FAQ } from 'src/app/models/faq.interface';
//import { WikiService } from 'src/app/services/wiki/wiki.service';

@Component({
  selector: 'app-wiki-faq',
  templateUrl: './wiki-faq.component.html',
  styleUrls: ['./wiki-faq.component.scss']
})
export class WikiFaqComponent implements OnInit {

  faqs: FAQ[];
  constructor(
    private route:        Router,
    //private wikiService:  WikiService
  ) { }

  ngOnInit(): void {
    // this.wikiService.getFAQs().subscribe((response: FAQ[]) => {
    //   this.faqs = response;
    // })
    

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

  upvote(id: number) {
    //this.wikiService.upvote(id);
  } 
  downvote(id: number) {
    //this.wikiService.upvote(id);
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
