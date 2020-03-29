import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';

import { CovidDataService } from '../../../share/services/covid-data.service';
import { IChartData } from '../../../share/interfaces/chart-data.interface';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html'
})

export class LineChartComponent implements OnInit {
  public chartData: IChartData = {
    lineChartData: [{ data: [] }],
    lineChartLabels: []
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        ticks: {
          min: '2020-02-20',
          maxTicksLimit: 10
        }
      }]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#777',
      backgroundColor: 'transparent'
    },
    {
      borderColor: '#33b440',
      backgroundColor: 'transparent'
    },
    {
      borderColor: '#005577',
      backgroundColor: 'transparent'
    },
    {
      borderColor: '#c24822',
      backgroundColor: 'transparent'
    },
    {
      borderColor: '#000000',
      backgroundColor: 'transparent'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private covidDataService: CovidDataService) { }

  public ngOnInit() {
    this.covidDataService.getCovidData()
        .subscribe((data) => this.chartData = this.covidDataService.extractData(data));
  }
}
