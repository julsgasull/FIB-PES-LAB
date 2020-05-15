import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map.component';
import { AddPointToMapComponentModule } from '../add-point-to-map/add-point-to-map.module';

@NgModule({
    declarations: [MapComponent],
    imports: [
      CommonModule,
      AddPointToMapComponentModule  
    ],
    exports: []
  })
  export class MapModule { } 