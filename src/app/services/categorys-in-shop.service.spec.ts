import { TestBed } from '@angular/core/testing';

import { CategorysInShopService } from './categorys-in-shop.service';

describe('CategorysInShopService', () => {
  let service: CategorysInShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorysInShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
