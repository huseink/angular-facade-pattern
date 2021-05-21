import { TestBed } from '@angular/core/testing';

import { ShopFacadeService } from './shop-facade.service';

describe('BuyFacadeService', () => {
  let service: ShopFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
