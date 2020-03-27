import { TestBed } from '@angular/core/testing';

import { ResolveGamesService } from './resolve-games.service';

describe('ResolveGamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResolveGamesService = TestBed.get(ResolveGamesService);
    expect(service).toBeTruthy();
  });
});
