import { Component, OnInit } from '@angular/core';

import { CovidDataService } from '../../../shared/services/covid-data.service';
import { CovidDataDTO } from '../../../shared/datamodel/dto/covid-data.dto';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
  public totalData: CovidDataDTO = {} as any;

  constructor( private covidDataService: CovidDataService ) {
  }

  public ngOnInit(): void {
    this.covidDataService.getResponse()
            .subscribe((data) => this.totalData = this.covidDataService.parseTotalDataFile(data));
  }
}
