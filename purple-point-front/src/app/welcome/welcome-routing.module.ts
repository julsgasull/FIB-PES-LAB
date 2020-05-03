import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalViewComponent } from './components/principal-view.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PrincipalViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class WelcomeRoutingModule { }
