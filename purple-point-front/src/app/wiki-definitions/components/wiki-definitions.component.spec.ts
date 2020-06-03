import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WikiDefinitionsComponent } from './wiki-definitions.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageButtonModule } from './.././../common/components/language-button/language-button.module';
import { UserService } from './.././../services/user/user.service';
import { UserRemote } from './.././../services/user/user.remote';
import { GeoLocationRemote } from './.././../services/geolocation/geolocation.remote';
import { WikiRemote } from './.././../services/wiki/wiki.remote';


describe('WikiQuestionsComponent', () => {
  let component: WikiDefinitionsComponent;
  let fixture: ComponentFixture<WikiDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiDefinitionsComponent ],
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
    fixture = TestBed.createComponent(WikiDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
