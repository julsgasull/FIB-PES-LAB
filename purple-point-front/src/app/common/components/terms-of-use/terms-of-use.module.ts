import { TranslateModule } from '@ngx-translate/core';
import { TermsOfUseComponent } from './components/terms-of-use.component'
import { NgModule } from '@angular/core';
import { LanguageButtonModule } from '../language-button/language-button.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [TermsOfUseComponent],
    imports: [
      CommonModule,
      TranslateModule,
      LanguageButtonModule
    ],
    exports: [TermsOfUseComponent]
  })
  export class TermsOfUseModule { }