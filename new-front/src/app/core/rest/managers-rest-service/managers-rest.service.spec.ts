import { TestBed } from '@angular/core/testing';

import { ManagersRestService } from './managers-rest.service';

describe('ManagersRestService', () => {
  let service: ManagersRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagersRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
