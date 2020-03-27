import { TestBed } from '@angular/core/testing';

import { RestEventService } from './rest-event.service';

describe('RestEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestEventService = TestBed.get(RestEventService);
    expect(service).toBeTruthy();
  });
});
