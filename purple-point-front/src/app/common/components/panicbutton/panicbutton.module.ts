import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanicbuttonComponent } from './components/panicbutton.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [PanicbuttonComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [PanicbuttonComponent]
})
export class PanicbuttonModule { }
