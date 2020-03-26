import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { SignUpModule } from './sign-up/sign-up.module';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeModule } from './welcome/welcome.module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { UserRemote } from './services/user/user.remote';
import { ProfileComponent } from './profile/profile.component';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent
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
  ],
  providers: [
    UserService,
    UserRemote
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
