import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalViewComponent } from './components/principal-view.component';
import { PanicbuttonModule } from '../common/components/panicbutton/panicbutton.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [PrincipalViewComponent],
  imports: [
    CommonModule,
    PanicbuttonModule,
    TranslateModule
  ],
  exports: [PrincipalViewComponent]
})
export class WelcomeModule { }
