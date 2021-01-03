import { TestBed } from '@angular/core/testing';

import { PlayersRestService } from './players-rest.service';

describe('PlayersRestService', () => {
  let service: PlayersRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayersRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
