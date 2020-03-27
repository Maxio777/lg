import { TestBed } from '@angular/core/testing';

import { RestPlayersService } from './rest-players.service';

describe('RestPlayersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestPlayersService = TestBed.get(RestPlayersService);
    expect(service).toBeTruthy();
  });
});
