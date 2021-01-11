import { TestBed } from '@angular/core/testing';

import { TagsRestService } from './tags-rest.service';

describe('TagsRestService', () => {
  let service: TagsRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
