import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/main-menu.component';
import { PanicbuttonModule } from './../common/components/panicbutton/panicbutton.module';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageButtonModule } from './../common/components/language-button/language-button.module';


@NgModule({
    declarations: [MainMenuComponent],
    imports: [
      CommonModule,
      PanicbuttonModule,
      TranslateModule,
      LanguageButtonModule
    ],
    exports: []
  })
  export class MainMenuModule { } 