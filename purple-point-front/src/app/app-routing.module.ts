import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalViewComponent } from './welcome/components/principal-view.component';
import { LoginComponent } from './login/components/login.component';
import { ProfileComponent } from './profile/components/profile.component';
import { MainMenuComponent } from './main-menu/components/main-menu.component';
import { SignUpComponent } from './sign-up/components/sign-up.component';
import { OpeningViewComponent } from './opening-view/components/opening-view.component';
import { MapComponent } from './map/components/map.component';
import { AddPointToMapComponent } from './add-point-to-map/components/add-point-to-map.component';
import { WikiFaqComponent } from './wiki-faq/components/wiki-faq.component';
import { WikiDefinitionsComponent } from './wiki-definitions/components/wiki-definitions.component';
import { ForgotPwdComponent } from './forgot-pwd/components/forgot-pwd.component';
import { WikiPhonesModule } from './wiki-phones/wiki-phones.module';
import { WikiPhonesComponent } from './wiki-phones/components/wiki-phones.component';
import { MapOnPanicComponent } from './common/components/map-on-panic/components/map-on-panic.component';


const routes: Routes = [
  {
    path: '',
    component: OpeningViewComponent
  },
  {
    path: 'principal',
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
  },
  {
    path: 'map',
    component: MapComponent, pathMatch: 'full'
  },
  {
    path: 'addpointtotmap',
    component: AddPointToMapComponent, pathMatch: 'full'
  },
  {
    path: 'maponpanic/:lat/:lng',
    component: MapOnPanicComponent, pathMatch: 'full'
  },
  {
    path: 'wikifaq',
    component: WikiFaqComponent, pathMatch: 'full'
  },
  {
    path: 'wikidefinitions',
    component: WikiDefinitionsComponent, pathMatch: 'full'
  },
  {
    path: 'wikiphones',
    component: WikiPhonesComponent, pathMatch: 'full'
  },
  {
    path: 'forgotPwd',
    component: ForgotPwdComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
