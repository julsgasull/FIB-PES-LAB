import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { SignUpModule } from './sign-up/sign-up.module';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeModule } from './welcome/welcome.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { UserRemote } from './services/user/user.remote';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { PanicbuttonModule } from './common/components/panicbutton/panicbutton.module';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GeoLocationRemote } from './services/geolocation/geolocation.remote';
import { GeoLocationService } from './services/geolocation/geolocation.service';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SignUpModule,
    LoginModule,
    WelcomeModule,
    ProfileModule,
    PanicbuttonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    UserService,
    UserRemote,
    GeoLocationService,
    GeoLocationRemote
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
