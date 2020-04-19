import { TestBed } from '@angular/core/testing';

import { InitialService } from './initial.service';

describe('InitialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitialService = TestBed.get(InitialService);
    expect(service).toBeTruthy();
  });
});
