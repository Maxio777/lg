import { TestBed } from '@angular/core/testing';

import { RestTournamentService } from './rest-tournament.service';

describe('RestTournamentService', () => {
  let service: RestTournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestTournamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
