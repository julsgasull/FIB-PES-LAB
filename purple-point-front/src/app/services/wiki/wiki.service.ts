import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { WikiRemote } from './wiki.remote';
import { FAQ } from 'src/app/models/faq.interface';
import { UserData } from 'src/app/models/userData.interface';
import { Definition } from 'src/app/models/definition.interface';


@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor (
    private wikiRemote: WikiRemote
  ) { }

  getFAQs(language: string): Observable<FAQ[]> {
    return this.wikiRemote.getFAQs(language);
  }
  getUpvoteInfo(user: UserData, faq_id: number): Observable<boolean>{
    return this.wikiRemote.getUpvoteInfo(user, faq_id);
  }
  getDownvoteInfo(user: UserData, faq_id: number): Observable<boolean>{
    return this.wikiRemote.getDownvoteInfo(user, faq_id); 
  }
  upvote(faq: FAQ) {
    return this.wikiRemote.upvote(faq);
  }
  downvote(faq: FAQ) {
    return this.wikiRemote.downvote(faq);
  }
  getDefinitions(language: string): Observable<Definition[]> {
    return this.wikiRemote.getDefinitions(language);
  }
}
