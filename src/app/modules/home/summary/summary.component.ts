import { Component, OnInit } from '@angular/core';

import { ChartOptions} from 'chart.js';

import { CovidDataService } from '../../../shared/services/covid-data.service';
import { CovidDataDTO } from '../../../shared/datamodel/dto/covid-data.dto';
import { ChartConfig } from '../chart/chart-config.class';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
  public totalData: CovidDataDTO = {} as any;

  public miniChartOptions: ChartOptions = {
    responsive: true,
    showLines: true,
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0
      }
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: false,
        ticks: {
          min: '2020-03-05'
        }
      }],
      yAxes: [{
        display: false
      }]
    },
    layout: {
        padding: {
            bottom: 4
        }
    }
  };
  public colors = [
      {
        borderColor: '#058082',
        backgroundColor: 'transparent'
      }
    ];

  public dailyCasesMiniChart = new ChartConfig();

  public deathRateMiniChart = new ChartConfig();

  public casesMiniChart = new ChartConfig();

  public recoveredMiniChart = new ChartConfig();

  public hospitalizedMiniChart = new ChartConfig();

  constructor( private covidDataService: CovidDataService ) {

    this.dailyCasesMiniChart.setColors(0, '#058082');
    this.dailyCasesMiniChart.setOptions(this.miniChartOptions);
    this.deathRateMiniChart.setColors(0, '#e96f46');
    this.deathRateMiniChart.setOptions(this.miniChartOptions);
    this.casesMiniChart.setColors(0, '#854f6a');
    this.casesMiniChart.setOptions(this.miniChartOptions);
    this.recoveredMiniChart.setColors(0, '#91cb93');
    this.recoveredMiniChart.setOptions(this.miniChartOptions);
    this.hospitalizedMiniChart.setColors(0, '#b898a8');
    this.hospitalizedMiniChart.setOptions(this.miniChartOptions);
  }

  public ngOnInit(): void {
    this.covidDataService.getResponse().subscribe(
              (data) => {
                this.totalData = this.covidDataService.parseTotalDataFile(data);
                this.deathRateMiniChart = { ...this.deathRateMiniChart, ...this.covidDataService.parseCasesDataByField(data, 'deaths')};
                this.dailyCasesMiniChart = {...this.dailyCasesMiniChart, ...this.covidDataService.parseCasesDataByField(data, 'last24h') };
                this.casesMiniChart = {...this.casesMiniChart, ...this.covidDataService.parseCasesDataByField(data, 'cases') };
                this.recoveredMiniChart = {...this.recoveredMiniChart, ...this.covidDataService.parseCasesDataByField(data, 'recovered') };
                this.hospitalizedMiniChart = {...this.hospitalizedMiniChart, ...this.covidDataService.parseCasesDataByField(data, 'hospitalized') };
              }
            );
  }
}
