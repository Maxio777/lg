import { TestBed } from '@angular/core/testing';

import { AuthRestService } from './auth-rest.service';

describe('AuthRestService', () => {
  let service: AuthRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
