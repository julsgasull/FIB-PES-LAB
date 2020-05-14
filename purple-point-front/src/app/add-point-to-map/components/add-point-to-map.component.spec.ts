import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPointToMapComponent } from './add-point-to-map.component';

describe('AddPointToMapComponent', () => {
  let component: AddPointToMapComponent;
  let fixture: ComponentFixture<AddPointToMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPointToMapComponent ]
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
