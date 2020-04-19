import { TestBed } from '@angular/core/testing';

import { AllDataRestService } from './all-data-rest.service';

describe('AllDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllDataRestService = TestBed.get(AllDataRestService);
    expect(service).toBeTruthy();
  });
});
