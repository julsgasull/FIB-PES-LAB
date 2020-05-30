import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { WikiRemote } from './wiki.remote';
import { FAQ } from 'src/app/models/faq.interface';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor (
    private wikiRemote: WikiRemote
  ) { }

  getFAQs(email: string): Observable<FAQ[]> {
    return this.wikiRemote.getFAQs(email);
  }
  upvote(faqid: number) {
    return this.wikiRemote.upvote(faqid);
  }
  downvote(faqid: number) {
    return this.wikiRemote.downvote(faqid);
  }
}
