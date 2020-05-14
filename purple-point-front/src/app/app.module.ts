import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { SignUpModule } from './sign-up/sign-up.module';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeModule } from './welcome/welcome.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { UserRemote } from './services/user/user.remote';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { PanicbuttonModule } from './common/components/panicbutton/panicbutton.module';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { GeoLocationRemote } from './services/geolocation/geolocation.remote';
import { GeoLocationService } from './services/geolocation/geolocation.service';
import { PanicButtonService } from './services/panic-button/panic-button.service';
import { PanicButtonRemote } from './services/panic-button/panic-button.remote';
import { UtilsService } from './services/utils/utils.service';
import { UtilsRemote } from './services/utils/utils.remote';
import { OpeningViewModule } from './opening-view/opening-view.module';
import { MainMenuModule } from './main-menu/main-menu.module';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LanguageButtonModule } from './common/components/language-button/language-button.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
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
    PanicbuttonModule,
    OpeningViewModule,
    MainMenuModule,
    LanguageButtonModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

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
    GeoLocationRemote,
    PanicButtonService,
    PanicButtonRemote,
    UtilsService,
    UtilsRemote

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
