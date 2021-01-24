import { TestBed } from '@angular/core/testing';

import { CustumerhistorysService } from './custumerhistorys.service';

describe('CustumerhistorysService', () => {
  let service: CustumerhistorysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustumerhistorysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
