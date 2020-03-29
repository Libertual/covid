import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { ChartsModule } from 'ng2-charts';

import { HomeComponent } from './home.component';
import { SummaryComponent } from './summary/summary.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [HomeComponent, SummaryComponent, LineChartComponent],
  imports: [
    CommonModule,
    ChartsModule,
    MatCardModule
  ],
  exports: [
    HomeComponent,
    SummaryComponent,
    LineChartComponent
  ]
})
export class HomeModule { }
