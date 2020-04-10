import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CovidDataService } from '../../shared/services/covid-data.service';

import { HomeComponent } from './home.component';

import { ReplaySubject } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let cDS: CovidDataService;
  const totalCovidData = new ReplaySubject<any>();
  const dailyCovidData = new ReplaySubject<any>();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ HomeComponent ],
      providers: [ CovidDataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    cDS = TestBed.get(CovidDataService);
    const data = [{
        date: '2020-04-02',
        hour: '20:00',
        cases: 117710,
        deaths: 10935,
        recovered: 30513,
        hospitalized: 56637,
        uci: 6092,
        last24h: 7472,
        deathsLast24h: 5,
        casesLast24h: 6,
        recoveredLast24h: 7,
        hospitalizedLast24h: 8      },
      {
        date: '2020-04-03',
        hour: '20:00',
        cases: 124736,
        deaths: 11744,
        recovered: 34219,
        hospitalized: 57612,
        uci: 6092,
        last24h: 7026,
        deathsLast24h: 50,
        casesLast24h: 60,
        recoveredLast24h: 70,
        hospitalizedLast24h: 80
      }
    ];
    totalCovidData.next(data);
    component.totalDataChart.setColor(1);

    spyOn(cDS, 'getCovidData').and.callFake(() => totalCovidData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('data must be displayed correctly', () => {
    expect(component.totalDataChart.data.datasets[0].data.length).toEqual(2);
    expect(component.deathRateChart.data.datasets[0].data.length).toEqual(2);
    expect(component.dailyCasesChart.data.datasets[0].data.length).toEqual(2);
    expect(component.dailyCasesChart.data.datasets[0].data[0]).toEqual(5);
  });
});
