import { TestBed } from '@angular/core/testing';

import { NonAuthUserService } from './non-auth-user.service';

describe('NonAuthUserService', () => {
  let service: NonAuthUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonAuthUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
