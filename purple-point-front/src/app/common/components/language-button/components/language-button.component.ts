import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'language-button',
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.scss']
})
export class LanguageButtonComponent implements OnInit {

  @Output() languageChanged = new EventEmitter<string>();

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  useLanguage(language: string) {
    localStorage.setItem('disable', null);
    this.translate.use(language);
    localStorage.setItem('disable', 'notNull');
    localStorage.setItem('currentLang', language);
    this.onLanguageChanged(language);
  }

  onLanguageChanged(language: string) {
    this.languageChanged.emit(language);
  }

}
