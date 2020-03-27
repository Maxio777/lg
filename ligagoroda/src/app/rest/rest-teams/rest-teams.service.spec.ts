import { TestBed } from '@angular/core/testing';

import { RestTeamsService } from './rest-teams.service';

describe('RestTeamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestTeamsService = TestBed.get(RestTeamsService);
    expect(service).toBeTruthy();
  });
});
