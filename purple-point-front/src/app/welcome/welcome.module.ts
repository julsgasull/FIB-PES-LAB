import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalViewComponent } from './views/principal-view.component';



@NgModule({
  declarations: [PrincipalViewComponent],
  imports: [
    CommonModule
  ],
  exports: [PrincipalViewComponent]
})
export class WelcomeModule { }
