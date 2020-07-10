import { TestBed } from '@angular/core/testing';

import { AdminPageGaurdService } from './admin-page-gaurd.service';

describe('AdminPageGaurdService', () => {
  let service: AdminPageGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPageGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
