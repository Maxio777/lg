import { TestBed } from '@angular/core/testing';

import { NewsRestService } from './news-rest.service';

describe('NewsRestService', () => {
  let service: NewsRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
