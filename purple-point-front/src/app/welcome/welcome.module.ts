import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalViewComponent } from './components/principal-view.component';
import { PanicbuttonModule } from './../common/components/panicbutton/panicbutton.module';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageButtonModule } from './../common/components/language-button/language-button.module';

@NgModule({
  declarations: [PrincipalViewComponent],
  imports: [
    CommonModule,
    PanicbuttonModule,
    TranslateModule,
    LanguageButtonModule
  ],
  exports: [PrincipalViewComponent]
})
export class WelcomeModule { }
