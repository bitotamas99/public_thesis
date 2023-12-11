import { TestBed } from '@angular/core/testing';

import { DrivingSchoolsService } from './driving-schools.service';

describe('DrivingSchoolsService', () => {
  let service: DrivingSchoolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrivingSchoolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
