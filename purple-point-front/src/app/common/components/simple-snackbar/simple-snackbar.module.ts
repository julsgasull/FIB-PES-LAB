import { TranslateModule } from '@ngx-translate/core';
import { SimpleSnackbarComponent } from './components/simple-snackbar.component';
import { NgModule } from '@angular/core';
import { LanguageButtonModule } from '../language-button/language-button.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [SimpleSnackbarComponent],
    imports: [
      CommonModule,
      TranslateModule,
      LanguageButtonModule
    ],
    exports: [SimpleSnackbarComponent]
  })
  export class SimpleSnackbarModule { }