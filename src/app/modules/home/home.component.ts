import { Component, OnInit } from '@angular/core';

import { ChartOptions} from 'chart.js';

import { CovidDataService } from '../../share/services/covid-data.service';
import { ChartConfig } from './chart/chart-config.class';

import { IChartConfig } from './chart/chart-config.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public deadRateChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        ticks: {
          min: '2020-03-08',
          maxTicksLimit: 10
        }
      }],
      yAxes: [{
        type: 'linear',
        ticks: {
          maxTicksLimit: 6
        }
      }]
    }
  };

  public totalDataChart: IChartConfig = new ChartConfig();

  public deathRateChart: IChartConfig = new ChartConfig(this.deadRateChartOptions);

  public dailyCasesChart: IChartConfig = new ChartConfig();

  constructor(
    private covidDataService: CovidDataService
  ) { }

  public ngOnInit(): void {

    this.covidDataService.getTotalData()
        .subscribe((data) => {
          this.deathRateChart = { ...this.deathRateChart, ...this.covidDataService.parseDeathRateData(data) };
        });

    this.covidDataService.getCovidData()
        .subscribe((data) => {
            this.totalDataChart = {...this.totalDataChart, ...this.covidDataService.extractData(data)};
        });
    this.covidDataService.getTotalData()
        .subscribe((data) => {
            this.dailyCasesChart = {...this.dailyCasesChart, ...this.covidDataService.parseDailyCasesData(data)};
        });

  }
}
