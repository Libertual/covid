import { Component, OnInit, Input } from '@angular/core';

import { IChartConfig } from '../chart/chart-config.interface';

@Component({
  selector: 'app-mini-chart',
  templateUrl: './mini-chart.component.html'
})

export class MiniChartComponent implements OnInit {
  @Input() public chartData: IChartConfig;
  @Input() public title: string;
  @Input() public footer: string;
  @Input() public subtitle: string;

  constructor() { }

  public ngOnInit() {
  }
}
