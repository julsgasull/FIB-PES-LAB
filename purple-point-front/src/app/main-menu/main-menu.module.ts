import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/main-menu.component';
import { PanicbuttonModule } from '../common/components/panicbutton/panicbutton.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [MainMenuComponent],
    imports: [
      CommonModule,
      PanicbuttonModule,
      TranslateModule
    ],
    exports: []
  })
  export class MainMenuModule { } 