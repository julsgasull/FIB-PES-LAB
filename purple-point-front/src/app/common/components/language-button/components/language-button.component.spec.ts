import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageButtonComponent } from './language-button.component';
import { TranslateService, TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

describe('LanguageButtonComponent', () => {
  let component: LanguageButtonComponent;
  let fixture: ComponentFixture<LanguageButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageButtonComponent ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      providers: [ 
       ]
    })
    .compileComponents();
    
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loadSpies();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function loadSpies() {
  }
});
