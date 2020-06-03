import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalViewComponent } from './principal-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { LanguageButtonModule } from 'src/app/common/components/language-button/language-button.module';
import { PanicbuttonModule } from 'src/app/common/components/panicbutton/panicbutton.module';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationsRemote } from 'src/app/services/notifications/notifications.remote';
import { UserRemote } from 'src/app/services/user/user.remote';
import { SnackbarRemote } from 'src/app/services/snackbar/snackbar.remote';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { GeoLocationRemote } from 'src/app/services/geolocation/geolocation.remote';
import { PanicButtonRemote } from 'src/app/services/panic-button/panic-button.remote';
import { setInterval, clearInterval} from 'timers';

describe('PrincipalViewComponent', () => {
  let component: PrincipalViewComponent;
  let fixture: ComponentFixture<PrincipalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        LanguageButtonModule,
        PanicbuttonModule,
        HttpClientTestingModule,
        OverlayModule,
        
        AngularFireMessagingModule,
        AngularFireModule.initializeApp(environment.firebase),
        
      ],
      providers: [
        MessagingService,
        NotificationsRemote,
        UserRemote,
        SnackbarRemote,
        MatSnackBar,
        GeoLocationRemote,
        PanicButtonRemote
      ],
      declarations: [ PrincipalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(function() {
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
