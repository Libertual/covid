import { Component, OnInit } from '@angular/core';

import { ChartOptions} from 'chart.js';

import { CovidDataService } from '../../../shared/services/covid-data.service';
import { CovidDataDTO } from '../../../shared/datamodel/dto/covid-data.dto';
import { ICovidDailyData } from '../../../shared/datamodel/interfaces/covid-daily-data.interface';
import { ChartConfig } from '../chart/chart-config.class';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
  public lastDayData: CovidDataDTO = {} as any;
  public dailyCovidData: ICovidDailyData = {} as ICovidDailyData;

  public miniChartOptions: ChartOptions = {
    responsive: true,
    showLines: true,
    tooltips: {
      enabled: false
    },
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

  public dailyCasesMiniChart = new ChartConfig();
  public deathRateMiniChart = new ChartConfig();
  public casesMiniChart = new ChartConfig();
  public recoveredMiniChart = new ChartConfig();
  public hospitalizedMiniChart = new ChartConfig();
  public dailyDeathMiniChart = new ChartConfig();
  public activesMiniChart = new ChartConfig();

  constructor( private covidDataService: CovidDataService ) {
    this.dailyCasesMiniChart.setColor(0, '#058082');
    this.dailyCasesMiniChart.setOptions(this.miniChartOptions);
    this.deathRateMiniChart.setColor(0, '#e96f46');
    this.deathRateMiniChart.setOptions(this.miniChartOptions);
    this.casesMiniChart.setColor(0, '#854f6a');
    this.casesMiniChart.setOptions(this.miniChartOptions);
    this.recoveredMiniChart.setColor(0, '#91cb93');
    this.recoveredMiniChart.setOptions(this.miniChartOptions);
    this.hospitalizedMiniChart.setColor(0, '#b898a8');
    this.hospitalizedMiniChart.setOptions(this.miniChartOptions);
    this.dailyDeathMiniChart.setColor(0, '#cc7a7a');
    this.dailyDeathMiniChart.setOptions(this.miniChartOptions);
    this.activesMiniChart.setColor(0, '#058082');
    this.activesMiniChart.setOptions(this.miniChartOptions);
  }

  public ngOnInit(): void {
    this.covidDataService.getCovidData().subscribe(
      (data) => {
        this.lastDayData = this.covidDataService.getLastDayData(data);
        this.deathRateMiniChart = { ...this.deathRateMiniChart, ...this.covidDataService.parseCasesDataByField(data, 'deaths')};
        this.casesMiniChart = {...this.casesMiniChart, ...this.covidDataService.parseCasesDataByField(data, 'cases') };
        this.recoveredMiniChart = {...this.recoveredMiniChart, ...this.covidDataService.parseCasesDataByField(data, 'recovered') };
        this.hospitalizedMiniChart = {...this.hospitalizedMiniChart, ...this.covidDataService.parseCasesDataByField(data, 'hospitalized') };
        const cases = [{name: 'casesLast24h', label: 'Afectados 24h' }];
        this.dailyCasesMiniChart = {...this.dailyCasesMiniChart, ...this.covidDataService.dailyCasesChartDataByFields(data, cases) };
        const deaths = [{name: 'deathsLast24h', label: 'Fallecidos 24h' }];
        this.dailyDeathMiniChart = {...this.dailyDeathMiniChart, ...this.covidDataService.dailyCasesChartDataByFields(data, deaths) };
        const actives = [{name: 'actives', label: 'Activos' }];
        this.activesMiniChart = {...this.activesMiniChart, ...this.covidDataService.dailyCasesChartDataByFields(data, actives) };

      }
    );
  }
}
