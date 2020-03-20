import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpModule } from './sign-up.module';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: SignUpModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})


export class SignUpRoutingModule { }
