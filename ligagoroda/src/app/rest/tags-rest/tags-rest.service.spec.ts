import { TestBed } from '@angular/core/testing';

import { TagsRestService } from './tags-rest.service';

describe('TagsRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TagsRestService = TestBed.get(TagsRestService);
    expect(service).toBeTruthy();
  });
});
