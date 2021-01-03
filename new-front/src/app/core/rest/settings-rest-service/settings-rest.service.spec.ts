import { TestBed } from '@angular/core/testing';

import { SettingsRestService } from './settings-rest.service';

describe('SettingsRestService', () => {
  let service: SettingsRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
