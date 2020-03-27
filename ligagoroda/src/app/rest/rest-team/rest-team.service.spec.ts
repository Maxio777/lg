import { TestBed } from '@angular/core/testing';

import { RestTeamService } from './rest-team.service';

describe('RestTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestTeamService = TestBed.get(RestTeamService);
    expect(service).toBeTruthy();
  });
});
