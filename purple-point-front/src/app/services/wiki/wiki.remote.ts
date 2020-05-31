import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FAQ } from 'src/app/models/faq.interface';
import { UserData } from 'src/app/models/userData.interface';


@Injectable()
export class WikiRemote {

  constructor(private httpClient: HttpClient) {}

  getFAQs(user: UserData, language: string): Observable<FAQ[]> {
    return this.httpClient.get<FAQ[]>(`${environment.API_URL}/wiki/faqs/` + user.email + `/` + language);
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
}