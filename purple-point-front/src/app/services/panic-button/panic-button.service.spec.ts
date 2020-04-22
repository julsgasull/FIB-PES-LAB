import { TestBed } from '@angular/core/testing';

import { PanicButtonService } from './panic-button.service';

describe('PanicButtonService', () => {
  let service: PanicButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanicButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
