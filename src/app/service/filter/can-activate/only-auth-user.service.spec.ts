import { TestBed } from '@angular/core/testing';

import { OnlyAuthUserService } from './only-auth-user.service';

describe('OnlyAuthUserService', () => {
  let service: OnlyAuthUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlyAuthUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
