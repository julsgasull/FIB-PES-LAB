import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalViewComponent } from './views/principal-view.component';
import { PanicbuttonModule } from '../common/components/panicbutton/panicbutton.module';



@NgModule({
  declarations: [PrincipalViewComponent],
  imports: [
    CommonModule,
    PanicbuttonModule
  ],
  exports: [PrincipalViewComponent]
})
export class WelcomeModule { }
