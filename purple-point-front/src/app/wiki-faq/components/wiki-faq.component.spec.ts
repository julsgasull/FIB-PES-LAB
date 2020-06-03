import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiFaqComponent } from './wiki-faq.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LanguageButtonModule } from './../../common/components/language-button/language-button.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GeoLocationRemote } from './../../services/geolocation/geolocation.remote';
import { UserService } from './../../services/user/user.service';
import { UserRemote } from './../../services/user/user.remote';
import { WikiRemote } from './../../services/wiki/wiki.remote';

describe('WikiFaqComponent', () => {
  let component: WikiFaqComponent;
  let fixture: ComponentFixture<WikiFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiFaqComponent ],
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
        ReactiveFormsModule,
        LanguageButtonModule
      ],
      providers: [
        UserService,
        UserRemote,
        GeoLocationRemote,
        WikiRemote
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
