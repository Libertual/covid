import { Component, OnInit } from '@angular/core';

import { ChartOptions, ChartConfiguration } from 'chart.js';

import { ChartsService } from '../../share/services/charts.service';
import { CovidDataService } from '../../share/services/covid-data.service';
import { ChartConfig } from './chart/chart-config.class';

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
          min: '2020-03-10',
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

  public totalDataChart: ChartConfiguration = new ChartConfig();

  public deathRateChart: ChartConfiguration = new ChartConfig(this.deadRateChartOptions);

  constructor(
    private chartsService: ChartsService,
    private covidDataService: CovidDataService
  ) { }

  public ngOnInit(): void {

    this.covidDataService.getTotalData()
        .subscribe((data) => {
          this.deathRateChart = { ...this.deathRateChart, ...this.chartsService.getDeathRate(data) };
        });

    this.covidDataService.getCovidData()
        .subscribe((data) => {
            this.totalDataChart = {...this.totalDataChart, ...this.covidDataService.extractData(data)};
        });

  }
}
