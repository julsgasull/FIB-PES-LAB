import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanicbuttonComponent } from './panicbutton.component';

describe('PanicbuttonComponent', () => {
  let component: PanicbuttonComponent;
  let fixture: ComponentFixture<PanicbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanicbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanicbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
