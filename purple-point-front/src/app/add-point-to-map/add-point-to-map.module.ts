import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPointToMapComponent } from './components/add-point-to-map.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageButtonModule } from './../common/components/language-button/language-button.module';

@NgModule({
    declarations: [AddPointToMapComponent],
    imports: [
      CommonModule,
      TranslateModule,
      LanguageButtonModule
    ],
    exports: [AddPointToMapComponent]
  }) 
export class AddPointToMapComponentModule { } 