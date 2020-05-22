import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOnPanicComponent } from './map-on-panic.component';

describe('MapOnPanicComponent', () => {
  let component: MapOnPanicComponent;
  let fixture: ComponentFixture<MapOnPanicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOnPanicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOnPanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
