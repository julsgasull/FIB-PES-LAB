import { LoginComponent } from './components/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [LoginComponent],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      TranslateModule
    ],
    exports: []
  })
  export class LoginModule { }