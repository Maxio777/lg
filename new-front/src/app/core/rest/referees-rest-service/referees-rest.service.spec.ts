import { TestBed } from '@angular/core/testing';

import { RefereesRestService } from './referees-rest.service';

describe('RefereesRestService', () => {
  let service: RefereesRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefereesRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
