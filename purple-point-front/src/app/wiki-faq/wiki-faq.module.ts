import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WikiFaqComponent } from './components/wiki-faq.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageButtonModule } from './../common/components/language-button/language-button.module';

@NgModule({
  declarations: [WikiFaqComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    LanguageButtonModule
  ],
  exports: []
})
export class WikiFaqModule { }