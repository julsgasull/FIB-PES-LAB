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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { MapComponent } from './map/components/map.component';
import { AddPointToMapComponent } from './add-point-to-map/components/add-point-to-map.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LanguageButtonModule } from './common/components/language-button/language-button.module';
import { MessagingService } from './services/messaging/messaging.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService } from './services/snackbar/snackbar.service';
import { SnackbarRemote } from './services/snackbar/snackbar.remote';
import { SnackbarComponent } from './common/components/snackbar/components/snackbar.component'
import { NotificationsService } from './services/notifications/notifications.service';
import { NotificationsRemote } from './services/notifications/notifications.remote';
import { SnackbarModule } from './common/components/snackbar/snackbar.module';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AddPointToMapComponent
  ],
  entryComponents: [SnackbarComponent],
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
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    SnackbarModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LanguageButtonModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })

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
