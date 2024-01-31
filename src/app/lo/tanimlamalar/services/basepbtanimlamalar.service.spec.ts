import { TestBed } from '@angular/core/testing';

import { BasePBTanimlamalarService } from './basepbtanimlamalar.service';

describe('BasetanimlamalarserviceService', () => {
  let service: BasePBTanimlamalarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasePBTanimlamalarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
