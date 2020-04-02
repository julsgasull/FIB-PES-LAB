import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanicbuttonComponent } from './components/panicbutton.component';



@NgModule({
  declarations: [PanicbuttonComponent],
  imports: [
    CommonModule
  ],
  exports: [PanicbuttonComponent]
})
export class PanicbuttonModule { }
