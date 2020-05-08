import { TestBed } from '@angular/core/testing';

import { PanicButtonService } from './panic-button.service';
import { PanicButtonRemote } from './panic-button.remote';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PanicButtonService', () => {
  let service: PanicButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PanicButtonService,
        PanicButtonRemote
      ]
    });
    service = TestBed.inject(PanicButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
