import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up.component';
import { SignUpViewComponent } from './views/sign-up-view.component';



@NgModule({
  declarations: [SignUpComponent, SignUpViewComponent],
  imports: [
    CommonModule
  ],
  exports: [SignUpViewComponent]
})
export class SignUpModule { }
