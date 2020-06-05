import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPointToMapComponent } from './add-point-to-map.component';
import { LanguageButtonModule } from 'src/app/common/components/language-button/language-button.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { UserRemote } from 'src/app/services/user/user.remote';

describe('AddPointToMapComponent', () => {
  let component: AddPointToMapComponent;
  let fixture: ComponentFixture<AddPointToMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPointToMapComponent ],
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
        UserRemote
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPointToMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
