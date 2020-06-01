import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageButtonModule } from '../common/components/language-button/language-button.module';
import { WikiDefinitionsComponent } from './components/wiki-definitions.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [WikiDefinitionsComponent],
  imports: [
    CommonModule,
    LanguageButtonModule,
    TranslateModule
  ],
  exports: [WikiDefinitionsComponent]
})
export class WikiDefinitionsModule { }
