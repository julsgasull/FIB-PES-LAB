import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiPhonesComponent } from './wiki-phones.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { LanguageButtonModule } from 'src/app/common/components/language-button/language-button.module';
import { WikiRemote } from 'src/app/services/wiki/wiki.remote';
import { GeoLocationRemote } from 'src/app/services/geolocation/geolocation.remote';

describe('WikiPhonesComponent', () => {
  let component: WikiPhonesComponent;
  let fixture: ComponentFixture<WikiPhonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiPhonesComponent ],
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
        LanguageButtonModule
      ],
      providers: [
        WikiRemote,
        GeoLocationRemote
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiPhonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
