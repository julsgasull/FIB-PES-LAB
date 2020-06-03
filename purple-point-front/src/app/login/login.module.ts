import { LoginComponent } from './components/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageButtonModule } from './../common/components/language-button/language-button.module';


@NgModule({
    declarations: [LoginComponent],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      TranslateModule,
      LanguageButtonModule
    ],
    exports: []
  })
  export class LoginModule { }