import { TestBed } from '@angular/core/testing';

import { CustumerHistorysService } from './custumer-historys.service';

describe('CustumerHistorysService', () => {
  let service: CustumerHistorysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustumerHistorysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
