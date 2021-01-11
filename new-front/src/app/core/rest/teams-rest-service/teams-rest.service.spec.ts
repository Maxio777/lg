import { TestBed } from '@angular/core/testing';

import { TeamsRestService } from './teams-rest.service';

describe('TeamsRestService', () => {
  let service: TeamsRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamsRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
