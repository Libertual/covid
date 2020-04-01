import { ChartOptions, ChartType, ChartConfiguration, ChartData } from 'chart.js';
import { Color } from 'ng2-charts';

export class ChartConfig implements ChartConfiguration {
  public data: ChartData = {};
  public colors: Color[] = [
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

  public legend = true;
  public type: ChartType = 'line';
  public plugins = [];

  constructor(public options?: ChartOptions) {
    this.data.datasets = [{ data: [] }];
    this.data.labels = [];
    this.options = options || {
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
