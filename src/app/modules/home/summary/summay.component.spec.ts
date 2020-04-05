import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CovidDataService } from '../../../shared/services/covid-data.service';

import { SummaryComponent } from './summary.component';

import { ReplaySubject } from 'rxjs';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let cDS: CovidDataService;
  const totalCovidData = new ReplaySubject<any>();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ SummaryComponent ],
      providers: [ CovidDataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    cDS = TestBed.get(CovidDataService);
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
    totalCovidData.next(data);
    component = fixture.componentInstance;
    spyOn(cDS, 'getTotalCovidData').and.callFake(() => totalCovidData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
