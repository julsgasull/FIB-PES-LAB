import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { WikiRemote } from './wiki.remote';
import { FAQ } from 'src/app/models/faq.interface';
import { Definition } from 'src/app/models/definition.interface';


@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor (
    private wikiRemote: WikiRemote
  ) { }

  getFAQs( language: string): Observable<FAQ[]> {
    return this.wikiRemote.getFAQs(language);
  }

  getDefinitions(language: string): Observable<Definition[]> {
    return this.wikiRemote.getDefinitions(language);
  }
}
