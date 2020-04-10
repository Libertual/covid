import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CovidDataService } from './covid-data.service';

describe('CovidDataService', () => {
  let service: CovidDataService;
  let httpMock: HttpTestingController;
  const apiURL = 'assets/data/covid.json';

  const data = [{
      date: '2020-04-02',
      hour: '20:00',
      cases: 117710,
      deaths: 10935,
      recovered: 30513,
      hospitalized: 56637,
      uci: 6092,
      last24h: 7472
    },
    {
      date: '2020-04-03',
      hour: '20:00',
      cases: 124736,
      deaths: 11744,
      recovered: 34219,
      hospitalized: 57612,
      uci: 6092,
      last24h: 7026
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ CovidDataService ]
    });
    service = TestBed.inject(CovidDataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return covid data', () => {
    service.getCovidData().subscribe((res) => {
      expect(res[0].cases).toBe(117710);
    });

    service.getCovidData().subscribe((res) => {
      expect(res[0].recovered).toBe(30513);
      expect(res[1].casesLast24h).toBe(7026);
    });

    const req = httpMock.match(apiURL);
    expect(req[0].request.method).toBe('GET');

    service.getCovidData();
    req.map((r) => {
        r.flush(data);
    });

    httpMock.verify();

  });

});
