import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';

import { first } from 'rxjs/operators';

import { LineChartService } from './line-chart.service';
import { IChartData } from './interfaces/chartData.interface';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
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

  constructor(private lineChartService: LineChartService) { }

  public ngOnInit() {
    this.lineChartService.getCovidData().pipe(first())
        .subscribe((data) => this.chartData = this.lineChartService.extractData(data));
  }
}
