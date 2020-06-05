import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanicbuttonComponent } from './panicbutton.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { PanicButtonService } from 'src/app/services/panic-button/panic-button.service';
import { PanicButtonRemote } from 'src/app/services/panic-button/panic-button.remote';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

describe('PanicbuttonComponent', () => {
  let component: PanicbuttonComponent;
  let fixture: ComponentFixture<PanicbuttonComponent>;
  let spies;
  let panicButtonService: PanicButtonService;

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
        HttpClientTestingModule,
        CommonModule,
      ],
      declarations: [ PanicbuttonComponent ],
      providers: [
        PanicButtonService,
        PanicButtonRemote
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanicbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let panicButtonRemote;
    panicButtonService = new PanicButtonService(panicButtonRemote);
    loadSpies();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send alert when sendAlert is called', () => {
    localStorage.setItem('username', 'username');
    localStorage.setItem('latitude', '5');
    localStorage.setItem('longitude', '3'),
    localStorage.setItem('accuracy', '1');
    localStorage.setItem('timestamp', '12');
    component.sendAlert();
    expect(localStorage.getItem('username')).toEqual('username');
    expect(localStorage.getItem('latitude')).toEqual('5');
    expect(localStorage.getItem('longitude')).toEqual('3');
    expect(localStorage.getItem('accuracy')).toEqual('1');
    expect(localStorage.getItem('timestamp')).toEqual('12');
  });

  function loadSpies() {
    spies = {
      panicButtonService: {
        sendAlert: spyOn(panicButtonService,'sendAlert').and.callThrough()
      }
    };
  }
});
