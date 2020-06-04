import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FAQ } from 'src/app/models/faq.interface';
import { UserData } from 'src/app/models/userData.interface';
import { Definition } from 'src/app/models/definition.interface';
import { Phone } from 'src/app/models/phone.interface';


@Injectable()
export class WikiRemote {

  constructor(private httpClient: HttpClient) {}

  getFAQs(language: string): Observable<FAQ[]> {
    return this.httpClient.get<FAQ[]>(`${environment.API_URL}/wiki/faqs/` + language);
  }
  getUpvoteInfo(user: UserData, faq_id: number): Observable<boolean>{
    return this.httpClient.get<boolean>(`${environment.API_URL}/wiki/upvote/`+faq_id+`/`+user.email);
  }
  getDownvoteInfo(user: UserData, faq_id: number): Observable<boolean>{
    return this.httpClient.get<boolean>(`${environment.API_URL}/wiki/downvote/`+faq_id+`/`+user.email);
  }
  upvote(faq: FAQ) {
    return this.httpClient.put(`${environment.API_URL}/wiki/upvote`, {
      faq_id: faq.id
    })
  }
  downvote(faq: FAQ) {
    return this.httpClient.put(`${environment.API_URL}/wiki/downvote`, {
      faq_id: faq.id
    })
  }
  getDefinitions(language: string) {
    if (language === "es") {
      language = "esp";
    }
    let params = new HttpParams()
    .set('lang', language)
    .append('lang', language)
    return this.httpClient.get<Definition[]>(`${environment.API_URL}/definitions/`, {
      params: {
        lang: language
      }
    });
  }
}