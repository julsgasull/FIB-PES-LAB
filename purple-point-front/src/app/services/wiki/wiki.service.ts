import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { WikiRemote } from './wiki.remote';
import { FAQ } from 'src/app/models/faq.interface';
import { UserData } from 'src/app/models/userdata.interface';
import { Definition } from 'src/app/models/definition.interface';


@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor (
    private wikiRemote: WikiRemote
  ) { }

  getFAQs(user: UserData, language: string): Observable<FAQ[]> {
    return this.wikiRemote.getFAQs(user, language);
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
