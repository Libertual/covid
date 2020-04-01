import { Component, OnInit, Input } from '@angular/core';

import { IChartData } from '../../../share/interfaces/chart-data.interface';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html'
})

export class LineChartComponent implements OnInit {
  @Input() public chartData: IChartData;

  constructor() {
  }

  public ngOnInit() {
  }
}
