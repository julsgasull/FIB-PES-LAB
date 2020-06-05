import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeningViewComponent } from './components/opening-view.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [OpeningViewComponent],
    imports: [
      CommonModule,
      TranslateModule
    ],
    exports: []
  })
  export class OpeningViewModule { } 