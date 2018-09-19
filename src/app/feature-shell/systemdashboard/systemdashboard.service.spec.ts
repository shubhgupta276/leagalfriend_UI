import { TestBed, inject } from '@angular/core/testing';

import { SystemdashboardService } from './systemdashboard.service';

describe('SystemdashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemdashboardService]
    });
  });

  it('should be created', inject([SystemdashboardService], (service: SystemdashboardService) => {
    expect(service).toBeTruthy();
  }));
});
