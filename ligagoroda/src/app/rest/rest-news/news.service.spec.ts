import { TestBed } from '@angular/core/testing';

import { RestNewsService } from './rest-news.service';

describe('NewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestNewsService = TestBed.get(RestNewsService);
    expect(service).toBeTruthy();
  });
});
