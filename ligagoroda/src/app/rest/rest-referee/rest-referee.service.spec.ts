import { TestBed } from '@angular/core/testing';

import { RestRefereeService } from './rest-referee.service';

describe('RestRefereeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestRefereeService = TestBed.get(RestRefereeService);
    expect(service).toBeTruthy();
  });
});
