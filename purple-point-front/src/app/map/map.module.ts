import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map.component';
import { AddPointToMapComponentModule } from './../add-point-to-map/add-point-to-map.module';
import { LanguageButtonModule } from './../common/components/language-button/language-button.module';

@NgModule({
    declarations: [MapComponent],
    imports: [
      CommonModule,
      AddPointToMapComponentModule,
      LanguageButtonModule
    ],
    exports: []
  })
  export class MapModule { } 