import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';

export interface IChartConfig {
  data?: ChartData;
  labels?: Label[];
  options?: ChartOptions;
  colors?: Color[];
  legend?: boolean;
  type?: ChartType;
  plugins?: any[];
}
