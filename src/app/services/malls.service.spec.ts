import { TestBed } from '@angular/core/testing';

import { MallsService } from './malls.service';

describe('MallsService', () => {
  let service: MallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
