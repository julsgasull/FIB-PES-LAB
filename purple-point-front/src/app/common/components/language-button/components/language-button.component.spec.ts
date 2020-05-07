import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageButtonComponent } from './language-button.component';
import { TranslateService, TranslateModule, TranslateStore, TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler, USE_DEFAULT_LANG, TranslateFakeLoader } from '@ngx-translate/core';
import { TranslateServiceMock } from 'src/app/services/translate/translateMock.service';

describe('LanguageButtonComponent', () => {
  let component: LanguageButtonComponent;
  let fixture: ComponentFixture<LanguageButtonComponent>;
  let translateService: TranslateService;
  let spies;

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
        { provide: TranslateService, useValue: TranslateServiceMock}
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

  it('should call use language', () => {
    this.component.useLanguage('es');
    expect(translateService).toHaveBeenCalled();
  });

  function loadSpies() {
    spies = {
    translateService: {
    use: spyOn(translateService, 'use').and.callThrough(),
  //   getClothesByFiltersMoreResults: spyOn(clothService,
  //  'getClothesByFiltersMoreResults').and.callThrough(),
  //   getClohtesRelatedByIdMoreResults: spyOn(clothService,
  //  'getClothesRelatedByIdMoreResults').and.callThrough(),
  //   getClohtesRelatedById: spyOn(clothService, 'getClothesRelatedById').and.callThrough(),
  //   getClothById: spyOn(clothService, 'getClothById').and.callThrough(),
  //   getClothesByFilters: spyOn(clothService, 'getClothesByFilters').and.callThrough(),
    },
    // menuService: {
    // filtersApplyed: spyOn(menuService, 'getFiltersExpression').and.callThrough(),
    // filters: spyOn(menuService, 'getFilters').and.callThrough(),
    // idObject: spyOn(menuService, 'getIdObs').and.callThrough(),
    // getSerachFiltersObs: spyOn(menuService, 'getSerachFiltersObs').and.callThrough()
    // }
    };
    }
});
