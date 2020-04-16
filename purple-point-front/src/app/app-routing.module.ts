import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalViewComponent } from './welcome/views/principal-view.component';
import { LoginComponent } from './login/components/login.component';
import { ProfileComponent } from './profile/components/profile.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SignUpComponent } from './sign-up/components/sign-up.component';


const routes: Routes = [
  {
    path: '',
    component: PrincipalViewComponent
  },
  {
    path: 'login',
    component: LoginComponent, pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignUpComponent, pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent, pathMatch: 'full'
  },
  {
    path: 'mainmenu',
    component: MainMenuComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
