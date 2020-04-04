import { Component, OnInit } from '@angular/core';

import { CovidDataService } from '../../../share/services/covid-data.service';
import { ISummary } from './summary.interface';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
  public totalData: ISummary = {} as any;

  constructor( private covidDataService: CovidDataService ) {
  }

  public ngOnInit(): void {
    this.covidDataService.getResponse()
            .subscribe((data) => this.totalData = this.covidDataService.parseTotalDataFile(data));
  }
}
