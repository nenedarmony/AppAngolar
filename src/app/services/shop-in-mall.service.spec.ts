import { TestBed } from '@angular/core/testing';

import { ShopInMallService } from './shop-in-mall.service';

describe('ShopInMallService', () => {
  let service: ShopInMallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopInMallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
