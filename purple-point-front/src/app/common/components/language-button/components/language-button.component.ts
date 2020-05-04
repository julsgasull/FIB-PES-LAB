import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'language-button',
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.scss']
})
export class LanguageButtonComponent implements OnInit {

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  useLanguage(language: string) {
    this.translate.use(language);
}

}
