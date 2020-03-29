import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

export interface IChartData {
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
}
