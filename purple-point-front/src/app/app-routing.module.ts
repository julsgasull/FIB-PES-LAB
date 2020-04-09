import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpViewComponent } from './sign-up/views/sign-up-view.component';
import { PrincipalViewComponent } from './welcome/views/principal-view.component';
import { LoginComponent } from './login/components/login.component';
import { ProfileComponent } from './profile/components/profile.component';
import { MainMenuComponent } from './main-menu/main-menu.component';


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
    component: SignUpViewComponent, pathMatch: 'full'
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
