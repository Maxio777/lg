import { TestBed } from '@angular/core/testing';

import { RestGameService } from './rest-game.service';

describe('RestGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestGameService = TestBed.get(RestGameService);
    expect(service).toBeTruthy();
  });
});
