import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpViewComponent } from './sign-up/views/sign-up-view.component';


const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginViewComponent, pathMatch: 'full'
  // },
  // {
  //   path: 'signup',
  //   component: SignUpViewComponent, pathMatch: 'full'
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
