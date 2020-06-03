import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPwdComponent } from './components/forgot-pwd.component';
import { LanguageButtonModule } from './../common/components/language-button/language-button.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ForgotPwdComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    LanguageButtonModule
  ],
  exports: [ForgotPwdComponent]
})
export class ForgotPwdModule { }
