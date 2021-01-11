import { TestBed } from '@angular/core/testing';

import { GamesRestService } from './games-rest.service';

describe('GamesRestService', () => {
  let service: GamesRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
