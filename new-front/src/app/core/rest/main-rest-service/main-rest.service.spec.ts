import { TestBed } from '@angular/core/testing';

import { MainRestService } from './main-rest.service';

describe('MainRestService', () => {
  let service: MainRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
