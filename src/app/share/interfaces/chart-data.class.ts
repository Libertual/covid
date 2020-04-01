import { IChartData } from './chart-data.interface';
import { ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';

export class ChartData implements IChartData {

  public lineChartData = [{ data: [] }];
  public lineChartLabels = [];
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

  constructor(public lineChartOptions?: ChartOptions) {
    this.lineChartOptions = lineChartOptions || {
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
              maxTicksLimit: 6
            }
          }]
        }
      };
  }
}
