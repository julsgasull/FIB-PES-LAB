import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPointToMapComponent } from './components/add-point-to-map.component';

@NgModule({
    declarations: [AddPointToMapComponent],
    imports: [
      CommonModule    
    ],
    exports: [AddPointToMapComponent]
  }) 
export class AddPointToMapComponentModule { } 