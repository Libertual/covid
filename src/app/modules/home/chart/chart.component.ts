import { Component, OnInit, Input } from '@angular/core';

import { IChartData } from '../../../share/interfaces/chart-data.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})

export class ChartComponent implements OnInit {
  @Input() public chartData: IChartData;
  @Input() public title: string;
  @Input() public footer: string;
  @Input() public subtitle: string;

  constructor() { }

  public ngOnInit() {
  }
}
