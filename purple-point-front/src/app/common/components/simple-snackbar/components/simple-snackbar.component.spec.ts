import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSnackbarComponent } from './simple-snackbar.component';

describe('SimpleSnackbarComponent', () => {
  let component: SimpleSnackbarComponent;
  let fixture: ComponentFixture<SimpleSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
