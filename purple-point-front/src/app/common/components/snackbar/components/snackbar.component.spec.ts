import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarComponent } from './snackbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationsRemote } from 'src/app/services/notifications/notifications.remote';
import { UserRemote } from 'src/app/services/user/user.remote';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarComponent ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        HttpClientTestingModule,
      ],
      providers: [
        // RouterTestingModule,
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
        { provide: MatSnackBarRef, useValue: {} },
        NotificationsRemote,
        UserRemote
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
