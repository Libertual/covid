import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CovidDataService } from './covid-data.service';

describe('CovidDataService', () => {
  let service: CovidDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CovidDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
