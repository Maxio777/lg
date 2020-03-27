import { TestBed } from '@angular/core/testing';

import { RestManagerService } from './rest-manager.service';

describe('RestManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestManagerService = TestBed.get(RestManagerService);
    expect(service).toBeTruthy();
  });
});
