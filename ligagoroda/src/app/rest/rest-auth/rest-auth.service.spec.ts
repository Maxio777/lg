import { TestBed } from '@angular/core/testing';

import { RestAuthService } from './rest-auth.service';

describe('RestAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAuthService = TestBed.get(RestAuthService);
    expect(service).toBeTruthy();
  });
});
