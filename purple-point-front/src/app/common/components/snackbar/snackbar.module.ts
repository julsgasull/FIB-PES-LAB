import { TranslateModule } from '@ngx-translate/core';
import { SnackbarComponent } from './components/snackbar.component';
import { NgModule } from '@angular/core';
import { LanguageButtonModule } from '../language-button/language-button.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [SnackbarComponent],
    imports: [
      CommonModule,
      TranslateModule,
      LanguageButtonModule
    ],
    exports: [SnackbarComponent]
  })
  export class SnackbarModule { }