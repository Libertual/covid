import { Component, OnInit, Input } from '@angular/core';

import { IChartConfig } from './chart-config.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})

export class ChartComponent implements OnInit {
  @Input() public chartData: IChartConfig;
  @Input() public title: string;
  @Input() public footer: string;
  @Input() public subtitle: string;

  constructor() { }

  public ngOnInit() {
  }
}
