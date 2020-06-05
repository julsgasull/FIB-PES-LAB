import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private translate: TranslateService) {
    localStorage.setItem('disable', null);
    translate.setDefaultLang('es');
    translate.use('es');
    localStorage.setItem('disable', 'notNull');
    localStorage.setItem('currentLang', 'es');
  }
  
  ngOnInit() {
  }
}
