import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SimpleSnackbarComponent } from './simple-snackbar.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { NotificationsRemote } from 'src/app/services/notifications/notifications.remote';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserRemote } from 'src/app/services/user/user.remote';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

describe('SimpleSnackbarComponent', () => {
  let component: SimpleSnackbarComponent;
  let fixture: ComponentFixture<SimpleSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSnackbarComponent ],
      imports:[
        OverlayModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ],
      providers: [
        BrowserDynamicTestingModule,
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
        { provide: MatSnackBarRef, useValue: {} },
        NotificationsRemote,
        UserRemote
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
