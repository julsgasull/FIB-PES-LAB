import { NgModule } from '@angular/core';
import { LanguageButtonComponent } from './components/language-button.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [LanguageButtonComponent],
    imports: [
      CommonModule
    ],
    exports: [LanguageButtonComponent]
  })
  export class LanguageButtonModule { }