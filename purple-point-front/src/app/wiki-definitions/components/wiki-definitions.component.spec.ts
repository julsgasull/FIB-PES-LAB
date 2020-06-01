import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WikiDefinitionsComponent } from './wiki-definitions.component';


describe('WikiQuestionsComponent', () => {
  let component: WikiDefinitionsComponent;
  let fixture: ComponentFixture<WikiDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiDefinitionsComponent ]
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
