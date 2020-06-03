import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageButtonModule } from '../common/components/language-button/language-button.module';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    LanguageButtonModule,
    MatCheckboxModule
  ],
  exports: []
})
export class SignUpModule { }