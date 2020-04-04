import { Component, OnInit } from '@angular/core';

import { ChartOptions} from 'chart.js';

import { CovidDataService } from '../../shared/services/covid-data.service';
import { ChartConfig } from './chart/chart-config.class';

import { IChartConfig } from './chart/chart-config.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public res: string;
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

  public casesChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        ticks: {
          min: '2020-02-20',
          maxTicksLimit: 10
        }
      }],
      yAxes: [{
        type: 'linear',
        ticks: {
          maxTicksLimit: 10
        }
      }]
    }
  };

  public dailyCasesChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        ticks: {
          min: '2020-02-20',
          maxTicksLimit: 10
        }
      }],
      yAxes: [{
        type: 'linear',
        ticks: {
          maxTicksLimit: 10
        }
      }]
    }
  };

  public totalDataChart = new ChartConfig();

  public deathRateChart = new ChartConfig();

  public dailyCasesChart = new ChartConfig();

  constructor(private covidDataService: CovidDataService) {
    this.totalDataChart.setOptions(this.casesChartOptions);
    this.deathRateChart.setOptions(this.deadRateChartOptions);
    this.dailyCasesChart.setOptions(this.dailyCasesChartOptions);
  }

  public ngOnInit(): void {
    this.covidDataService.getResponse()
    .subscribe(
      (data) => {
        this.totalDataChart = {...this.totalDataChart, ...this.covidDataService.parseTotalData(data)};
        this.deathRateChart = { ...this.deathRateChart, ...this.covidDataService.parseDeathRateData(data) };
        this.dailyCasesChart = {...this.dailyCasesChart, ...this.covidDataService.parseCasesDataByField(data, 'last24h') };
      }
    );
  }
}
