import { TestBed } from '@angular/core/testing';

import { GamePageService } from './game-page.service';

describe('GamePageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamePageService = TestBed.get(GamePageService);
    expect(service).toBeTruthy();
  });
});
