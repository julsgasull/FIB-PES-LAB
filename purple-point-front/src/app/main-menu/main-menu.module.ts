import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/main-menu.component';
import { PanicbuttonModule } from '../common/components/panicbutton/panicbutton.module';


@NgModule({
    declarations: [MainMenuComponent],
    imports: [
      CommonModule,
      PanicbuttonModule
    ],
    exports: []
  })
  export class MainMenuModule { } 