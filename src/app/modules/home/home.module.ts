import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { ChartsModule } from 'ng2-charts';

import { HomeComponent } from './home.component';
import { SummaryComponent } from './summary/summary.component';
import { ChartComponent } from './chart/chart.component';
import { MiniChartComponent } from './mini-chart/mini-chart.component';

@NgModule({
  declarations: [
    HomeComponent,
    SummaryComponent,
    ChartComponent,
    MiniChartComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    MatCardModule
  ],
  exports: [
    HomeComponent,
    SummaryComponent,
    ChartComponent,
    MiniChartComponent
  ],
  providers: []
})

export class HomeModule { }
