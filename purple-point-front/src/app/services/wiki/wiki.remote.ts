import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FAQ } from 'src/app/models/faq.interface';


@Injectable()
export class WikiRemote {

  constructor(private httpClient: HttpClient) {}

  getFAQs(email: string): Observable<FAQ[]> {
    return this.httpClient.get<FAQ[]>(`${environment.API_URL}/wiki/faqs/` + email);
  }

  upvote(faqid: number) {
    return this.httpClient.put(`${environment.API_URL}/wiki/upvote`, {
      faq_id: faqid
    })
  }
  downvote(faqid: number) {
    return this.httpClient.put(`${environment.API_URL}/wiki/downvote`, {
      faq_id: faqid
    })
  }
}