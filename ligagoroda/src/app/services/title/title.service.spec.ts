import { TestBed } from '@angular/core/testing';

import { TitleService } from './title.service';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitleService = TestBed.get(TitleService);
    expect(service).toBeTruthy();
  });
});
