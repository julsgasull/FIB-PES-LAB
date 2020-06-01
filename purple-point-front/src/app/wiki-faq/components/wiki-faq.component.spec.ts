import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiFaqComponent } from './wiki-faq.component';

describe('WikiFaqComponent', () => {
  let component: WikiFaqComponent;
  let fixture: ComponentFixture<WikiFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiFaqComponent ]
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
