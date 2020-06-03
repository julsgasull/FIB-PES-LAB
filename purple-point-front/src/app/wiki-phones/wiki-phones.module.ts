import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WikiPhonesComponent } from './components/wiki-phones.component';
import { LanguageButtonModule } from '../common/components/language-button/language-button.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [WikiPhonesComponent],
  imports: [
    CommonModule,
    LanguageButtonModule,
    TranslateModule
  ],
  exports: [WikiPhonesComponent]
})
export class WikiPhonesModule { }
