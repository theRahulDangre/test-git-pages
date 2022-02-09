import { TestBed } from '@angular/core/testing';

import { AdminRoleUserService } from './admin-role-user.service';

describe('AdminRoleUserService', () => {
  let service: AdminRoleUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRoleUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
