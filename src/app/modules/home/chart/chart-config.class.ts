import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { Color } from 'ng2-charts';

import { IChartConfig } from './chart-config.interface';

export class ChartConfig implements IChartConfig {
  public data: ChartData = {};
  public legend = true;
  public type: ChartType = 'line';
  public plugins = [];
  public options: ChartOptions;
  public colors: Color[];

  constructor() {
    this.data.datasets = [{ data: [] }];
    this.data.labels = [];
    this.legend = true;
    this.options = {
        responsive: true,
        elements: {
          line: {
            borderWidth: 2
          },
          point: {
            radius: 1
          }
        },
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
    this.colors = [
        {
          borderColor: '#703050',
          backgroundColor: 'transparent'
        },
        {
          borderColor: '#777',
          backgroundColor: 'transparent'
        },
        {
          borderColor: '#4CAF50',
          backgroundColor: 'transparent'
        },
        {
          borderColor: '#e55525',
          backgroundColor: 'transparent'
        },
        {
          borderColor: '#058082',
          backgroundColor: 'transparent'
        }
      ];
  }

  public setColor?(index: number, borderColor?: string, backgroundColor?: string) {
    this.colors[index].borderColor = borderColor || this.colors[index].borderColor;
    this.colors[index].backgroundColor = backgroundColor || this.colors[index].backgroundColor;
  }

  public setColors?(colors: Color[]) {
    this.colors = colors;
  }

  public setOptions?(options: ChartOptions) {
    this.options = options;
  }
}
