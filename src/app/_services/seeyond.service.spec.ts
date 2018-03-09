import { TestBed, inject } from '@angular/core/testing';

import { SeeyondService } from './seeyond.service';

describe('SeeyondService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeeyondService]
    });
  });

  it('should be created', inject([SeeyondService], (service: SeeyondService) => {
    expect(service).toBeTruthy();
  }));
});
