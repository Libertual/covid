import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

import { CovidDataService } from '../../share/services/covid-data.service';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private covidDataService: CovidDataService) { }

  public getDeathRate(data): ChartConfiguration {
    return this.covidDataService.parseDeathRateData(data);
  }
}
