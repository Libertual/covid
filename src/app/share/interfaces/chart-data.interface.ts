import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';

export interface IChartData {
  lineChartData?: ChartDataSets[];
  lineChartLabels?: Label[];
  lineChartOptions?: ChartOptions;
  lineChartColors?: Color[];
  lineChartLegend?: boolean;
  lineChartType?: ChartType;
  lineChartPlugins?: any[];
}
