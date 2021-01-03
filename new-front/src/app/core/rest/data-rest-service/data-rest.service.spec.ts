import { TestBed } from '@angular/core/testing';

import { DataRestService } from './data-rest.service';

describe('DataRestService', () => {
  let service: DataRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
