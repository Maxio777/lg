import { TestBed } from '@angular/core/testing';

import { RestTournamentsService } from './rest-tournaments.service';

describe('TournamentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestTournamentsService = TestBed.get(RestTournamentsService);
    expect(service).toBeTruthy();
  });
});
