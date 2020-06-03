import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiPhonesComponent } from './wiki-phones.component';

describe('WikiPhonesComponent', () => {
  let component: WikiPhonesComponent;
  let fixture: ComponentFixture<WikiPhonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiPhonesComponent ]
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
