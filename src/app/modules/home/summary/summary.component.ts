import { Component, OnInit } from '@angular/core';

import { ChartOptions} from 'chart.js';

import { CovidDataService } from '../../../shared/services/covid-data.service';
import { CovidDataDTO } from '../../../shared/datamodel/dto/covid-data.dto';
import { ICovidDailyData } from '../../../shared/datamodel/interfaces/covid-daily-data.interface';
import { ChartConfig } from '../chart/chart-config.class';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
  public totalCovidData: CovidDataDTO = {} as any;
  public dailyCovidData: ICovidDailyData = {} as ICovidDailyData;
  public deathsLast24h: number;
  public casesLast24h: number;

  public miniChartOptions: ChartOptions = {
    responsive: true,
    showLines: true,
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0
      }
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: false,
        ticks: {
          min: '2020-03-05'
        }
      }],
      yAxes: [{
        display: false
      }]
    },
    layout: {
        padding: {
            bottom: 4
        }
    }
  };

  public dailyCasesMiniChart = new ChartConfig();
  public deathRateMiniChart = new ChartConfig();
  public casesMiniChart = new ChartConfig();
  public recoveredMiniChart = new ChartConfig();
  public hospitalizedMiniChart = new ChartConfig();
  public dailyDeathMiniChart = new ChartConfig();

  constructor( private covidDataService: CovidDataService ) {
    this.dailyCasesMiniChart.setColors(0, '#058082');
    this.dailyCasesMiniChart.setOptions(this.miniChartOptions);
    this.deathRateMiniChart.setColors(0, '#e96f46');
    this.deathRateMiniChart.setOptions(this.miniChartOptions);
    this.casesMiniChart.setColors(0, '#854f6a');
    this.casesMiniChart.setOptions(this.miniChartOptions);
    this.recoveredMiniChart.setColors(0, '#91cb93');
    this.recoveredMiniChart.setOptions(this.miniChartOptions);
    this.hospitalizedMiniChart.setColors(0, '#b898a8');
    this.hospitalizedMiniChart.setOptions(this.miniChartOptions);
    this.dailyDeathMiniChart.setColors(0, '#cc7a7a');
    this.dailyDeathMiniChart.setOptions(this.miniChartOptions);
  }

  public ngOnInit(): void {
    this.covidDataService.getTotalCovidData().subscribe(
      (data) => {
        this.totalCovidData = this.covidDataService.parseTotalDataFile(data);
        this.deathRateMiniChart = { ...this.deathRateMiniChart, ...this.covidDataService.parseCasesDataByField(data, 'deaths')};
        this.casesMiniChart = {...this.casesMiniChart, ...this.covidDataService.parseCasesDataByField(data, 'cases') };
        this.recoveredMiniChart = {...this.recoveredMiniChart, ...this.covidDataService.parseCasesDataByField(data, 'recovered') };
        this.hospitalizedMiniChart = {...this.hospitalizedMiniChart, ...this.covidDataService.parseCasesDataByField(data, 'hospitalized') };
      }
    );
    this.covidDataService.getDailyCovidData().subscribe(
      (data) => {
        this.dailyCovidData = data;
        this.casesLast24h = data[data.length - 1].casesLast24h;
        this.deathsLast24h = data[data.length - 1].deathsLast24h;
        const cases = [{name: 'casesLast24h', label: 'Afectados 24h' }];
        this.dailyCasesMiniChart = {...this.dailyCasesMiniChart, ...this.covidDataService.dailyCasesChartDataByFields(data, cases) };
        const deaths = [{name: 'deathsLast24h', label: 'Fallecidos 24h' }];
        this.dailyDeathMiniChart = {...this.dailyDeathMiniChart, ...this.covidDataService.dailyCasesChartDataByFields(data, deaths) };
      });

  }
}
