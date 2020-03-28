import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';

import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ChartsModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
